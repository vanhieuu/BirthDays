from __future__ import annotations

import math
import subprocess
from pathlib import Path

import imageio.v2 as imageio
import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "outputs"
OUTPUT = OUTPUT_DIR / "birthday_dieu_trang.mp4"
SILENT_OUTPUT = OUTPUT_DIR / "birthday_dieu_trang_silent.mp4"
AUDIO = ROOT / "assets" / "audio" / "birthday_track.m4a"

PHOTO_DIR = ROOT / "assets" / "photos"
PHOTOS = [
    PHOTO_DIR / "scene_01.jpg",
    PHOTO_DIR / "scene_02.jpg",
    PHOTO_DIR / "scene_03.jpg",
    PHOTO_DIR / "scene_04.jpg",
    PHOTO_DIR / "scene_05.jpg",
]

W, H = 1080, 1920
FPS = 24
SCENE_SECONDS = 5.8
INTRO_SECONDS = 4.0
OUTRO_SECONDS = 5.0
FINAL_WISH_SECONDS = 6.5

FONT_DIR = Path("/System/Library/Fonts/Supplemental")
TITLE_FONT = FONT_DIR / "Times New Roman Bold.ttf"
BODY_FONT = FONT_DIR / "Arial Unicode.ttf"
BOLD_FONT = FONT_DIR / "Arial Bold.ttf"


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(str(path), size=size)
    except OSError:
        return ImageFont.load_default()


F_TITLE = font(TITLE_FONT, 86)
F_BIG = font(TITLE_FONT, 72)
F_BIG_PANEL = font(TITLE_FONT, 54)
F_BODY = font(BODY_FONT, 42)
F_BODY_PANEL = font(BODY_FONT, 36)
F_SMALL = font(BODY_FONT, 30)
F_LABEL = font(BOLD_FONT, 28)


def clamp(value: float, low: float = 0.0, high: float = 1.0) -> float:
    return max(low, min(high, value))


def ease(t: float) -> float:
    t = clamp(t)
    return t * t * (3 - 2 * t)


def alpha_curve(t: float) -> float:
    return clamp(min(t / 0.18, (1 - t) / 0.18))


def cover_image(image: Image.Image, size: tuple[int, int], zoom: float, pan_x: float, pan_y: float) -> Image.Image:
    target_w, target_h = size
    src_w, src_h = image.size
    scale = max(target_w / src_w, target_h / src_h) * zoom
    new_w = int(src_w * scale)
    new_h = int(src_h * scale)
    resized = image.resize((new_w, new_h), Image.Resampling.LANCZOS)

    max_x = max(0, new_w - target_w)
    max_y = max(0, new_h - target_h)
    left = int(max_x * clamp((pan_x + 1) / 2))
    top = int(max_y * clamp((pan_y + 1) / 2))
    return resized.crop((left, top, left + target_w, top + target_h))


def wrapped_lines(draw: ImageDraw.ImageDraw, text: str, font_obj: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    lines: list[str] = []
    for paragraph in text.split("\n"):
        words = paragraph.split()
        current = ""
        for word in words:
            candidate = f"{current} {word}".strip()
            if draw.textbbox((0, 0), candidate, font=font_obj)[2] <= max_width or not current:
                current = candidate
            else:
                lines.append(current)
                current = word
        if current:
            lines.append(current)
    return lines


def draw_centered_text(
    layer: Image.Image,
    text: str,
    y: int,
    font_obj: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
    max_width: int,
    line_gap: int = 12,
) -> int:
    draw = ImageDraw.Draw(layer)
    lines = wrapped_lines(draw, text, font_obj, max_width)
    line_heights = []
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font_obj)
        line_heights.append(bbox[3] - bbox[1])
    total_h = sum(line_heights) + line_gap * max(0, len(lines) - 1)
    cursor = y - total_h // 2

    for line, line_h in zip(lines, line_heights):
        bbox = draw.textbbox((0, 0), line, font=font_obj)
        x = (W - (bbox[2] - bbox[0])) // 2
        draw.text((x + 3, cursor + 4), line, font=font_obj, fill=(82, 45, 35, int(fill[3] * 0.34)))
        draw.text((x, cursor), line, font=font_obj, fill=fill)
        cursor += line_h + line_gap

    return cursor


def draw_soft_panel(layer: Image.Image, alpha: int, y: int = H - 585) -> None:
    panel = Image.new("RGBA", (W - 120, 470), (255, 248, 239, int(alpha * 0.82)))
    mask = Image.new("L", panel.size, 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle((0, 0, panel.size[0], panel.size[1]), radius=42, fill=255)
    panel.putalpha(mask)
    layer.alpha_composite(panel, (60, y))


def particles(frame_index: int, count: int = 42) -> list[tuple[int, int, int, int]]:
    dots = []
    for i in range(count):
        seed = i * 1299721
        x = int((seed % W + frame_index * (0.8 + (i % 5) * 0.18)) % W)
        y = int(((seed // 37) % H - frame_index * (1.1 + (i % 7) * 0.12)) % H)
        size = 3 + (i % 4)
        alpha = 36 + (i % 5) * 22
        dots.append((x, y, size, alpha))
    return dots


def decorate(layer: Image.Image, frame_index: int, alpha: int) -> None:
    draw = ImageDraw.Draw(layer)
    for x, y, size, dot_alpha in particles(frame_index):
        a = int(dot_alpha * alpha / 255)
        color = (255, 226, 194, a)
        draw.ellipse((x, y, x + size, y + size), fill=color)

    for i, text in enumerate(["♡", "✦", "♡", "✧"]):
        x = 88 + i * 270
        y = 118 + int(math.sin(frame_index / 28 + i) * 18)
        draw.text((x, y), text, font=F_BODY, fill=(255, 226, 212, int(alpha * 0.78)))


def make_intro_frame(t: float, frame_index: int) -> Image.Image:
    base = Image.new("RGB", (W, H), (255, 241, 226))
    bg = Image.open(PHOTOS[0]).convert("RGB")
    bg = cover_image(bg, (W, H), 1.18 + 0.04 * ease(t), -0.22, -0.04)
    bg = bg.filter(ImageFilter.GaussianBlur(18))
    bg = ImageEnhance.Brightness(bg).enhance(0.86)
    base = Image.blend(base, bg, 0.72)

    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    a = int(255 * alpha_curve(t))
    decorate(layer, frame_index, a)
    draw_centered_text(layer, "Có một ngày rất dịu", 735, F_BIG, (255, 248, 241, a), 900)
    draw_centered_text(layer, "mà anh chỉ muốn dành hết những điều đẹp nhất", 860, F_BODY, (255, 238, 225, a), 900)
    draw_centered_text(layer, "để đặt bên cạnh em", 970, F_BODY, (255, 238, 225, a), 820)
    return Image.alpha_composite(base.convert("RGBA"), layer).convert("RGB")


SCENE_TEXTS = [
    "Em biết không, có những khoảnh khắc anh nhìn em và thấy cả thế giới như chậm lại, chỉ còn lại một điều rất thương.",
    "Anh thích cách em xuất hiện giữa phố đông, nhỏ bé thôi mà vẫn đủ làm lòng anh nghiêng về phía em thật nhiều.",
    "Mong tuổi mới ôm em bằng nắng dịu, bằng hoa mềm, bằng những ngày mà em không cần gồng mình để được yêu thương.",
    "Nếu có hôm nào em thấy lòng mình mỏi, anh muốn được là nơi em có thể tựa vào, không cần nói nhiều vẫn thấy an yên.",
    "Anh không biết dùng lời nào cho đủ. Chỉ biết rằng, trong rất nhiều điều đẹp đẽ anh từng gặp, em luôn là điều anh muốn giữ lâu nhất.",
]


def make_photo_frame(photo: Path, text: str, t: float, scene_index: int, frame_index: int) -> Image.Image:
    image = Image.open(photo).convert("RGB")
    pan_start = -0.18 if scene_index % 2 == 0 else 0.18
    pan_end = 0.18 if scene_index % 2 == 0 else -0.18
    pan = pan_start + (pan_end - pan_start) * ease(t)
    vertical_pan = -0.22 + 0.22 * ease(t)
    frame = cover_image(image, (W, H), 1.06 + 0.06 * ease(t), pan, vertical_pan)
    frame = ImageEnhance.Color(frame).enhance(1.04)
    frame = ImageEnhance.Contrast(frame).enhance(1.03)

    shade = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    shade_draw = ImageDraw.Draw(shade)
    for y in range(H):
        bottom = clamp((y - 1030) / 760)
        top = clamp((330 - y) / 330)
        alpha = int(120 * bottom + 38 * top)
        if alpha:
            shade_draw.line((0, y, W, y), fill=(35, 20, 18, alpha))

    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    a = int(255 * alpha_curve(t))
    decorate(layer, frame_index, int(a * 0.75))
    panel_y = 120 if scene_index == 1 else H - 585
    label_y = panel_y + 45
    text_y = panel_y + 250
    draw_soft_panel(layer, int(a * 0.88), panel_y)

    draw = ImageDraw.Draw(layer)
    label = ["Ánh nhìn của anh", "Phía em", "Tuổi mới dịu dàng", "Nơi em tựa vào", "Điều anh muốn giữ"][scene_index]
    label_width = draw.textbbox((0, 0), label, font=F_LABEL)[2]
    draw.rounded_rectangle((90, label_y, 128 + label_width, label_y + 47), radius=24, fill=(232, 111, 81, int(a * 0.2)))
    draw.text((116, label_y + 11), label, font=F_LABEL, fill=(232, 111, 81, a))
    draw_centered_text(layer, text, text_y, F_BODY, (67, 43, 35, a), 810, line_gap=10)

    return Image.alpha_composite(Image.alpha_composite(frame.convert("RGBA"), shade), layer).convert("RGB")


def make_outro_frame(t: float, frame_index: int) -> Image.Image:
    base_photo = Image.open(PHOTOS[-1]).convert("RGB")
    frame = cover_image(base_photo, (W, H), 1.1 + 0.03 * ease(t), 0, -0.08)
    frame = frame.filter(ImageFilter.GaussianBlur(10))
    frame = ImageEnhance.Brightness(frame).enhance(0.76)

    tint = Image.new("RGB", (W, H), (255, 231, 219))
    frame = Image.blend(frame, tint, 0.22)

    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    a = int(255 * alpha_curve(t))
    decorate(layer, frame_index, a)
    draw_centered_text(layer, "Tuổi mới của em,", 720, F_BIG, (255, 248, 241, a), 880)
    draw_centered_text(layer, "anh mong mọi yêu thương đều tìm đúng đường về,\nđể tim em luôn mềm, mắt em luôn sáng.", 900, F_BODY, (255, 242, 232, a), 850)
    draw_centered_text(layer, "Còn anh,\nsẽ thương em bằng những điều thật lòng nhất.", 1160, F_BIG, (255, 246, 236, a), 900)
    return Image.alpha_composite(frame.convert("RGBA"), layer).convert("RGB")


def make_final_wish_frame(t: float, frame_index: int) -> Image.Image:
    base_photo = Image.open(PHOTOS[2]).convert("RGB")
    frame = cover_image(base_photo, (W, H), 1.18 + 0.02 * ease(t), 0, -0.02)
    frame = frame.filter(ImageFilter.GaussianBlur(16))
    frame = ImageEnhance.Brightness(frame).enhance(0.62)

    tint = Image.new("RGB", (W, H), (74, 45, 50))
    frame = Image.blend(frame, tint, 0.28)

    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    a = int(255 * alpha_curve(t))
    decorate(layer, frame_index, a)

    draw = ImageDraw.Draw(layer)
    panel = Image.new("RGBA", (W - 140, 980), (255, 246, 239, int(a * 0.84)))
    mask = Image.new("L", panel.size, 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle((0, 0, panel.size[0], panel.size[1]), radius=46, fill=255)
    panel.putalpha(mask)
    layer.alpha_composite(panel, (70, 500))

    draw.text((122, 570), "Điều anh muốn gửi em", font=F_LABEL, fill=(232, 111, 81, a))
    draw_centered_text(
        layer,
        "Chúc em một tuổi mới thật mềm lòng với chính mình.",
        710,
        F_BIG_PANEL,
        (67, 43, 35, a),
        760,
        line_gap=10,
    )
    draw_centered_text(
        layer,
        "Mong mỗi ngày đi qua đều có một điều nhỏ làm em mỉm cười,\n"
        "một người khiến em thấy được lắng nghe,\n"
        "và một khoảng bình yên đủ rộng để em tựa vào.",
        925,
        F_BODY_PANEL,
        (82, 57, 48, a),
        720,
        line_gap=20,
    )
    draw_centered_text(
        layer,
        "Phần còn lại,\nđể anh thương em thật chậm,\nthật lâu.",
        1315,
        F_BIG_PANEL,
        (67, 43, 35, a),
        720,
        line_gap=22,
    )
    return Image.alpha_composite(frame.convert("RGBA"), layer).convert("RGB")


def main() -> None:
    missing = [str(path) for path in PHOTOS if not path.exists()]
    if not AUDIO.exists():
        missing.append(str(AUDIO))
    if missing:
        raise FileNotFoundError("Missing media:\n" + "\n".join(missing))

    OUTPUT_DIR.mkdir(exist_ok=True)
    total_seconds = INTRO_SECONDS + SCENE_SECONDS * len(PHOTOS) + OUTRO_SECONDS + FINAL_WISH_SECONDS
    total_frames = int(total_seconds * FPS)

    with imageio.get_writer(
        SILENT_OUTPUT,
        fps=FPS,
        codec="libx264",
        quality=8,
        macro_block_size=1,
        ffmpeg_params=["-pix_fmt", "yuv420p", "-movflags", "+faststart"],
    ) as writer:
        for frame_index in range(total_frames):
            seconds = frame_index / FPS
            if seconds < INTRO_SECONDS:
                frame = make_intro_frame(seconds / INTRO_SECONDS, frame_index)
            elif seconds < INTRO_SECONDS + SCENE_SECONDS * len(PHOTOS):
                local = seconds - INTRO_SECONDS
                scene_index = min(int(local // SCENE_SECONDS), len(PHOTOS) - 1)
                t = (local - scene_index * SCENE_SECONDS) / SCENE_SECONDS
                frame = make_photo_frame(PHOTOS[scene_index], SCENE_TEXTS[scene_index], t, scene_index, frame_index)
            elif seconds < INTRO_SECONDS + SCENE_SECONDS * len(PHOTOS) + OUTRO_SECONDS:
                local = seconds - INTRO_SECONDS - SCENE_SECONDS * len(PHOTOS)
                frame = make_outro_frame(local / OUTRO_SECONDS, frame_index)
            else:
                local = seconds - INTRO_SECONDS - SCENE_SECONDS * len(PHOTOS) - OUTRO_SECONDS
                frame = make_final_wish_frame(local / FINAL_WISH_SECONDS, frame_index)

            writer.append_data(np.asarray(frame))

    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    fade_out_start = max(0, total_seconds - 2.2)
    subprocess.run(
        [
            ffmpeg,
            "-y",
            "-i",
            str(SILENT_OUTPUT),
            "-i",
            str(AUDIO),
            "-map",
            "0:v:0",
            "-map",
            "1:a:0",
            "-c:v",
            "copy",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-af",
            f"afade=t=in:st=0:d=1.2,afade=t=out:st={fade_out_start:.2f}:d=2.2",
            "-shortest",
            "-movflags",
            "+faststart",
            str(OUTPUT),
        ],
        check=True,
    )

    SILENT_OUTPUT.unlink(missing_ok=True)
    print(OUTPUT)


if __name__ == "__main__":
    main()

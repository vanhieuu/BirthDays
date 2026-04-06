import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const stage = document.getElementById("interactiveStage");
const startGestureBtn = document.getElementById("startGestureBtn");
const toggleMessageBtn = document.getElementById("toggleMessageBtn");
const gestureStatus = document.getElementById("gestureStatus");
const gestureVideo = document.getElementById("gestureVideo");

if (!stage || !startGestureBtn || !toggleMessageBtn || !gestureStatus || !gestureVideo) {
  throw new Error("Interactive birthday scene is missing required DOM nodes.");
}

const isCompactScreen = window.innerWidth < 768;
const particleCount = isCompactScreen ? 18000 : 32000;
const pointer = { x: 0, y: 0 };
const state = {
  handPresent: false,
  openPalm: false,
  pinchScale: 1,
  handX: 0,
  handY: 0,
  manualMessage: false,
  cameraStarted: false,
  startingCamera: false,
  frameLoopRunning: false,
  stream: null
};
const zoomState = {
  current: 164,
  target: 164,
  min: 108,
  max: 220,
  step: 12
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
camera.position.z = zoomState.current;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
renderer.setClearColor(0x000000, 0);
stage.appendChild(renderer.domElement);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.32, 0.7, 0.9);
composer.addPass(bloom);

const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

const palette = [
  new THREE.Color("#c84b6f"),
  new THREE.Color("#df8aa5"),
  new THREE.Color("#f1ddce"),
  new THREE.Color("#fff8f4")
];

for (let index = 0; index < particleCount; index += 1) {
  positions[index * 3] = (Math.random() - 0.5) * 240;
  positions[index * 3 + 1] = (Math.random() - 0.5) * 240;
  positions[index * 3 + 2] = (Math.random() - 0.5) * 70;

  const color = palette[index % palette.length];
  colors[index * 3] = color.r;
  colors[index * 3 + 1] = color.g;
  colors[index * 3 + 2] = color.b;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const sprite = new THREE.TextureLoader().load(
  "https://threejs.org/examples/textures/sprites/disc.png"
);

const material = new THREE.PointsMaterial({
  size: isCompactScreen ? 0.62 : 0.68,
  map: sprite,
  alphaTest: 0.24,
  vertexColors: true,
  transparent: true,
  opacity: 0.9,
  depthWrite: false,
  blending: THREE.NormalBlending
});

const points = new THREE.Points(geometry, material);
scene.add(points);

function blossomFlower(cx, cy, petals, radius, color) {
  const pts = [];
  const cols = [];
  const petalRatio = petals / 2;

  for (let angle = 0; angle < Math.PI * 2; angle += 0.022) {
    const polarRadius = radius * Math.cos(petalRatio * angle);
    for (let depth = 0; depth < 3; depth += 1) {
      pts.push({
        x: cx + polarRadius * Math.cos(angle) + (Math.random() - 0.5) * 0.8,
        y: cy + polarRadius * Math.sin(angle) + (Math.random() - 0.5) * 0.8
      });
      cols.push(color);
    }
  }

  return { pts, cols };
}

function roseFlower(cx, cy, turns, scale, color) {
  const pts = [];
  const cols = [];

  for (let angle = 0; angle < Math.PI * 2 * turns; angle += 0.015) {
    const radius = 0.7 * Math.exp(0.16 * angle);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    for (let depth = 0; depth < 3; depth += 1) {
      pts.push({
        x: cx + x * scale + (Math.random() - 0.5) * 0.7,
        y: cy + y * scale + (Math.random() - 0.5) * 0.7
      });
      cols.push(color);
    }
  }

  return { pts, cols };
}

function miniHeart(cx, cy, scale, color) {
  const pts = [];
  const cols = [];

  for (let angle = 0; angle < Math.PI * 2; angle += 0.035) {
    const x = 16 * Math.pow(Math.sin(angle), 3);
    const y =
      13 * Math.cos(angle) -
      5 * Math.cos(2 * angle) -
      2 * Math.cos(3 * angle) -
      Math.cos(4 * angle);

    for (let depth = 0; depth < 2; depth += 1) {
      pts.push({
        x: cx + x * scale + (Math.random() - 0.5) * 0.55,
        y: cy + y * scale + (Math.random() - 0.5) * 0.55
      });
      cols.push(color);
    }
  }

  return { pts, cols };
}

function stem(x, topY, length, color) {
  const pts = [];
  const cols = [];

  for (let step = 0; step < length; step += 1) {
    const px = x + Math.sin(step * 0.08) * 2.3;
    const py = topY - step;

    for (let depth = 0; depth < 2; depth += 1) {
      pts.push({
        x: px + (Math.random() - 0.5) * 0.5,
        y: py + (Math.random() - 0.5) * 0.5
      });
      cols.push(color);
    }

    if (step % 15 === 0) {
      pts.push({ x: px + 3.2, y: py - 1.2 });
      cols.push(color);
    }
  }

  return { pts, cols };
}

function leaf(cx, cy, width, height, color) {
  const pts = [];
  const cols = [];

  for (let angle = 0; angle < Math.PI * 2; angle += 0.11) {
    for (let depth = 0; depth < 2; depth += 1) {
      pts.push({
        x: cx + width * Math.cos(angle) + (Math.random() - 0.5) * 0.4,
        y: cy + height * Math.sin(angle) + (Math.random() - 0.5) * 0.4
      });
      cols.push(color);
    }
  }

  return { pts, cols };
}

function ribbon(cx, cy, size, color) {
  const pts = [];
  const cols = [];

  for (let angle = 0; angle < Math.PI * 2; angle += 0.04) {
    const x = Math.sin(angle) * size;
    const y = Math.sin(angle) * Math.cos(angle) * size * 0.8;

    pts.push({ x: cx - size * 0.8 + x, y: cy + y });
    cols.push(color);
    pts.push({ x: cx + size * 0.8 - x, y: cy + y });
    cols.push(color);
  }

  return { pts, cols };
}

function wrapping(cx, cy, width, height, color) {
  const pts = [];
  const cols = [];

  for (let step = 0; step <= 1; step += 0.02) {
    pts.push({
      x: cx - width * step,
      y: cy - height + height * step * 1.2
    });
    cols.push(color);
    pts.push({
      x: cx + width * step,
      y: cy - height + height * step * 1.2
    });
    cols.push(color);
  }

  return { pts, cols };
}

function babyBreath(cx, cy, radius, color) {
  const pts = [];
  const cols = [];

  for (let angle = 0; angle < Math.PI * 2; angle += 0.22) {
    for (let depth = 0; depth < 2; depth += 1) {
      pts.push({
        x: cx + Math.cos(angle) * radius + (Math.random() - 0.5) * 0.45,
        y: cy + Math.sin(angle) * radius + (Math.random() - 0.5) * 0.45
      });
      cols.push(color);
    }
  }

  return { pts, cols };
}

function fluffyBloom(cx, cy, radius, density, color) {
  const pts = [];
  const cols = [];

  for (let index = 0; index < density; index += 1) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.pow(Math.random(), 0.75) * radius;
    pts.push({
      x: cx + Math.cos(angle) * dist + (Math.random() - 0.5) * 0.9,
      y: cy + Math.sin(angle) * dist + (Math.random() - 0.5) * 0.9
    });
    cols.push(color);
  }

  return { pts, cols };
}

function fillerSprig(cx, cy, count, spread, color) {
  const pts = [];
  const cols = [];

  for (let index = 0; index < count; index += 1) {
    pts.push({
      x: cx + (Math.random() - 0.5) * spread,
      y: cy + (Math.random() - 0.5) * spread
    });
    cols.push(color);
  }

  return { pts, cols };
}

function bouquetTargets() {
  let pts = [];
  let cols = [];

  function add(shape) {
    pts = pts.concat(shape.pts);
    cols = cols.concat(shape.cols);
  }

  const stemColor = new THREE.Color("#5d873f");
  const paperColor = new THREE.Color("#f3dfd0");
  const paperShade = new THREE.Color("#e7c7b3");
  const burgundyRose = new THREE.Color("#b73f63");
  const velvetRose = new THREE.Color("#d05e82");
  const blushRose = new THREE.Color("#de9ab0");
  const creamRose = new THREE.Color("#f2dfd0");
  const ivoryBud = new THREE.Color("#fff8f4");

  add(wrapping(4, -18, 54, 42, paperColor));
  add(wrapping(6, -24, 42, 30, paperShade));

  add(stem(-34, 2, 108, stemColor));
  add(stem(-18, 18, 118, stemColor));
  add(stem(0, 30, 126, stemColor));
  add(stem(18, 20, 116, stemColor));
  add(stem(38, 6, 108, stemColor));
  add(stem(58, 0, 96, stemColor));
  add(stem(-56, -4, 92, stemColor));
  add(stem(-72, -10, 78, stemColor));

  add(leaf(-26, -38, 12, 5.2, new THREE.Color("#739848")));
  add(leaf(-8, -52, 12.5, 5.8, new THREE.Color("#678c3f")));
  add(leaf(16, -42, 11.2, 5, new THREE.Color("#5d833b")));
  add(leaf(36, -24, 10.2, 4.7, new THREE.Color("#7a9f4e")));
  add(leaf(-42, -18, 9.4, 4.5, new THREE.Color("#709447")));
  add(leaf(52, -14, 9.2, 4.3, new THREE.Color("#709447")));
  add(leaf(-60, 2, 8.6, 4.1, new THREE.Color("#709447")));
  add(leaf(62, -2, 8.6, 4.1, new THREE.Color("#709447")));

  add(fluffyBloom(-50, 26, 15, 320, creamRose));
  add(fluffyBloom(-22, 54, 14, 280, blushRose));
  add(fluffyBloom(8, 76, 16, 340, ivoryBud));
  add(fluffyBloom(34, 50, 18, 360, creamRose));
  add(fluffyBloom(60, 32, 14, 280, blushRose));

  add(roseFlower(-18, 18, 5.1, 2.7, velvetRose));
  add(roseFlower(2, 22, 5.4, 2.95, burgundyRose));
  add(roseFlower(24, 18, 5, 2.65, velvetRose));
  add(roseFlower(-42, 4, 4.6, 2.2, blushRose));
  add(roseFlower(46, 8, 4.6, 2.25, creamRose));
  add(roseFlower(66, 14, 4.2, 1.95, creamRose));

  add(blossomFlower(-68, 44, 5, 8.5, creamRose));
  add(blossomFlower(74, 48, 6, 8.2, blushRose));
  add(blossomFlower(14, 38, 7, 7.2, creamRose));
  add(blossomFlower(-6, 94, 6, 8.4, ivoryBud));

  add(babyBreath(-8, 64, 6, ivoryBud));
  add(babyBreath(24, 68, 6, ivoryBud));
  add(babyBreath(-30, 70, 5.2, ivoryBud));
  add(babyBreath(54, 62, 5, ivoryBud));
  add(fillerSprig(-12, 34, 90, 16, ivoryBud));
  add(fillerSprig(44, 26, 80, 14, creamRose));

  add(miniHeart(6, 24, 1.4, new THREE.Color("#d97592")));
  add(ribbon(8, -22, 9.4, new THREE.Color("#ce6d8a")));

  return { pts, cols };
}

function textTargets(text) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 320;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "white";
  context.font = "700 190px Georgia";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const pts = [];

  for (let y = 0; y < canvas.height; y += 4) {
    for (let x = 0; x < canvas.width; x += 4) {
      const offset = (y * canvas.width + x) * 4;
      if (data[offset] > 150) {
        pts.push({ x: (x - canvas.width / 2) / 4, y: (canvas.height / 2 - y) / 4 });
      }
    }
  }

  return pts;
}

const bouquet = bouquetTargets();
const dayMessage = textTargets("HPBD");

for (let index = 0; index < particleCount; index += 1) {
  const color = bouquet.cols[index % bouquet.cols.length];
  colors[index * 3] = color.r;
  colors[index * 3 + 1] = color.g;
  colors[index * 3 + 2] = color.b;
}

geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

function resetHandState() {
  state.handPresent = false;
  state.openPalm = false;
  state.pinchScale = 1;
  state.handX = 0;
  state.handY = 0;
}

function resizeScene() {
  const width = stage.clientWidth;
  const height = stage.clientHeight;

  renderer.setSize(width, height, false);
  composer.setSize(width, height);
  bloom.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

const resizeObserver = new ResizeObserver(resizeScene);
resizeObserver.observe(stage);
resizeScene();

function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    if (src.includes("hands.js") && window.Hands) {
      resolve();
      return;
    }

    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }

      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true }
    );
    script.addEventListener("error", reject, { once: true });
    document.head.appendChild(script);
  });
}

function withTimeout(promise, timeoutMs, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => {
        reject(new Error(message));
      }, timeoutMs);
    })
  ]);
}

async function startGestureControl() {
  if (state.cameraStarted) {
    stopGestureControl(
      "Đã tắt camera. Quay lại điều khiển bằng chuột. Rê để xoay, lăn chuột để zoom."
    );
    return;
  }

  if (state.startingCamera) {
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    gestureStatus.textContent = "Trình duyệt này chưa hỗ trợ camera để điều khiển.";
    return;
  }

  state.startingCamera = true;
  startGestureBtn.disabled = true;
  startGestureBtn.textContent = "Đang bật camera...";
  gestureStatus.textContent = "Đang tải chế độ điều khiển bằng tay...";

  try {
    gestureStatus.textContent = "Đang xin quyền camera...";

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        width: { ideal: 640 },
        height: { ideal: 480 }
      }
    });

    state.stream = stream;
    gestureVideo.srcObject = stream;
    await gestureVideo.play().catch(() => {});

    await withTimeout(
      loadExternalScript("https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"),
      10000,
      "Tải thư viện nhận diện tay quá lâu."
    );

    const hands = new window.Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.65,
      minTrackingConfidence: 0.65
    });

    hands.onResults((results) => {
      const landmarks = results.multiHandLandmarks?.[0];

      if (!landmarks) {
        resetHandState();
        return;
      }

      state.handPresent = true;
      state.handX = (landmarks[9].x - 0.5) * 2;
      state.handY = (landmarks[9].y - 0.5) * 2;

      const dx = landmarks[4].x - landmarks[8].x;
      const dy = landmarks[4].y - landmarks[8].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      state.pinchScale = THREE.MathUtils.clamp(1 + (0.24 - distance * 2.15), 0.7, 2.1);

      const extendedFingerCount = [
        [8, 6, 5],
        [12, 10, 9],
        [16, 14, 13],
        [20, 18, 17]
      ].reduce((count, [tip, pip, mcp]) => {
        return count + (landmarks[tip].y < landmarks[pip].y && landmarks[pip].y < landmarks[mcp].y ? 1 : 0);
      }, 0);

      state.openPalm = extendedFingerCount >= 3;
    });

    state.frameLoopRunning = true;

    const processFrame = async () => {
      if (!state.frameLoopRunning) {
        return;
      }

      if (gestureVideo.readyState >= 2) {
        try {
          await hands.send({ image: gestureVideo });
        } catch (error) {
          console.error(error);
        }
      }

      requestAnimationFrame(processFrame);
    };

    requestAnimationFrame(processFrame);
    state.cameraStarted = true;
    startGestureBtn.disabled = false;
    startGestureBtn.textContent = "Tắt camera điều khiển";
    gestureStatus.textContent =
      "Camera đã bật. Xòe bàn tay để hiện HPBD, khum hoặc nắm tay lại để trở về bó hoa. Vẫn có thể lăn chuột để zoom.";
  } catch (error) {
    console.error(error);
    stopGestureControl();
    if (error?.name === "NotAllowedError") {
      gestureStatus.textContent =
        "Bạn vừa từ chối quyền camera. Hãy cho phép camera rồi bấm lại nút này.";
    } else if (error?.name === "NotFoundError") {
      gestureStatus.textContent =
        "Thiết bị này không tìm thấy camera khả dụng để bật điều khiển bằng tay.";
    } else if (error?.message === "Tải thư viện nhận diện tay quá lâu.") {
      gestureStatus.textContent =
        "Trình duyệt tải hand-tracking quá lâu. Hãy thử tải lại trang rồi bấm lại.";
    } else {
      gestureStatus.textContent =
        "Không mở được camera. Bạn vẫn có thể dùng chuột hoặc chạm để xem hiệu ứng 3D.";
    }
  } finally {
    state.startingCamera = false;
  }
}

function stopGestureControl(statusMessage) {
  state.frameLoopRunning = false;
  state.cameraStarted = false;
  resetHandState();

  if (state.stream) {
    state.stream.getTracks().forEach((track) => track.stop());
    state.stream = null;
  }

  gestureVideo.pause();
  gestureVideo.srcObject = null;
  startGestureBtn.disabled = false;
  startGestureBtn.textContent = "Bật camera điều khiển";

  if (statusMessage) {
    gestureStatus.textContent = statusMessage;
  }
}

startGestureBtn.addEventListener("click", startGestureControl);

toggleMessageBtn.addEventListener("click", () => {
  state.manualMessage = !state.manualMessage;
  toggleMessageBtn.textContent = state.manualMessage ? "Hiện bó hoa" : "Hiện HPBD";
});

stage.addEventListener("pointermove", (event) => {
  if (state.handPresent) {
    return;
  }

  const rect = stage.getBoundingClientRect();
  pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
  pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
});

stage.addEventListener("pointerleave", () => {
  if (state.handPresent) {
    return;
  }

  pointer.x *= 0.2;
  pointer.y *= 0.2;
});

stage.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();

    const direction = event.deltaY > 0 ? 1 : -1;
    zoomState.target = THREE.MathUtils.clamp(
      zoomState.target + direction * zoomState.step,
      zoomState.min,
      zoomState.max
    );

    gestureStatus.textContent = `Zoom: ${Math.round(
      THREE.MathUtils.mapLinear(zoomState.target, zoomState.max, zoomState.min, 100, 160)
    )}% . Lăn chuột để chỉnh, nhấp đúp để reset.`;
  },
  { passive: false }
);

stage.addEventListener("dblclick", () => {
  zoomState.target = 164;
  gestureStatus.textContent = state.cameraStarted
    ? "Camera đã bật. Xòe bàn tay để hiện HPBD, khum hoặc nắm tay lại để trở về bó hoa."
    : "Đang ở chế độ chuột. Rê để xoay, lăn chuột để zoom, nhấp đúp để về khung nhìn mặc định.";
});

let rotationX = 0;
let rotationY = 0;
let targetRotationX = 0;
let targetRotationY = 0;
let currentCameraZ = zoomState.current;
let targetCameraZ = zoomState.target;

function animate() {
  requestAnimationFrame(animate);

  const positionArray = geometry.attributes.position.array;
  const targetShape =
    state.manualMessage || (state.handPresent && state.openPalm) ? dayMessage : bouquet.pts;
  const scale = state.handPresent ? state.pinchScale : 1;

  for (let index = 0; index < particleCount; index += 1) {
    const target = targetShape[index % targetShape.length];
    positionArray[index * 3] += (target.x * scale - positionArray[index * 3]) * 0.048;
    positionArray[index * 3 + 1] +=
      (target.y * scale - positionArray[index * 3 + 1]) * 0.048;
    positionArray[index * 3 + 2] +=
      (Math.sin(index * 0.21 + performance.now() * 0.001) * 8 - positionArray[index * 3 + 2]) *
      0.03;
  }

  geometry.attributes.position.needsUpdate = true;

  if (state.handPresent) {
    targetRotationY = state.handX * Math.PI * 0.65;
    targetRotationX = -state.handY * Math.PI * 0.35;
    targetCameraZ = THREE.MathUtils.clamp(
      zoomState.target - (state.pinchScale - 1) * 72,
      zoomState.min,
      zoomState.max
    );
  } else {
    targetRotationY = pointer.x * Math.PI * 0.65;
    targetRotationX = pointer.y * Math.PI * 0.4;
    targetCameraZ = zoomState.target;
  }

  rotationX += (targetRotationX - rotationX) * 0.08;
  rotationY += (targetRotationY - rotationY) * 0.08;
  currentCameraZ += (targetCameraZ - currentCameraZ) * 0.08;

  points.rotation.x = rotationX;
  points.rotation.y = rotationY;
  camera.position.z = currentCameraZ;

  composer.render();
}

animate();

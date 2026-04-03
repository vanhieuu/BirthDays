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
const particleCount = isCompactScreen ? 12000 : 18000;
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

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
camera.position.z = 150;

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
  new THREE.Color("#ffc4d6"),
  new THREE.Color("#ffd79f"),
  new THREE.Color("#c4b5fd"),
  new THREE.Color("#86efac"),
  new THREE.Color("#93c5fd"),
  new THREE.Color("#f9a8d4")
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
  size: isCompactScreen ? 0.72 : 0.78,
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

function bouquetTargets() {
  let pts = [];
  let cols = [];

  function add(shape) {
    pts = pts.concat(shape.pts);
    cols = cols.concat(shape.cols);
  }

  const stemColor = new THREE.Color("#65a30d");
  const paperColor = new THREE.Color("#f5d0a9");

  add(wrapping(0, -8, 40, 34, paperColor));
  add(stem(-24, 10, 88, stemColor));
  add(stem(0, 18, 98, stemColor));
  add(stem(26, 12, 92, stemColor));
  add(stem(-46, 4, 78, stemColor));
  add(stem(48, 2, 74, stemColor));

  add(leaf(-18, -30, 10, 4.8, new THREE.Color("#84cc16")));
  add(leaf(10, -44, 11, 5.2, new THREE.Color("#4ade80")));
  add(leaf(28, -24, 9.5, 4.5, new THREE.Color("#65a30d")));
  add(leaf(-38, -10, 9, 4.2, new THREE.Color("#84cc16")));
  add(leaf(42, -6, 9, 4.2, new THREE.Color("#84cc16")));

  add(roseFlower(-22, 40, 4.6, 2.15, new THREE.Color("#fb7185")));
  add(roseFlower(4, 52, 4.9, 2.35, new THREE.Color("#f472b6")));
  add(roseFlower(28, 38, 4.6, 2.1, new THREE.Color("#f9a8d4")));
  add(blossomFlower(-46, 18, 5, 8.5, new THREE.Color("#c4b5fd")));
  add(blossomFlower(50, 16, 6, 8, new THREE.Color("#93c5fd")));
  add(blossomFlower(0, 24, 7, 6.8, new THREE.Color("#fde68a")));
  add(miniHeart(6, 22, 1.8, new THREE.Color("#fb7185")));
  add(ribbon(0, -14, 8, new THREE.Color("#fb7185")));

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
const dayMessage = textTargets("29/04");

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
    stopGestureControl("Đã tắt camera. Quay lại điều khiển bằng chuột.");
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
      "Camera đã bật. Xòe bàn tay để hiện 29/04, khum hoặc nắm tay lại để trở về bó hoa.";
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
  toggleMessageBtn.textContent = state.manualMessage ? "Hiện bó hoa" : "Hiện 29/04";
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

let rotationX = 0;
let rotationY = 0;
let targetRotationX = 0;
let targetRotationY = 0;
let currentCameraZ = 150;
let targetCameraZ = 150;

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
    targetCameraZ = 150 - (state.pinchScale - 1) * 50;
  } else {
    targetRotationY = pointer.x * Math.PI * 0.65;
    targetRotationX = pointer.y * Math.PI * 0.4;
    targetCameraZ = 150;
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

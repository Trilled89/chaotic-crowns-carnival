import * as THREE from 'three';

const scene = new THREE.Scene();

const createHexagon = () => {
  const geometry = new THREE.CircleGeometry(0.5, 6);
  const material = new THREE.MeshPhongMaterial({ color: 0x9b87f5 });
  return new THREE.Mesh(geometry, material);
};

const gridSize = 5;
const meshes: THREE.Mesh[] = [];

// Simulate the loop
for (let q = -gridSize; q <= gridSize; q++) {
  for (let r = -gridSize; r <= gridSize; r++) {
    if (Math.abs(q + r) <= gridSize) {
      const hexagon = createHexagon();
      hexagon.position.set(q, 0, r);
      scene.add(hexagon);
      meshes.push(hexagon);
    }
  }
}

// Add lights
scene.add(new THREE.AmbientLight(0x404040, 2));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(1, 5, 1);
scene.add(dirLight);

// Setup Raycaster
const raycaster = new THREE.Raycaster();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(0, 10, 10);
camera.lookAt(0, 0, 0);
camera.updateMatrixWorld();

// Benchmark parameters
const ITERATIONS = 100000;
const vectors: THREE.Vector2[] = [];
for(let i=0; i<ITERATIONS; i++) {
    vectors.push(new THREE.Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1));
}

// Warmup
for(let i=0; i<100; i++) {
    raycaster.setFromCamera(vectors[i], camera);
    raycaster.intersectObjects(scene.children);
}

console.log(`Starting benchmark with ${ITERATIONS} iterations...`);

// Test 1: scene.children
const start1 = performance.now();
for(let i=0; i<ITERATIONS; i++) {
    raycaster.setFromCamera(vectors[i], camera);
    const hits = raycaster.intersectObjects(scene.children);
}
const end1 = performance.now();
const time1 = end1 - start1;

// Test 2: meshes only
const start2 = performance.now();
for(let i=0; i<ITERATIONS; i++) {
    raycaster.setFromCamera(vectors[i], camera);
    const hits = raycaster.intersectObjects(meshes);
}
const end2 = performance.now();
const time2 = end2 - start2;

console.log(`Raycasting against scene.children (${scene.children.length} objects): ${time1.toFixed(2)}ms`);
console.log(`Raycasting against meshes only (${meshes.length} objects): ${time2.toFixed(2)}ms`);
console.log(`Improvement: ${(time1 / time2).toFixed(2)}x speedup`);

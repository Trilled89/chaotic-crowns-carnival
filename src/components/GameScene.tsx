
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Territory } from '@/types/game';

interface GameSceneProps {
  territoriesRef: React.MutableRefObject<Territory[]>;
  onTerritorySelect: (territory: Territory) => void;
  PLAYER_COLORS: Record<string, number>;
}

const GameScene = ({ territoriesRef, onTerritorySelect, PLAYER_COLORS }: GameSceneProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const controlsRef = useRef<OrbitControls>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0xffffff, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 2;
    controlsRef.current = controls;

    // Create hexagonal grid using InstancedMesh
    const gridSize = 5;
    const hexagonSpacing = 1.1;
    const instances = [];
    const coordinates = [];

    for (let q = -gridSize; q <= gridSize; q++) {
      for (let r = -gridSiz
      e; r <= gridSize; r++) {
        if (Math.abs(q + r) <= gridSize) {
          const x = q * hexagonSpacing * 1.5;
          const y = (q * 0.866 + r * 1.732) * hexagonSpacing;
          instances.push(new THREE.Vector3(x, 0, y));
          coordinates.push({ q, r });
        }
      }
    }

    const geometry = new THREE.CircleGeometry(0.5, 6);
    const material = new THREE.MeshPhongMaterial({
      color: 0x9b87f5,
      transparent: true,
      opacity: 0.4,
      vertexColors: true,
    });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, instances.length);
    scene.add(instancedMesh);

    instances.forEach((position, i) => {
      const matrix = new THREE.Matrix4();
      matrix.setPosition(position);
      instancedMesh.setMatrixAt(i, matrix);

      const q = Math.round((position.x / 1.5) / hexagonSpacing);
      const r = Math.round(((position.z / 1.732) - (position.x / 1.5 * 0.866)) / hexagonSpacing);

      territoriesRef.current.push({
        id: `${q},${r}`,
        position: position,
        owner: null,
        mesh: instancedMesh, // All territories now share the same mesh
        instanceId: i, // Store the instance ID
        power: 0,
        resources: [],
        chaosLevel: 0,
      });
    });

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 5, 1);
    scene.add(directionalLight);

    // Add raycaster for territory selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      // Logic to handle hover effect on instanced mesh
      if (intersects.length > 0 && intersects[0].object instanceof THREE.InstancedMesh) {
        const intersection = intersects[0];
        const instanceId = intersection.instanceId;
        
        const territory = territoriesRef.current.find(t => t.instanceId === instanceId);

        if (territory && !territory.owner) {
          const color = new THREE.Color(0xffffff); // Highlight color
          (intersection.object as THREE.InstancedMesh).setColorAt(instanceId, color);
          (intersection.object as THREE.InstancedMesh).instanceColor!.needsUpdate = true;
        }
      } else {
        // Reset all instances to their original color
        territoriesRef.current.forEach(territory => {
          if (!territory.owner && territory.instanceId !== undefined) {
            const color = new THREE.Color(0x9b87f5);
            (territory.mesh as THREE.InstancedMesh).setColorAt(territory.instanceId, color);
          }
        });
        if (territoriesRef.current.length > 0) {
          (territoriesRef.current[0].mesh as THREE.InstancedMesh).instanceColor!.needsUpdate = true;
        }
      }
    };

    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0 && intersects[0].object instanceof THREE.InstancedMesh) {
        const intersection = intersects[0];
        const instanceId = intersection.instanceId;

        const territory = territoriesRef.current.find(t => t.instanceId === instanceId);
        
        if (territory && !territory.owner) {
          onTerritorySelect(territory);
        }
      }
    };

    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onClick);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('click', onClick);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [onTerritorySelect]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default GameScene;

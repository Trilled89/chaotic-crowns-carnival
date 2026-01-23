
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

    // Create hexagonal grid
    const createHexagon = () => {
      const geometry = new THREE.CircleGeometry(0.5, 6);
      const material = new THREE.MeshPhongMaterial({
        color: 0x9b87f5,
        transparent: true,
        opacity: 0.4,
      });
      return new THREE.Mesh(geometry, material);
    };

    // Create grid of hexagons with enhanced properties
    const gridSize = 5;
    const hexagonSpacing = 1.1;
    
    for (let q = -gridSize; q <= gridSize; q++) {
      for (let r = -gridSize; r <= gridSize; r++) {
        if (Math.abs(q + r) <= gridSize) {
          const hexagon = createHexagon();
          const x = q * hexagonSpacing * 1.5;
          const y = (q * 0.866 + r * 1.732) * hexagonSpacing;
          hexagon.position.set(x, 0, y);
          scene.add(hexagon);

          territoriesRef.current.push({
            id: `${q},${r}`,
            position: new THREE.Vector3(x, 0, y),
            owner: null,
            mesh: hexagon,
            power: 0,
            resources: [],
            chaosLevel: 0
          });
        }
      }
    }

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 5, 1);
    scene.add(directionalLight);

    // Add raycaster for territory selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredTerritory: Territory | null = null;

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const selectedMesh = intersects[0].object as THREE.Mesh;
        const territory = territoriesRef.current.find(t => t.mesh === selectedMesh);

        if (territory && !territory.owner) {
          if (hoveredTerritory !== territory) {
            // Unhighlight previous
            if (hoveredTerritory && !hoveredTerritory.owner) {
              (hoveredTerritory.mesh.material as THREE.MeshPhongMaterial).opacity = 0.4;
            }
            // Highlight new
            (selectedMesh.material as THREE.MeshPhongMaterial).opacity = 0.8;
            hoveredTerritory = territory;
          }
        } else {
          // Hovering over something that isn't a valid target territory
          if (hoveredTerritory) {
            if (!hoveredTerritory.owner) {
              (hoveredTerritory.mesh.material as THREE.MeshPhongMaterial).opacity = 0.4;
            }
            hoveredTerritory = null;
          }
        }
      } else {
        // No intersection
        if (hoveredTerritory) {
          if (!hoveredTerritory.owner) {
            (hoveredTerritory.mesh.material as THREE.MeshPhongMaterial).opacity = 0.4;
          }
          hoveredTerritory = null;
        }
      }
    };

    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const selectedMesh = intersects[0].object as THREE.Mesh;
        const territory = territoriesRef.current.find(t => t.mesh === selectedMesh);
        
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

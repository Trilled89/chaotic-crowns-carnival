
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Card } from '@/components/ui/card';

const GameBoard = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();

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
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0xffffff, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create hexagonal grid
    const createHexagon = () => {
      const geometry = new THREE.CircleGeometry(0.5, 6);
      const material = new THREE.MeshBasicMaterial({
        color: 0x9b87f5,
        transparent: true,
        opacity: 0.2,
      });
      return new THREE.Mesh(geometry, material);
    };

    // Create grid of hexagons
    const gridSize = 5;
    const hexagonSpacing = 1.1;
    
    for (let q = -gridSize; q <= gridSize; q++) {
      for (let r = -gridSize; r <= gridSize; r++) {
        if (Math.abs(q + r) <= gridSize) {
          const hexagon = createHexagon();
          const x = q * hexagonSpacing * 1.5;
          const y = (q * 0.866 + r * 1.732) * hexagonSpacing;
          hexagon.position.set(x, y, 0);
          scene.add(hexagon);
        }
      }
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
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
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="game-container">
      <div className="game-ui">
        <Card className="player-info">
          <h2 className="text-lg font-semibold">Player 1</h2>
          <div className="flex gap-2">
            <span className="text-sm text-gray-500">Territories: 0</span>
            <span className="text-sm text-gray-500">Score: 0</span>
          </div>
        </Card>
      </div>
      
      <div ref={mountRef} className="game-board" />
      
      <Card className="territory-info animate-fade-in">
        <h3 className="text-sm font-medium mb-2">Selected Territory</h3>
        <button className="claim-button">
          Claim Territory
        </button>
      </Card>
    </div>
  );
};

export default GameBoard;

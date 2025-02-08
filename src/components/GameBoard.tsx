
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface Territory {
  id: string;
  position: THREE.Vector3;
  owner: string | null;
  mesh: THREE.Mesh;
}

const GameBoard = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const controlsRef = useRef<OrbitControls>();
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const territoriesRef = useRef<Territory[]>([]);
  const [playerScore, setPlayerScore] = useState(0);

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

    // Create grid of hexagons
    const gridSize = 5;
    const hexagonSpacing = 1.1;
    
    for (let q = -gridSize; q <= gridSize; q++) {
      for (let r = -gridSize; r <= gridSize; r++) {
        if (Math.abs(q + r) <= gridSize) {
          const hexagon = createHexagon();
          const x = q * hexagonSpacing * 1.5;
          const y = (q * 0.866 + r * 1.732) * hexagonSpacing;
          hexagon.position.set(x, 0, y); // Note: Using y as z for 3D space
          scene.add(hexagon);

          territoriesRef.current.push({
            id: `${q},${r}`,
            position: new THREE.Vector3(x, 0, y),
            owner: null,
            mesh: hexagon
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

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      // Reset all territories to default appearance
      territoriesRef.current.forEach(territory => {
        if (!territory.owner) {
          (territory.mesh.material as THREE.MeshPhongMaterial).opacity = 0.4;
        }
      });

      if (intersects.length > 0) {
        const selectedMesh = intersects[0].object as THREE.Mesh;
        const territory = territoriesRef.current.find(t => t.mesh === selectedMesh);
        
        if (territory && !territory.owner) {
          (selectedMesh.material as THREE.MeshPhongMaterial).opacity = 0.8;
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
          setSelectedTerritory(territory);
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
  }, []);

  const claimTerritory = () => {
    if (!selectedTerritory) return;

    // Check if territory is already claimed
    if (selectedTerritory.owner) {
      toast({
        title: "Territory Already Claimed",
        description: "This territory already belongs to another player.",
        variant: "destructive"
      });
      return;
    }

    // Claim the territory
    selectedTerritory.owner = "Player 1";
    (selectedTerritory.mesh.material as THREE.MeshPhongMaterial).color.setHex(0x8B5CF6);
    (selectedTerritory.mesh.material as THREE.MeshPhongMaterial).opacity = 0.8;

    setPlayerScore(prev => prev + 1);
    
    toast({
      title: "Territory Claimed!",
      description: "You've successfully claimed this territory.",
    });

    setSelectedTerritory(null);
  };

  return (
    <div className="game-container">
      <div className="game-ui">
        <Card className="player-info">
          <h2 className="text-lg font-semibold">Player 1</h2>
          <div className="flex gap-2">
            <span className="text-sm text-gray-500">Territories: {playerScore}</span>
            <span className="text-sm text-gray-500">Score: {playerScore * 100}</span>
          </div>
        </Card>
      </div>
      
      <div ref={mountRef} className="game-board" />
      
      {selectedTerritory && (
        <Card className="territory-info animate-fade-in">
          <h3 className="text-sm font-medium mb-2">Selected Territory</h3>
          <Button 
            className="claim-button"
            onClick={claimTerritory}
          >
            Claim Territory
          </Button>
        </Card>
      )}
    </div>
  );
};

export default GameBoard;


import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface Player {
  id: string;
  name: string;
  color: number;
  score: number;
}

interface Territory {
  id: string;
  position: THREE.Vector3;
  owner: string | null;
  mesh: THREE.Mesh;
}

const PLAYER_COLORS = {
  'Player 1': 0x8B5CF6,
  'Player 2': 0xEC4899,
  'Player 3': 0x10B981,
  'Player 4': 0xF59E0B,
};

const GameBoard = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const controlsRef = useRef<OrbitControls>();
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const territoriesRef = useRef<Territory[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<string>('Player 1');
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Player 1', color: PLAYER_COLORS['Player 1'], score: 0 },
    { id: '2', name: 'Player 2', color: PLAYER_COLORS['Player 2'], score: 0 },
    { id: '3', name: 'Player 3', color: PLAYER_COLORS['Player 3'], score: 0 },
    { id: '4', name: 'Player 4', color: PLAYER_COLORS['Player 4'], score: 0 },
  ]);

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
          hexagon.position.set(x, 0, y);
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
    selectedTerritory.owner = currentPlayer;
    (selectedTerritory.mesh.material as THREE.MeshPhongMaterial).color.setHex(
      PLAYER_COLORS[currentPlayer as keyof typeof PLAYER_COLORS]
    );
    (selectedTerritory.mesh.material as THREE.MeshPhongMaterial).opacity = 0.8;

    // Update player score
    setPlayers(prevPlayers => 
      prevPlayers.map(player => 
        player.name === currentPlayer 
          ? { ...player, score: player.score + 1 }
          : player
      )
    );
    
    toast({
      title: "Territory Claimed!",
      description: `${currentPlayer} has claimed this territory.`,
    });

    // Move to next player
    setCurrentPlayer(prevPlayer => {
      const currentIndex = players.findIndex(p => p.name === prevPlayer);
      const nextIndex = (currentIndex + 1) % players.length;
      return players[nextIndex].name;
    });

    setSelectedTerritory(null);
  };

  return (
    <div className="game-container h-screen w-full flex flex-col md:flex-row">
      <div className="game-ui w-full md:w-64 p-4 space-y-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Players</h2>
          <div className="space-y-2">
            {players.map((player) => (
              <div 
                key={player.id}
                className={`p-2 rounded-lg ${
                  currentPlayer === player.name 
                    ? 'bg-primary/20 border border-primary'
                    : 'bg-muted'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{player.name}</span>
                  <span className="text-sm text-muted-foreground">
                    Score: {player.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Current Turn</h2>
          <p className="text-muted-foreground">{currentPlayer}</p>
        </Card>
      </div>
      
      <div className="flex-1 relative">
        <div ref={mountRef} className="w-full h-full" />
        
        {selectedTerritory && (
          <Card className="territory-info absolute bottom-4 right-4 p-4 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-sm font-medium mb-2">Selected Territory</h3>
            <Button 
              className="w-full"
              onClick={claimTerritory}
            >
              Claim Territory
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GameBoard;

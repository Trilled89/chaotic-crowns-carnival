
import { useRef, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Player, Territory } from '@/types/game';
import PlayerList from './PlayerList';
import TerritoryInfo from './TerritoryInfo';
import GameScene from './GameScene';

const PLAYER_COLORS = {
  'Player 1': 0x8B5CF6,
  'Player 2': 0xEC4899,
  'Player 3': 0x10B981,
  'Player 4': 0xF59E0B,
};

const GameBoard = () => {
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const territoriesRef = useRef<Territory[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<string>('Player 1');
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Player 1', color: PLAYER_COLORS['Player 1'], score: 0 },
    { id: '2', name: 'Player 2', color: PLAYER_COLORS['Player 2'], score: 0 },
    { id: '3', name: 'Player 3', color: PLAYER_COLORS['Player 3'], score: 0 },
    { id: '4', name: 'Player 4', color: PLAYER_COLORS['Player 4'], score: 0 },
  ]);

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
        <PlayerList players={players} currentPlayer={currentPlayer} />
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Current Turn</h2>
          <p className="text-muted-foreground">{currentPlayer}</p>
        </div>
      </div>
      
      <div className="flex-1 relative">
        <GameScene 
          territoriesRef={territoriesRef}
          onTerritorySelect={setSelectedTerritory}
          PLAYER_COLORS={PLAYER_COLORS}
        />
        
        <TerritoryInfo 
          selectedTerritory={selectedTerritory}
          onClaim={claimTerritory}
        />
      </div>
    </div>
  );
};

export default GameBoard;

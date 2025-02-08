
import { Card } from '@/components/ui/card';

interface Player {
  id: string;
  name: string;
  color: number;
  score: number;
}

interface PlayerListProps {
  players: Player[];
  currentPlayer: string;
}

const PlayerList = ({ players, currentPlayer }: PlayerListProps) => {
  return (
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
  );
};

export default PlayerList;

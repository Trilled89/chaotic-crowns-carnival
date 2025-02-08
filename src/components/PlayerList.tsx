
import { Card } from '@/components/ui/card';
import { Crown, Shield } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  color: number;
  score: number;
  influence: number;
}

interface PlayerListProps {
  players: Player[];
  currentPlayer: string;
}

const PlayerList = ({ players, currentPlayer }: PlayerListProps) => {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Crown className="w-5 h-5" />
        Players
      </h2>
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
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="font-medium flex items-center gap-2">
                  {currentPlayer === player.name && (
                    <Crown className="w-4 h-4 text-primary" />
                  )}
                  {player.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  Score: {player.score}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3 h-3" />
                Influence: {player.influence}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PlayerList;

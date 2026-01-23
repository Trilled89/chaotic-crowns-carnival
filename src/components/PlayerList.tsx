
import { Card } from '@/components/ui/card';
import { Crown, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        <Crown className="w-5 h-5" aria-hidden="true" />
        Players
      </h2>
      <ul className="space-y-2">
        {players.map((player) => {
          const isCurrentPlayer = currentPlayer === player.name;
          return (
            <li
              key={player.id}
              className={cn(
                "p-2 rounded-lg transition-all duration-300",
                isCurrentPlayer
                  ? 'bg-primary/20 border border-primary'
                  : 'bg-muted'
              )}
            >
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium flex items-center gap-2">
                    {isCurrentPlayer && (
                      <>
                        <Crown className="w-4 h-4 text-primary" aria-hidden="true" />
                        <span className="sr-only">Current Turn: </span>
                      </>
                    )}
                    {player.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Score: {player.score}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3" aria-hidden="true" />
                  Influence: {player.influence}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default PlayerList;

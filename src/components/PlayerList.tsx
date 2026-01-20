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
        {players.map((player) => (
          <li
            key={player.id}
            aria-current={currentPlayer === player.name ? 'true' : undefined}
            className={cn(
              "p-2 rounded-lg border",
              currentPlayer === player.name
                ? "bg-primary/20 border-primary"
                : "bg-muted border-transparent"
            )}
          >
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="font-medium flex items-center gap-2">
                  {currentPlayer === player.name && (
                    <Crown className="w-4 h-4 text-primary" aria-hidden="true" />
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
        ))}
      </ul>
    </Card>
  );
};

export default PlayerList;

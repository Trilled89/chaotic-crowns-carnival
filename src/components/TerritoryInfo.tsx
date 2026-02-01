import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Territory } from '@/types/game';
import { Shield, Swords, TreePine, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TerritoryInfoProps {
  selectedTerritory: Territory | null;
  onClaim: () => void;
  className?: string;
}

const TerritoryInfo = ({ selectedTerritory, onClaim, className }: TerritoryInfoProps) => {
  if (!selectedTerritory) return null;

  return (
    <Card className={cn("territory-info absolute bottom-4 right-4 p-4 w-64 animate-in fade-in slide-in-from-bottom-4", className)}>
      <h3 className="text-lg font-semibold mb-3">Territory Details</h3>
      
      <dl className="space-y-2 mb-4">
        {selectedTerritory.owner && (
          <div className="flex items-center gap-2 pb-2 border-b mb-2">
            <Crown className="w-4 h-4 text-primary" aria-hidden="true" />
            <div className="flex items-baseline gap-1">
              <dt className="sr-only">Owner</dt>
              <dd className="text-sm font-medium text-primary">
                Owner: {selectedTerritory.owner}
              </dd>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" aria-hidden="true" />
          <div className="flex items-baseline gap-1">
            <dt className="text-sm">Power:</dt>
            <dd className="text-sm font-medium">{selectedTerritory.power}</dd>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <TreePine className="w-4 h-4" aria-hidden="true" />
          <div className="flex items-baseline gap-1">
            <dt className="text-sm">Resources:</dt>
            <dd className="text-sm font-medium">
              {selectedTerritory.resources.join(', ') || 'None'}
            </dd>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4" aria-hidden="true" />
          <div className="flex items-baseline gap-1">
            <dt className="text-sm">Chaos Level:</dt>
            <dd className="text-sm font-medium">
              {selectedTerritory.chaosLevel}
            </dd>
          </div>
        </div>
      </dl>

      <Button 
        className="w-full"
        onClick={onClaim}
        disabled={selectedTerritory.owner !== null}
      >
        {selectedTerritory.owner ? 'Territory Claimed' : 'Claim Territory'}
      </Button>
    </Card>
  );
};

export default TerritoryInfo;

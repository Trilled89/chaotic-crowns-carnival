
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Territory } from '@/types/game';
import { Crown, Shield, Swords, TreePine } from 'lucide-react';

interface TerritoryInfoProps {
  selectedTerritory: Territory | null;
  onClaim: () => void;
}

const TerritoryInfo = ({ selectedTerritory, onClaim }: TerritoryInfoProps) => {
  if (!selectedTerritory) return null;

  return (
    <Card className="territory-info absolute bottom-4 right-4 p-4 w-64 animate-in fade-in slide-in-from-bottom-4">
      <h3 className="text-lg font-semibold mb-3">Territory Details</h3>
      
      <div className="mb-4 flex items-center gap-2 p-2 bg-muted/50 rounded-md">
        <Crown className="w-4 h-4" aria-hidden="true" />
        <span className="text-sm font-medium">Owner:</span>
        <span className="text-sm">{selectedTerritory.owner || 'Unclaimed'}</span>
      </div>

      <dl className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" aria-hidden="true" />
          <dt className="text-sm">Power:</dt>
          <dd className="text-sm font-medium ml-1">{selectedTerritory.power}</dd>
        </div>
        
        <div className="flex items-center gap-2">
          <TreePine className="w-4 h-4" aria-hidden="true" />
          <dt className="text-sm">Resources:</dt>
          <dd className="text-sm font-medium ml-1">
            {selectedTerritory.resources.join(', ') || 'None'}
          </dd>
        </div>
        
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4" aria-hidden="true" />
          <dt className="text-sm">Chaos Level:</dt>
          <dd className="text-sm font-medium ml-1">
            {selectedTerritory.chaosLevel}
          </dd>
        </div>
      </dl>

      <Button 
        className="w-full"
        onClick={onClaim}
        disabled={selectedTerritory.owner !== null}
        aria-label={selectedTerritory.owner ? `Territory claimed by ${selectedTerritory.owner}` : "Claim territory"}
      >
        {selectedTerritory.owner ? 'Territory Claimed' : 'Claim Territory'}
      </Button>
    </Card>
  );
};

export default TerritoryInfo;

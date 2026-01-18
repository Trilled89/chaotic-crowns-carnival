
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Territory } from '@/types/game';
import { Shield, Swords, TreePine, Crown } from 'lucide-react';

interface TerritoryInfoProps {
  selectedTerritory: Territory | null;
  onClaim: () => void;
}

const TerritoryInfo = ({ selectedTerritory, onClaim }: TerritoryInfoProps) => {
  if (!selectedTerritory) return null;

  return (
    <Card className="territory-info absolute bottom-4 right-4 p-4 w-64 animate-in fade-in slide-in-from-bottom-4">
      <h3 className="text-lg font-semibold mb-3">Territory Details</h3>
      
      <div className="space-y-2 mb-4">
        {selectedTerritory.owner && (
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-yellow-500" aria-hidden="true" />
            <span className="text-sm font-medium">Owner: {selectedTerritory.owner}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm">Power: {selectedTerritory.power}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <TreePine className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm">
            Resources: {selectedTerritory.resources.join(', ') || 'None'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm">
            Chaos Level: {selectedTerritory.chaosLevel}
          </span>
        </div>
      </div>

      <Button 
        className="w-full"
        onClick={onClaim}
        disabled={selectedTerritory.owner !== null}
        aria-label={selectedTerritory.owner ? `Territory claimed by ${selectedTerritory.owner}` : "Claim Territory"}
      >
        {selectedTerritory.owner ? 'Territory Claimed' : 'Claim Territory'}
      </Button>
    </Card>
  );
};

export default TerritoryInfo;

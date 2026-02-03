import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Territory } from '@/types/game';
import { Shield, Swords, TreePine, X } from 'lucide-react';

interface TerritoryInfoProps {
  selectedTerritory: Territory | null;
  onClaim: () => void;
  onClose?: () => void;
}

const TerritoryInfo = ({ selectedTerritory, onClaim, onClose }: TerritoryInfoProps) => {
  if (!selectedTerritory) return null;

  return (
    <Card className="territory-info absolute bottom-4 right-4 p-4 w-64 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold">Territory Details</h3>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 -mt-1 -mr-2"
            onClick={onClose}
            aria-label="Close details"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
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
          <dd className="text-sm font-medium ml-1">{selectedTerritory.chaosLevel}</dd>
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

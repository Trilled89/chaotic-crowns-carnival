
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Territory } from '@/types/game';

interface TerritoryInfoProps {
  selectedTerritory: Territory | null;
  onClaim: () => void;
}

const TerritoryInfo = ({ selectedTerritory, onClaim }: TerritoryInfoProps) => {
  if (!selectedTerritory) return null;

  return (
    <Card className="territory-info absolute bottom-4 right-4 p-4 animate-in fade-in slide-in-from-bottom-4">
      <h3 className="text-sm font-medium mb-2">Selected Territory</h3>
      <Button 
        className="w-full"
        onClick={onClaim}
      >
        Claim Territory
      </Button>
    </Card>
  );
};

export default TerritoryInfo;

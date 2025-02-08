
import * as THREE from 'three';

export interface Player {
  id: string;
  name: string;
  color: number;
  score: number;
  influence: number; // New: for chaos events impact
}

export interface Territory {
  id: string;
  position: THREE.Vector3;
  owner: string | null;
  mesh: THREE.Mesh;
  power: number; // New: territory strength
  resources: string[]; // New: resources in territory
  chaosLevel: number; // New: chaos impact on territory
}

export interface ChaosEvent {
  id: string;
  name: string;
  description: string;
  effect: {
    type: 'power' | 'resources' | 'influence';
    value: number;
  };
  duration: number; // turns the effect lasts
}

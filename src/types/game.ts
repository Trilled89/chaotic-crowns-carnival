
import * as THREE from 'three';

export interface Player {
  id: string;
  name: string;
  color: number;
  score: number;
}

export interface Territory {
  id: string;
  position: THREE.Vector3;
  owner: string | null;
  mesh: THREE.Mesh;
}

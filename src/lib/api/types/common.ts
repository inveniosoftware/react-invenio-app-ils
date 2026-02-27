export interface RefHit {
  id: string;
  record?: {
    title?: string;
  };
}

export interface RefDataResult {
  hits: RefHit[];
  total: number;
}

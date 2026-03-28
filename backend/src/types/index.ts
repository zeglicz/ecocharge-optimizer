export interface EnergySource {
  fuel: string;
  perc: number;
}

export interface Interval {
  from: string;
  to: string;
  generationmix: EnergySource[];
}

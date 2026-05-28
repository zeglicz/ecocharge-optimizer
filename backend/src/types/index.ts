export interface EnergySource {
  fuel: string;
  perc: number;
}

export interface Interval {
  from: string;
  to: string;
  generationmix: EnergySource[];
}

export interface OptimalChargingWindowResult {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  cleanEnergyPercent: number;
}

export interface DateRange {
  from: string;
  to: string;
}

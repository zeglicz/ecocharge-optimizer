export type DayGenerationData = {
  date: string;
  sources: Record<string, number>;
  cleanEnergyPercent: number;
};

export type ChargingWindowResult = {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  cleanEnergyPercent: number;
};

export type ChargingWindowState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error' }
  | {
      status: 'result';
      result: ChargingWindowResult;
      durationLabel: string;
    };

import axios from 'axios';
import type { ChargingWindowResult, DayGenerationData } from '../types';

type GenerationResponse = {
  status: string;
  data: DayGenerationData[];
};

export type ChargingWindowResponse = {
  status: string;
  data: ChargingWindowResult;
};

const BASE_URL = 'http://localhost:3001';

export async function fetchGeneration(): Promise<GenerationResponse> {
  const res = await axios.get<GenerationResponse>(
    `${BASE_URL}/api/v1/generation/daily`,
  );

  return res.data;
}

export async function fetchChargingWindow(
  hours: number,
): Promise<ChargingWindowResponse> {
  const res = await axios.get<ChargingWindowResponse>(
    `${BASE_URL}/api/v1/generation/charging-window?hours=${hours}`,
  );

  return res.data;
}

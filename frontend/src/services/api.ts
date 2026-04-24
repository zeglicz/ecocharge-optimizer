import axios from 'axios';
import type { DayGenerationData } from '../types';

type GenerationResponse = {
  status: string;
  data: DayGenerationData[];
};

const BASE_URL = 'http://localhost:3001';

export async function fetchGeneration(): Promise<GenerationResponse> {
  const res = await axios.get<GenerationResponse>(
    `${BASE_URL}/api/v1/generation/daily`,
  );

  return res.data;
}

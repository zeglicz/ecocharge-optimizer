import axios from 'axios';
import { type Interval } from '../types/index.ts';

const BASE_URL = process.env.CARBON_API_BASE_URL!;

export async function fetchGeneration(
  from: string,
  to: string,
): Promise<Interval[]> {
  const url = `${BASE_URL}/generation/${from}/${to}`;
  const response = await axios.get(url);

  return response.data.data;
}

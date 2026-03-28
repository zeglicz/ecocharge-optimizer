import axios from 'axios';
import { type Interval } from '../types/index.ts';

const NESO_API_URL = 'https://api.carbonintensity.org.uk';

export async function fetchGeneration(
  from: string,
  to: string,
): Promise<Interval[]> {
  const url = `${NESO_API_URL}/generation/${from}/${to}`;
  const response = await axios.get(url);

  return response.data.data;
}

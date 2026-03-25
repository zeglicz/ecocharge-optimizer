import axios from 'axios';

const NESO_API_URL = 'https://api.carbonintensity.org.uk';

function getDateRange(hours: number): { from: string; to: string } {
  const now = new Date();

  const start = new Date(now);
  const end = new Date(now);
  end.setUTCHours(end.getUTCHours() + hours);

  return {
    from: start.toISOString(),
    to: end.toISOString(),
  };
}

const result = getDateRange(72);

async function fetchGeneration(from: string, to: string) {
  const url = `${NESO_API_URL}/generation/${from}/${to}`;
  const response = await axios.get(url);

  return response.data.data.length;
  // return response.data.data;
}

const res = await fetchGeneration(result.from, result.to);

console.log(result);
console.log(res);

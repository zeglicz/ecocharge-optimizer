import axios from 'axios';

const NESO_API_URL = 'https://api.carbonintensity.org.uk';

function getDateRange(days: number): { from: string; to: string } {
  const now = new Date();

  const start = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0,
      0,
      0,
      0,
    ),
  );

  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + days);

  return {
    from: start.toISOString(),
    to: end.toISOString(),
  };
}

const result = getDateRange(3);

async function fetchGeneration(from: string, to: string) {
  const url = `${NESO_API_URL}/generation/${from}/${to}`;
  const response = await axios.get(url);

  // return response.data.data;
  return response.data.data.length;
}

const res = await fetchGeneration(result.from, result.to);

console.log(result);
console.log(res);

export function getDateRange(days: number): { from: string; to: string } {
  const now = new Date();

  const start = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0,
      30,
      0,
      0,
    ),
  );

  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + days);
  end.setUTCMinutes(end.getUTCMinutes() - 30);

  return {
    from: start.toISOString(),
    to: end.toISOString(),
  };
}

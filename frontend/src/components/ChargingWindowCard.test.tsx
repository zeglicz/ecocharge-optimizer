import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ChargingWindowCard } from './ChargingWindowCard';

describe('ChargingWindowCard test suite', () => {
  it('should render idle state', () => {
    render(<ChargingWindowCard status="idle" />);

    expect(
      screen.getByText(/Set your charging duration and click analyze/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Results will appear here after you run the analysis.'),
    ).toBeInTheDocument();
  });

  it('should render loading state', () => {
    render(<ChargingWindowCard status="loading" />);

    expect(screen.getByTestId('charging-window-loading')).toBeInTheDocument();
  });

  it('should render error state', () => {
    render(<ChargingWindowCard status="error" />);

    expect(
      screen.getByText(/Couldn't compute your best charging window/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        'Results will appear here after you run the analysis.',
      ),
    ).not.toBeInTheDocument();
  });

  it('should render result state', () => {
    render(
      <ChargingWindowCard
        status="result"
        durationLabel="2-hour window"
        result={{
          startDate: '2026-05-27',
          startTime: '01:00',
          endDate: '2026-05-27',
          endTime: '03:00',
          cleanEnergyPercent: 75,
        }}
      />,
    );

    expect(
      screen.getByText(
        "Here's the best slot in the current forecast for your session.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('2-hour window')).toBeInTheDocument();
  });
});

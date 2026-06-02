import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchChargingWindow } from '../services/api';
import { ChargingSection } from './ChargingSection';

vi.mock('../services/api', () => ({
  fetchChargingWindow: vi.fn(),
}));

const mockFetchChargingWindow = vi.mocked(fetchChargingWindow);

describe('ChargingSection test suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should start in idle state', () => {
    render(<ChargingSection />);

    expect(
      screen.getByText('Results will appear here after you run the analysis.'),
    ).toBeInTheDocument();
  });

  it('should call API with selected hours and render result', async () => {
    mockFetchChargingWindow.mockResolvedValue({
      status: 'success',
      data: {
        startDate: '2026-05-27',
        startTime: '01:00',
        endDate: '2026-05-27',
        endTime: '03:00',
        cleanEnergyPercent: 78,
      },
    });

    render(<ChargingSection />);

    fireEvent.change(screen.getByLabelText('Charging duration in hours'), {
      target: { value: '2' },
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: /Analyze optimal window/i,
      }),
    );

    expect(await screen.findByText('78%')).toBeInTheDocument();

    expect(mockFetchChargingWindow).toHaveBeenCalledWith(2);
    expect(screen.getByText('2-hour window')).toBeInTheDocument();
  });

  it('should render error state when API call fails', async () => {
    mockFetchChargingWindow.mockRejectedValue(new Error('network down'));

    render(<ChargingSection />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /Analyze optimal window/i,
      }),
    );

    expect(
      await screen.findByText(/Couldn't compute your best charging window/i),
    ).toBeInTheDocument();

    expect(mockFetchChargingWindow).toHaveBeenCalledWith(3);
  });
});

import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { fetchGeneration } from './services/api';

vi.mock('./services/api', () => ({
  fetchGeneration: vi.fn(),
}));

vi.mock('./components/EnergyMixCard', () => ({
  default: ({ title }: { title: string }) => <div>{title}</div>,
}));

const mockFetchGeneration = vi.mocked(fetchGeneration);

describe('App test suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading cards initially', () => {
    mockFetchGeneration.mockImplementation(() => new Promise(() => {}));

    render(<App />);

    expect(screen.getAllByLabelText('Loading generation data')).toHaveLength(3);
  });

  it('should render error cards when fetch fails', async () => {
    mockFetchGeneration.mockRejectedValue(new Error('network down'));

    render(<App />);

    const errors = await screen.findAllByText(/Couldn't load the energy mix/i);

    expect(errors).toHaveLength(3);
  });

  it('should render energy cards when fetch succeeds', async () => {
    mockFetchGeneration.mockResolvedValue({
      status: 'success',
      data: [
        { date: '2026-05-27', sources: { wind: 50 }, cleanEnergyPercent: 50 },
        { date: '2026-05-28', sources: { wind: 60 }, cleanEnergyPercent: 60 },
        { date: '2026-05-29', sources: { wind: 70 }, cleanEnergyPercent: 70 },
      ],
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Today')).toBeInTheDocument();
      expect(screen.getByText('Tomorrow')).toBeInTheDocument();
      expect(screen.getByText('In 2 days')).toBeInTheDocument();
    });
  });
});

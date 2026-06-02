import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChargingSlotCard } from './ChargingSlotCard';

describe('ChargingSlotCard test suite', () => {
  it('should render current charging duration', () => {
    render(
      <ChargingSlotCard
        hours={5}
        onHoursChange={vi.fn()}
        onAnalyze={vi.fn()}
        analyzeLoading={false}
      />,
    );

    expect(screen.getByTestId('charging-hours-value')).toHaveTextContent('5');

    expect(screen.getByTestId('charging-hours-unit')).toHaveTextContent(
      'hours',
    );

    expect(
      screen.getByRole('button', {
        name: /Analyze optimal window/i,
      }),
    ).toBeInTheDocument();
  });

  it('should call onHoursChange when slider changes', () => {
    const onHoursChange = vi.fn();

    render(
      <ChargingSlotCard
        hours={3}
        onHoursChange={onHoursChange}
        onAnalyze={vi.fn()}
        analyzeLoading={false}
      />,
    );

    const slider = screen.getByLabelText('Charging duration in hours');
    fireEvent.change(slider, { target: { value: '5' } });

    expect(onHoursChange).toHaveBeenCalledWith(5);
  });

  it('should call onAnalyze when button is clicked', () => {
    const onAnalyze = vi.fn();

    render(
      <ChargingSlotCard
        hours={3}
        onHoursChange={vi.fn()}
        onAnalyze={onAnalyze}
        analyzeLoading={false}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', { name: /Analyze optimal window/i }),
    );
    expect(onAnalyze).toHaveBeenCalledTimes(1);
  });

  it('should disable analyze button when loading', () => {
    render(
      <ChargingSlotCard
        hours={3}
        onHoursChange={vi.fn()}
        onAnalyze={vi.fn()}
        analyzeLoading
      />,
    );

    expect(
      screen.getByRole('button', { name: /Analyze optimal window/i }),
    ).toBeDisabled();
  });

  it('should render singular hour unit for one hour', () => {
    render(
      <ChargingSlotCard
        hours={1}
        onHoursChange={vi.fn()}
        onAnalyze={vi.fn()}
        analyzeLoading={false}
      />,
    );

    expect(screen.getByTestId('charging-hours-unit')).toHaveTextContent('hour');
  });
});

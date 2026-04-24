import { useState } from 'react';

import type { ChargingWindowState } from '../types';
import { fetchChargingWindow } from '../services/api';

import Section from './Section';
import CardsGrid from './CardsGrid';
import { ChargingSlotCard } from './ChargingSlotCard';
import { ChargingWindowCard } from './ChargingWindowCard';

function chargingDurationLabel(hours: number): string {
  if (hours === 1) return '1-hour window';
  return `${hours}-hour window`;
}

export function ChargingSection() {
  const [hours, setHours] = useState(3);
  const [chargingWindow, setChargingWindow] = useState<ChargingWindowState>({
    status: 'idle',
  });

  async function handleAnalyze() {
    const analyzedHours = hours;
    setChargingWindow({ status: 'loading' });
    try {
      const response = await fetchChargingWindow(analyzedHours);
      setChargingWindow({
        status: 'result',
        result: response.data,
        durationLabel: chargingDurationLabel(analyzedHours),
      });
    } catch {
      setChargingWindow({ status: 'error' });
    }
  }

  return (
    <Section label="Optimal Charging Window">
      <CardsGrid columns={{ mobile: 1, tablet: 1, desktop: 2 }}>
        <ChargingSlotCard
          hours={hours}
          onHoursChange={setHours}
          onAnalyze={handleAnalyze}
          analyzeLoading={chargingWindow.status === 'loading'}
        />
        <ChargingWindowCard {...chargingWindow} />
      </CardsGrid>
    </Section>
  );
}

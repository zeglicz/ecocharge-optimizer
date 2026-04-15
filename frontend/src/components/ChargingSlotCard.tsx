import { useState } from 'react';
import { styled } from 'styled-components';

import Card from './Card';

const Title = styled.h3`
  font-weight: 500;
  font-size: 18px;
`;

const MutedText = styled.div`
  margin-top: 12px;
  color: var(--color-text-muted);
  font-size: 0.75rem;
`;

const FieldLabel = styled.div`
  margin-top: 25px;
  color: var(--color-text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const HourDisplay = styled.div`
  margin: 10px 0 14px;
`;

const HourValue = styled.span`
  font-family: 'Syne';
  font-size: 3.4rem;
  font-weight: 500;
  color: var(--color-accent-green);
  line-height: 1;
`;

const HourUnit = styled.span`
  font-size: 0.8rem;
  margin-left: 8px;
  color: var(--color-text-muted);
`;

const SliderContainer = styled.div``;

const DurationSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  margin-top: 4px;
  border-radius: 12px;
  background: var(--color-surface-2);
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--color-accent-green);
    border: 3px solid var(--color-bg);
    box-shadow: 0 0 0 1px var(--color-accent-green);
    cursor: pointer;
    transition: transform 0.15s;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--color-accent-green);
    border: 3px solid var(--color-bg);
    box-shadow: 0 0 0 1px var(--color-accent-green);
    cursor: pointer;
    transition: transform 0.15s;
  }

  &::-moz-range-thumb:hover {
    transform: scale(1.15);
  }

  &::-moz-range-track {
    height: 4px;
    border-radius: 2px;
    background: var(--color-surface-2);
  }
`;

const TickRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding: 0 2px;
`;

const Tick = styled.span`
  font-size: 0.6rem;
  color: var(--color-text-muted);
`;

const AnalyzeButton = styled.button`
  width: 100%;
  margin-top: 28px;
  padding: 14px 24px;
  border: none;
  border-radius: 10px;
  background: var(--color-accent-green);
  color: #050f0a;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition:
    opacity 0.2s,
    transform 0.15s;

  &:hover {
    opacity: 0.88;
    transform: translateY(-1px);
  }
`;

const HOUR_OPTIONS = [1, 2, 3, 4, 5, 6] as const;

function getForecastWindowHours(now: Date): number {
  const start = new Date(now);
  start.setSeconds(0, 0);

  if (start.getMinutes() < 30) {
    start.setMinutes(30);
  } else {
    start.setHours(start.getHours() + 1, 0, 0, 0);
  }

  const end = new Date(now);
  end.setHours(24, 0, 0, 0);
  end.setDate(end.getDate() + 2);

  return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
}

export function ChargingSlotCard() {
  const [hours, setHours] = useState(3);

  const hoursValue = getForecastWindowHours(new Date());
  const forecastWindowHours = Number.isInteger(hoursValue)
    ? String(hoursValue)
    : hoursValue.toFixed(1);

  return (
    <Card>
      <Title>Find your best slot</Title>
      <MutedText>
        Set how long you need to charge - we'll find the window with the highest
        share of clean energy across the next {forecastWindowHours} hours.
      </MutedText>

      <FieldLabel>charging duration</FieldLabel>
      <HourDisplay>
        <HourValue>{hours}</HourValue>
        <HourUnit>{hours === 1 ? 'hour' : 'hours'}</HourUnit>
      </HourDisplay>

      <SliderContainer>
        <DurationSlider
          type="range"
          min={1}
          max={6}
          value={hours}
          onChange={(event) => setHours(Number(event.target.value))}
          aria-label="Charging duration in hours"
        />
      </SliderContainer>

      <TickRow>
        {HOUR_OPTIONS.map((value) => (
          <Tick key={value}>{value}h</Tick>
        ))}
      </TickRow>

      <AnalyzeButton type="button">Analyze optimal window</AnalyzeButton>
    </Card>
  );
}

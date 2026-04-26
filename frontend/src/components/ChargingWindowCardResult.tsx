import { styled } from 'styled-components';

import type { ChargingWindowResult } from '../types';
import { media } from '../styles/media';

type ChargingWindowCardResultProps = {
  result: ChargingWindowResult;
  durationLabel: string;
};

const ResultBody = styled.div``;

const ScoreRow = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 4px 8px;
`;

const ScoreValue = styled.span`
  font-family: 'Syne', sans-serif;
  font-size: 2.8rem;
  font-weight: 500;
  color: var(--color-accent-green);
  line-height: 1;
`;

const ScoreLabel = styled.span`
  color: var(--color-text-muted);
  text-transform: uppercase;
  font-size: 0.8rem;
`;

const TimeRow = styled.div`
  margin-top: 28px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TimeBlock = styled.div`
  flex: 1;
  border-radius: 10px;
  padding: 15px;
  background: linear-gradient(
    180deg,
    rgba(0, 229, 160, 0.06) 0%,
    rgba(21, 32, 48, 0.8) 100%
  );
`;

const TimeBlockLabel = styled.div`
  color: var(--color-text-muted);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const TimeBlockDate = styled.div`
  margin-top: 6px;
  font-size: 0.7rem;
  color: var(--color-text-muted);
`;

const TimeBlockTime = styled.div`
  margin-top: 2px;
  font-family: 'Syne', sans-serif;
  font-size: 1.2rem;
  line-height: 1.1;
`;

const Arrow = styled.div`
  color: var(--color-text-muted);
  font-size: 1.1rem;
  flex-shrink: 0;
`;

const DurationTag = styled.div`
  margin-top: 19px;
  border-radius: 1000px;
  border: 1px solid rgba(0, 229, 160, 0.3);
  background: rgba(0, 229, 160, 0.08);
  color: var(--color-text);
  padding: 8px 14px;
  font-size: 0.7rem;
  display: inline-flex;
  align-items: center;

  ${media.lg`
    margin-top: 16px;
  `}
`;

export default function ChargingWindowCardResult({
  result,
  durationLabel,
}: ChargingWindowCardResultProps) {
  return (
    <ResultBody>
      <ScoreRow>
        <ScoreValue>{result.cleanEnergyPercent}%</ScoreValue>
        <ScoreLabel>avg clean energy</ScoreLabel>
      </ScoreRow>

      <TimeRow>
        <TimeBlock>
          <TimeBlockLabel>Start</TimeBlockLabel>
          <TimeBlockDate>{result.startDate}</TimeBlockDate>
          <TimeBlockTime>{result.startTime}</TimeBlockTime>
        </TimeBlock>

        <Arrow aria-hidden>→</Arrow>

        <TimeBlock>
          <TimeBlockLabel>End</TimeBlockLabel>
          <TimeBlockDate>{result.endDate}</TimeBlockDate>
          <TimeBlockTime>{result.endTime}</TimeBlockTime>
        </TimeBlock>
      </TimeRow>

      <DurationTag>{durationLabel}</DurationTag>
    </ResultBody>
  );
}

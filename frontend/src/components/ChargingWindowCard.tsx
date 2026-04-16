import { styled } from 'styled-components';

import Card from './Card';
// import { media } from '../styles/media';

const Title = styled.h3`
  font-weight: 500;
  font-size: 18px;
`;

const Subtitle = styled.div`
  margin-top: 12px;
  color: var(--color-text-muted);
  font-size: 0.75rem;
  margin-bottom: 32px;
`;

// const EmptyState = styled.div`
//   margin: 16px auto 0 auto;
//   display: flex;
//   width: 75%;
//   min-height: 210px;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   gap: 8px;

//   ${media.sm`
//     width: 330px;
//   `}

//   ${media.md`
//     min-height: 238px;
//   `}
// `;

// const ResultIcon = styled.div`
//   font-size: 36px;
//   line-height: 1;
//   opacity: 0.5;
// `;

// const Hint = styled.div`
//   color: var(--color-text-muted);
//   font-size: 0.75rem;
//   text-align: center;
// `;

const ScoreRow = styled.div``;

const ScoreValue = styled.span`
  font-family: 'Syne', sans-serif;
  font-size: 3.4rem;
  font-weight: 500;
  color: var(--color-accent-green);
  line-height: 1;
`;

const ScoreLabel = styled.span`
  color: var(--color-text-muted);
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-left: 8px;
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
`;

const DurationTag = styled.div`
  margin-top: 28px;
  border-radius: 1000px;
  border: 1px solid rgba(0, 229, 160, 0.3);
  background: rgba(0, 229, 160, 0.08);
  color: var(--color-text);
  padding: 8px 14px;
  font-size: 0.7rem;
  display: inline-flex;
  align-items: center;
`;

export function ChargingWindowCard() {
  return (
    <Card>
      <Title>Best charging window</Title>
      <Subtitle>Results will appear here after analysis.</Subtitle>
      {/* <EmptyState>
        <ResultIcon>🔋</ResultIcon>
        <Hint>
          Set your charging duration and click analyze to find the
          greenest
          window.
        </Hint>
      </EmptyState> */}

      <ScoreRow>
        <ScoreValue>74%</ScoreValue>
        <ScoreLabel>avg clean energy</ScoreLabel>
      </ScoreRow>

      <TimeRow>
        <TimeBlock>
          <TimeBlockLabel>Start</TimeBlockLabel>
          <TimeBlockDate>Tue, 31 Mar</TimeBlockDate>
          <TimeBlockTime>14:00</TimeBlockTime>
        </TimeBlock>

        <Arrow aria-hidden>→</Arrow>

        <TimeBlock>
          <TimeBlockLabel>End</TimeBlockLabel>
          <TimeBlockDate>Tue, 31 Mar</TimeBlockDate>
          <TimeBlockTime>17:00</TimeBlockTime>
        </TimeBlock>
      </TimeRow>

      <DurationTag>3-hour window</DurationTag>
    </Card>
  );
}

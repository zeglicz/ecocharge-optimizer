import { styled } from 'styled-components';

import type { ChargingWindowState } from '../types';
import { media } from '../styles/media';

import Card from './Card';
import ChargingWindowCardLoading from './ChargingWindowCardLoading';
import ChargingWindowCardError from './ChargingWindowCardError';
import ChargingWindowCardResult from './ChargingWindowCardResult';

const Title = styled.h3`
  font-weight: 500;
  font-size: 18px;
`;

const Subtitle = styled.div`
  margin-top: 12px;
  color: var(--color-text-muted);
  font-size: 0.75rem;
  margin-bottom: 24px;
`;

const StateContainer = styled.div`
  display: flex;
  width: 75%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  ${media.sm`
    width: 330px;
  `}
`;

const IdleState = styled(StateContainer)`
  margin: 0 auto;
  min-height: 216px;

  ${media.md`
    min-height: 205px;
  `}
`;

const IdleStateIcon = styled.div`
  font-size: 38px;
  line-height: 1.5;
  opacity: 0.5;
`;

const IdleStateMessage = styled.div`
  color: var(--color-text-muted);
  font-size: 0.75rem;
  text-align: center;
`;

export type ChargingWindowCardProps = ChargingWindowState;

function renderByStatus(props: ChargingWindowState) {
  switch (props.status) {
    case 'idle':
      return (
        <IdleState>
          <IdleStateIcon aria-hidden>🔋</IdleStateIcon>
          <IdleStateMessage>
            Set your charging duration and click analyze to find the greenest
            window.
          </IdleStateMessage>
        </IdleState>
      );
    case 'loading':
      return <ChargingWindowCardLoading />;
    case 'error':
      return <ChargingWindowCardError />;
    case 'result':
      return (
        <ChargingWindowCardResult
          result={props.result}
          durationLabel={props.durationLabel}
        />
      );
  }
}

export function ChargingWindowCard(
  props: ChargingWindowCardProps = { status: 'idle' },
) {
  return (
    <Card>
      <Title>Best charging window</Title>
      <Subtitle>Results will appear here after you run the analysis.</Subtitle>
      {renderByStatus(props)}
    </Card>
  );
}

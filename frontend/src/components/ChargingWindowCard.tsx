import { styled } from 'styled-components';

import Card from './Card';
import { media } from '../styles/media';

const Title = styled.h3`
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 4px;
`;

const Subtitle = styled.div`
  margin-top: 12px;
  color: var(--color-text-muted);
  font-size: 0.75rem;
`;

const EmptyState = styled.div`
  margin: 16px auto 0 auto;
  display: flex;
  width: 75%;
  min-height: 210px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  ${media.sm`
    width: 330px;
  `}

  ${media.md`
    min-height: 238px;
  `}
`;

const ResultIcon = styled.div`
  font-size: 36px;
  line-height: 1;
  opacity: 0.5;
`;

const Hint = styled.div`
  color: var(--color-text-muted);
  font-size: 0.75rem;
  text-align: center;
`;

export function ChargingWindowCard() {
  return (
    <Card>
      <Title>Best charging window</Title>
      <Subtitle>Results will appear here after analysis.</Subtitle>
      <EmptyState>
        <ResultIcon>🔋</ResultIcon>
        <Hint>
          Set your charging duration and click analyze to find the greenest
          window.
        </Hint>
      </EmptyState>
    </Card>
  );
}

import { keyframes, styled } from 'styled-components';

import { media } from '../styles/media';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingArea = styled.div`
  display: flex;
  width: 75%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 16px auto 0 auto;
  min-height: 216px;

  ${media.sm`
    width: 330px;
  `}

  ${media.lg`
    min-height: 214px;
  `}
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 5px solid rgba(0, 229, 160, 0.2);
  border-top-color: var(--color-accent-green);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export default function ChargingWindowCardLoading() {
  return (
    <LoadingArea aria-live="polite" aria-busy="true">
      <Spinner
        aria-label="Calculating best charging window"
        data-testid="charging-window-loading"
      />
    </LoadingArea>
  );
}

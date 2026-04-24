import { keyframes, styled } from 'styled-components';

import Card from './Card';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingCard = styled(Card)`
  min-height: 132px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 229, 160, 0.2);
  border-top-color: var(--color-accent-green);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export default function EnergyMixCardLoading() {
  return (
    <LoadingCard aria-live="polite" aria-busy="true">
      <Spinner aria-label="Loading generation data" />
    </LoadingCard>
  );
}

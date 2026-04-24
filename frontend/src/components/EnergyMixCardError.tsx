import { styled } from 'styled-components';

import Card from './Card';

type EnergyMixCardErrorProps = {
  title: string;
};

const ErrorCard = styled(Card)`
  min-height: 132px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  text-align: center;
  border-color: rgba(248, 113, 112, 0.25);
`;

const ErrorIcon = styled.div`
  font-size: 42px;
  line-height: 1;
  color: var(--color-accent-red);
`;

const ErrorTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
`;

const ErrorMessage = styled.p`
  color: var(--color-text-muted);
  font-size: 0.75rem;
  max-width: 240px;
`;

export default function EnergyMixCardError({ title }: EnergyMixCardErrorProps) {
  return (
    <ErrorCard aria-live="polite" aria-busy="false">
      <ErrorIcon aria-hidden>⚠</ErrorIcon>
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorMessage>
        Could not load generation data right now. Please try again in a moment.
      </ErrorMessage>
    </ErrorCard>
  );
}

import { styled } from 'styled-components';

import { media } from '../styles/media';

const ErrorArea = styled.div`
  display: flex;
  width: 75%;
  min-height: 174px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 16px auto 42px auto;

  ${media.sm`
    width: 330px;
  `}

  ${media.md`
    min-height: 176px;
  `}
`;

const WarningIcon = styled.div`
  margin-top: 20px;
  font-size: 80px;
  line-height: 1;
  color: var(--color-accent-red);
`;

const StateMessage = styled.div`
  color: var(--color-text-muted);
  font-size: 0.75rem;
  text-align: center;
`;

export default function ChargingWindowCardError() {
  return (
    <ErrorArea aria-live="polite" aria-busy="false">
      <WarningIcon aria-hidden>⚠</WarningIcon>
      <StateMessage>
        Something went wrong while calculating your best charging window. Try
        again later.
      </StateMessage>
    </ErrorArea>
  );
}

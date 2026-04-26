import { styled } from 'styled-components';

import { media } from '../styles/media';

const ErrorArea = styled.div`
  display: flex;
  width: 75%;
  min-height: 210px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 16px auto 42px auto;

  ${media.sm`
    width: 330px;
  `}

  ${media.md`
    min-height: 216px;
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
        Couldn&apos;t compute your best charging window. Check your connection
        and try again in a moment.
      </StateMessage>
    </ErrorArea>
  );
}

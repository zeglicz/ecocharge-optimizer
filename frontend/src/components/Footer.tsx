import styled from 'styled-components';

import { breakpoints } from '../styles/breakpoints';
import { media } from '../styles/media';

const FooterStyled = styled.footer`
  color: #aaa;
  margin-top: 40px;
  padding: 24px 20px;
  border-top: 1px solid var(--color-border);
`;

const FooterInner = styled.div`
  max-width: ${breakpoints.lg}px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  ${media.md`
    flex-direction: row;
    justify-content: space-between;
  `}
`;

const SourceCard = styled.a`
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface);
  font-size: 0.7rem;
  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    color: var(--color-accent-green);
    border-color: rgba(0, 229, 160, 0.35);
    transform: translateY(-1px);
  }
`;

const FooterText = styled.p`
  color: var(--color-text-muted);
  font-size: 0.75rem;
`;

const InlineLink = styled.a`
  color: #aaa;
  font-size: 0.8rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-accent-green);
  }
`;

function Footer() {
  return (
    <FooterStyled>
      <FooterInner>
        <SourceCard
          href="https://api.carbonintensity.org.uk"
          target="_blank"
          rel="noreferrer"
        >
          Carbon Intensity API
        </SourceCard>

        <FooterText>
          Created by{' '}
          <InlineLink
            href="https://github.com/zeglicz/ecocharge-optimizer"
            target="_blank"
            rel="noreferrer"
          >
            Przemysław Żeglicz
          </InlineLink>
        </FooterText>
      </FooterInner>
    </FooterStyled>
  );
}

export default Footer;

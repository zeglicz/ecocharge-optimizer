import type { ReactNode } from 'react';
import styled from 'styled-components';

type SectionProps = {
  label: string;
  children: ReactNode;
};

const SectionStyled = styled.section`
  padding: 0 20px 20px 20px;
`;

const Label = styled.div`
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 40px 15px 30px 15px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }
`;

function Section({ label, children }: SectionProps) {
  return (
    <SectionStyled>
      <Label>{label}</Label>
      {children}
    </SectionStyled>
  );
}

export default Section;

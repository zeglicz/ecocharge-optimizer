import type { ReactNode } from 'react';
import styled from 'styled-components';

import { media } from '../styles/media';

type GridColumns = {
  mobile: number;
  tablet: number;
  desktop: number;
};

type CardsGridProps = {
  columns: GridColumns;
  children: ReactNode;
};

type StyledGridProps = {
  $mobile: number;
  $tablet: number;
  $desktop: number;
};

const Grid = styled.div<StyledGridProps>`
  /* CSS vars used to keep TS happy with media helper interpolations */
  --grid-mobile: ${({ $mobile }) => $mobile};
  --grid-tablet: ${({ $tablet }) => $tablet};
  --grid-desktop: ${({ $desktop }) => $desktop};

  display: grid;
  grid-template-columns: repeat(var(--grid-mobile), 1fr);
  gap: 20px;

  ${media.md`
    grid-template-columns: repeat(var(--grid-tablet), 1fr);
  `}

  ${media.lg`
    grid-template-columns: repeat(var(--grid-desktop), 1fr);
  `}
`;

function CardsGrid({ columns, children }: CardsGridProps) {
  const { mobile, tablet, desktop } = columns;

  return (
    <Grid $mobile={mobile} $tablet={tablet} $desktop={desktop}>
      {children}
    </Grid>
  );
}

export default CardsGrid;

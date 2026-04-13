import { css } from 'styled-components';
import { breakpoints } from './breakpoints';

type CssArgs = Parameters<typeof css>;

export const media = {
  md: (...args: CssArgs) => css`
    @media (min-width: ${breakpoints.md}px) {
      ${css(...args)}
    }
  `,
  lg: (...args: CssArgs) => css`
    @media (min-width: ${breakpoints.lg}px) {
      ${css(...args)}
    }
  `,
};

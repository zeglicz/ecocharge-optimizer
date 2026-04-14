import { css } from 'styled-components';
import { breakpoints } from './breakpoints';

type CssArgs = Parameters<typeof css>;

export const media = {
  sm: (...args: CssArgs) => css`
    @media (min-width: ${breakpoints.sm}px) {
      ${css(...args)}
    }
  `,
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

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  --color-bg: #090e12;
  --color-surface: #0f1820;
  --color-surface-2: #152030;
  --color-text: #e8f0f8;
  --color-text-muted: #5a7080;
  --color-accent-green: #00e5a0;
  --color-accent-yellow: #fde689;
  --color-accent-red: #f87170;
  --color-border: rgba(255, 255, 255, 0.07);

  --biomass: #6fcf4a;
  --nuclear: #f5a623;
  --hydro: #4ab8f5;
  --wind: #a78bfa;
  --solar: #fde68a;
  --gas: #f87171;
  --coal: #94a3b8;
  --imports: #fb923c;
  --other: #64748b;
}

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'DM Mono', monospace;
  background: var(--color-bg);
  color: var(--color-text);
  min-height: 100vh;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

button:disabled,
input:disabled,
textarea:disabled,
select:disabled {
  opacity: 0.6;
}

input:focus-visible,
button:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid var(--color-accent-green);
  outline-offset: 2px;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}


a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
}
`;

export default GlobalStyles;

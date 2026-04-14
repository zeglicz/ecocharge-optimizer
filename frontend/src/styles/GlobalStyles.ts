import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  --bg-color: #090e12;
  --text-color: #e8f0f8;
  --text-muted: #5a7080;
  --green-accent: #00e5a0;
  --yellow-accent:#fde689;
  --red-accent: #f87170;

  --border: rgba(255, 255, 255, 0.07);

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
  background: var(--bg-color);
  color: var(--text-color);
  min-height: 100vh;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

/* TODO: */
/*
select:disabled,
input:disabled {
  background-color: #000;
  color: #000;
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
} */

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

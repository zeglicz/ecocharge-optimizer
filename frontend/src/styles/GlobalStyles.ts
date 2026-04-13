import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  --bg-color: #090e12;
  --text-color: #e8f0f8;
  --text-muted: #5a7080;
  --green-accent: #00e5a0;

  --border: rgba(255, 255, 255, 0.07);
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

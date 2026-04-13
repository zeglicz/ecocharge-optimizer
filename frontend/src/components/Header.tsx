import styled from 'styled-components';
import { media } from '../styles/media';

const HeaderStyled = styled.header`
  display: flex;
  margin: 0 auto;
  padding: 40px 0;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--border);

  img {
    height: 50px;
    padding: 2px;
    margin-right: 5px;
  }

  h1 {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.5rem;
    line-height: 1;
    width: 210px;
  }

  ${media.md`
    h1 {
        width: 405px;
    }

    img {
        height: 30px;
        margin-right: 3px;
    }
  `}
`;

const Highlight = styled.span`
  color: var(--green-accent);
`;

function Header() {
  return (
    <HeaderStyled>
      <img src="/favicon.png" alt="Logo Ecocharge Optimizer" />
      <h1>
        Eco<Highlight>charge</Highlight> Optimizer
      </h1>
    </HeaderStyled>
  );
}

export default Header;

import styled from 'styled-components';
import { media } from '../styles/media';

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  ${media.lg`
    grid-template-columns: repeat(3, 1fr);
  `}
`;

export default CardContainer;

import styled from 'styled-components';

const Card = styled.div`
  background: #0f1820;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  /* overflow: hidden; */
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(0, 229, 160, 0.2);
  }

  /* &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 5px;
    right: 0;
    height: 2px;
    background: linear-gradient(30deg, var(--green-accent), transparent);
    opacity: 0.6;
  } */
`;

export default Card;

import styled from "styled-components";

export const Container = styled.div`
  box-sizing: border-box;
  text-align: center;
  padding: 0 10px;
  max-width: 100%;
  width: 100%;
`;

export const Button = styled.button`
  display: block;
  color: #ffffff;
  background-color: #000000;
  padding: 8px 30px;
  font-size: 16px;
  font-weight: 500;
  margin: 0 auto;
  cursor: pointer;
  min-width: 135px;
  border: none;
  
  &:hover {
    background-color: #272727;
  }
`;

export const Paragraph = styled.p`
  color: #757677;
  font-size: 16px;
  font-weight: normal;
  text-align: start;
`;

export const Title = styled.h3`
  text-transform: uppercase;
  font-size: 24px;
  font-weight: bold;
`;

export const Note = styled.h4`
  text-align: start;
`;

export const Image = styled.img``;

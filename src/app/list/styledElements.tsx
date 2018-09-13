import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 10px 0;
`;

export const Row = styled.div`
  height: 32px;
  line-height: 1.5em;

  display: flex;
  justify-content: space-around;
  margin: 10px 0;

  border-bottom: 1px solid #e8e8e8;
`;

export const Column = styled.div`
  align-self: center;
  width: ${(props: { of: number }) => Math.floor(100 / props.of)}%;
`;

import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: 10px 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
`;

const Column = styled.div`
  width: 30%;
  text-align: center;
`;

interface IHeader<T> {
  key: T;
  text: string;
}
interface IProps<T> {
  headers: Array<IHeader<keyof T>>;
  source: T[];
}

class List<T extends object> extends React.PureComponent<IProps<T>> {
  public render() {
    const headers = (
      <Row>
        {this.props.headers.map((h, i) => (
          <Column key={i}>{h.text}</Column>
        ))}
      </Row>
    );
    const rows = this.props.source.map((e, i) => (
      <Row key={i}>
        {this.props.headers.map((h, ii) => (
          <Column key={ii}>{e[h.key]}</Column>
        ))}
      </Row>
    ));

    return (
      <Container>
        {headers}
        {rows}
      </Container>
    );
  }
}

export default List;

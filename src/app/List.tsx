import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: 10px 0;
`;

const Row = styled.div`
  height: 32px;
  line-height: 1.5em;

  display: flex;
  justify-content: space-around;
  margin: 10px 0;

  border-bottom: 1px solid #e8e8e8;
`;

const Header = styled(Row)`
  background: #fafafa;
  text-align: left;
`;

const Column = styled.div`
  align-self: center;
  width: ${(props: { of: number }) => Math.floor(100 / props.of)}%;
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
      <Header>
        {this.props.headers.map((h, i) => (
          <Column key={i} of={this.props.headers.length}>
            {h.text}
          </Column>
        ))}
      </Header>
    );
    const rows = this.props.source.map((e, i) => (
      <Row key={i}>
        {this.props.headers.map((h, ii) => (
          <Column key={ii} of={this.props.headers.length}>
            {e[h.key]}
          </Column>
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

import * as React from "react";
import styled from "styled-components";
import ListEntry from "./ListEntry";
import { Column, Container, Row } from "./styledElements";

const Header = styled(Row)`
  background: #fafafa;
  text-align: left;
`;

interface IHeader<T> {
  key: T;
  text: string;
}
interface IProps<T> {
  headers: Array<IHeader<keyof T>>;
  source: T[];
}

class List<T extends object> extends React.Component<IProps<T>> {
  public render() {
    const { headers, source } = this.props;
    const header = (
      <Header>
        {headers.map((h, i) => (
          <Column key={i} of={headers.length}>
            {h.text}
          </Column>
        ))}
      </Header>
    );
    const rows = source.map((e, i) => (
      <ListEntry key={i} entryKeys={headers.map(h => h.key)} entry={e} />
    ));

    return (
      <Container>
        {header}
        {rows}
      </Container>
    );
  }
}

export default List;

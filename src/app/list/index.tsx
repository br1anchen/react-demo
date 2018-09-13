import * as React from "react";
import styled from "styled-components";
import ListEntry from "./ListEntry";
import { Column, Container, Row } from "./styledElements";

const Header = styled(Row)`
  background: #fafafa;
  text-align: left;
`;

interface IColumn<T> {
  key: T;
  text: string;
}
interface IProps<T> {
  isLoaded: boolean;
  columns: Array<IColumn<keyof T>>;
  source: T[];
}

/**
 * List component to take generic source columned by headers
 *
 * @class List
 * @extends {React.Component<IProps<T>>}
 * @template T
 */
class List<T extends object> extends React.Component<IProps<T>> {
  public static noMatchText = "No match";
  public static loadingText = "Loading...";

  public render() {
    const header = (
      <Header>
        {this.props.columns.map((h, i) => (
          <Column key={i} of={this.props.columns.length}>
            {h.text}
          </Column>
        ))}
      </Header>
    );

    return (
      <Container>
        {header}
        {this.getContent()}
      </Container>
    );
  }

  private getContent() {
    const { columns, source, isLoaded } = this.props;
    if (!isLoaded) {
      return List.loadingText;
    } else if (source.length === 0) {
      return List.noMatchText;
    } else {
      return source.map((e, i) => (
        <ListEntry key={i} entryKeys={columns.map(h => h.key)} entry={e} />
      ));
    }
  }
}

export default List;

import * as React from "react";
import { Column, Row } from "./styledElements";

interface IEntryProps<T> {
  entryKeys: Array<keyof T>;
  entry: T;
}
/**
 * Use PureComponent to do shallow comparison of props
 *
 * @class ListEntry
 * @extends {React.PureComponent<IEntryProps<T>>}
 * @template T
 */
class ListEntry<T extends object> extends React.PureComponent<IEntryProps<T>> {
  public render() {
    return (
      <Row>
        {this.props.entryKeys.map((k, ii) => (
          <Column key={ii} of={this.props.entryKeys.length}>
            {this.props.entry[k]}
          </Column>
        ))}
      </Row>
    );
  }
}

export default ListEntry;

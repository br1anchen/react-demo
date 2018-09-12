import * as React from "react";

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
      <tr>
        {this.props.headers.map((h, i) => (
          <th key={i}>{h.text}</th>
        ))}
      </tr>
    );
    const rows = this.props.source.map((e, i) => (
      <tr key={i}>
        {this.props.headers.map((h, ii) => (
          <td key={ii}>{e[h.key]}</td>
        ))}
      </tr>
    ));

    return (
      <table>
        <thead>{headers}</thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default List;

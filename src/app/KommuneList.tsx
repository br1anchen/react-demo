import * as React from "react";
import { IKommune } from "../api/index";

type Column = keyof IKommune;

const tableColumns: Column[] = ["description", "label", "status"];
const tableHeaders: Record<Column, string> = {
  description: "Description",
  label: "Label",
  status: "Status"
};

interface IProps {
  kommunes: IKommune[];
}

class KommuneList extends React.PureComponent<IProps> {
  public render() {
    const headers = (
      <tr>
        {tableColumns.map((c, i) => (
          <th key={i}>{tableHeaders[c]}</th>
        ))}
      </tr>
    );
    const rows = this.props.kommunes.map((k, i) => (
      <tr key={i}>
        {tableColumns.map((c, ii) => (
          <td key={ii}>{k[c]}</td>
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

export default KommuneList;

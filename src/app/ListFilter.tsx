import * as React from "react";

interface IProps {
  placeHolder?: string;
  onFilterChanged: (newValue: string) => void;
}
class ListFilter extends React.PureComponent<IProps> {
  public render() {
    return (
      <input
        placeholder={this.props.placeHolder}
        onChange={this.handleFilterChanged}
      />
    );
  }
  private handleFilterChanged = (
    evt: React.SyntheticEvent<HTMLInputElement>
  ) => {
    this.props.onFilterChanged(evt.currentTarget.value);
  };
}

export default ListFilter;

import * as React from "react";

export interface IFilter<T> {
  type: T;
  text: string;
}

interface IProps<T> {
  placeHolder?: string;
  onFilterChanged: (keyword: string, type: T) => void;
  defaultFilter: T;
  filters: Array<IFilter<T>>;
}

interface IState<T> {
  keyword: string;
  selectedFilter: T;
}

class ListFilter<T extends string> extends React.PureComponent<
  IProps<T>,
  IState<T>
> {
  public state: IState<T> = {
    keyword: "",
    selectedFilter: this.props.defaultFilter
  };
  public render() {
    return (
      <div>
        <input
          placeholder={this.props.placeHolder}
          onChange={this.handleKeywordChanged}
        />
        {this.props.filters.map(f => (
          <button
            style={{
              backgroundColor:
                this.state.selectedFilter === f.type ? "grey" : "white"
            }}
            value={f.type}
            onClick={this.handleFilterSelected}
          >
            {f.text}
          </button>
        ))}
      </div>
    );
  }
  private handleKeywordChanged = (
    evt: React.SyntheticEvent<HTMLInputElement>
  ) => {
    this.setState(
      { keyword: evt.currentTarget.value },
      this.handleFilterChanged
    );
  };
  private handleFilterSelected = (
    evt: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    this.setState(
      { selectedFilter: evt.currentTarget.value as T },
      this.handleFilterChanged
    );
  };
  private handleFilterChanged = () => {
    this.props.onFilterChanged(this.state.keyword, this.state.selectedFilter);
  };
}

export default ListFilter;

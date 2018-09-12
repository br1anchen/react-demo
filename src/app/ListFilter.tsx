import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: 10px 0;

  display: flex;
  justify-content: space-around;
`;

const KeywordInput = styled.input`
  width: 30%;

  display: block;
  padding: 10px;
  box-shadow: grey 0px 1px 3px, grey 0px 1px 0px;
  border: 0;
  outline: 0;
  border-radius: 4px;
  background: white;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FilterTypeButton = styled.button`
  white-space: nowrap;
  border: 0;
  outline: 0;
  display: inline-block;
  padding: 10px;
  margin-right: 2px;
  box-shadow: grey 0px 1px 3px, grey 0px 1px 0px;
  color: ${(props: { selected: boolean }) =>
    props.selected ? "white" : "black"};
  border-radius: 4px;
  text-transform: uppercase;

  background-color: ${props => (props.selected ? "grey" : "white")};
  text-decoration: none;
  -webkit-transition: all 150ms ease;
  transition: all 150ms ease;

  &:hover {
    cursor: pointer;
    transform: translateY(-1px);
  }
`;

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
      <Container>
        <KeywordInput
          placeholder={this.props.placeHolder}
          onChange={this.handleKeywordChanged}
        />
        <FilterSection>
          {this.props.filters.map(f => (
            <FilterTypeButton
              selected={this.state.selectedFilter === f.type}
              value={f.type}
              onClick={this.handleFilterSelected}
            >
              {f.text}
            </FilterTypeButton>
          ))}
        </FilterSection>
      </Container>
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

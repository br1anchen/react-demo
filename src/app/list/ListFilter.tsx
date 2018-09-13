import * as React from "react";
import styled from "styled-components";
import { Container } from "./styledElements";

const FilterContainer = styled(Container)`
  font-size: 14px;

  display: flex;
  justify-content: space-around;
`;

const KeywordInput = styled.input`
  width: 30%;
  height: 32px;

  display: block;
  padding: 4px 10px;
  margin 0;
  line-height: 1.5em;

  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: white;

  transition: all .3s;

  &:hover {
    border-color: #40a9ff;
    border-right-width: 1px;
  }

  &:focus {
    border-color: #40a9ff;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    border-right-width: 1px;
  }
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FilterTypeButton = styled.button`
  height: 32px;

  display: inline-block;
  padding: 0 15px;
  margin: 1px 0;
  line-height: 1.5em;

  cursor: pointer;
  white-space: nowrap;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;

  border-radius: 4px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  outline: 0;

  color: ${(props: { selected: boolean }) =>
    props.selected ? "white" : "black"};
  background-color: ${props => (props.selected ? "#40a9ff" : "white")};

  transition: all 0.3s;
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

/**
 * ListFilter component to control keyword search and filter types
 *
 * @class ListFilter
 * @extends {React.PureComponent<IProps<T>, IState<T>>}
 * @template T
 */
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
      <FilterContainer>
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
      </FilterContainer>
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

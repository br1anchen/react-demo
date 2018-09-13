import * as React from "react";
import styled from "styled-components";
import { getKommunes, IKommune } from "../api";
import ErrorBoundary from "./ErrorBoundary";
import List from "./List";
import ListFilter, { IFilter } from "./ListFilter";

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 20px;
  width: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface IState {
  filteredKommunes: IKommune[];
  kommunes: IKommune[];
}

type FilterType = keyof IKommune;

const matchDescription = (match: string, type: FilterType) => (k: IKommune) => {
  return k[type].toLowerCase().indexOf(match.toLowerCase()) !== -1;
};

class App extends React.Component<{}, IState> {
  private static defaultFilter: FilterType = "description";
  private static filters: Array<IFilter<FilterType>> = [
    { type: "description", text: "Description" },
    { type: "label", text: "Label" },
    { type: "status", text: "Status" }
  ];
  public state: IState = {
    filteredKommunes: [],
    kommunes: []
  };
  public async componentDidMount() {
    try {
      const kommunes = await getKommunes();
      this.setState({ kommunes, filteredKommunes: kommunes });
    } catch (e) {
      throw new Error(e);
    }
  }
  public render() {
    return (
      <ErrorBoundary>
        <Wrapper>
          <ListFilter<FilterType>
            placeHolder={"Search"}
            defaultFilter={App.defaultFilter}
            filters={App.filters}
            onFilterChanged={this.handleFilterChanged}
          />
          <List<IKommune>
            headers={App.filters.map(f => ({ key: f.type, text: f.text }))}
            source={this.state.filteredKommunes}
          />
        </Wrapper>
      </ErrorBoundary>
    );
  }
  private handleFilterChanged = (keyword: string, type: FilterType) => {
    if (this.state.kommunes.length > 0) {
      const match = matchDescription(keyword, type);
      this.setState({
        filteredKommunes: this.state.kommunes.filter(match)
      });
    }
  };
}

export default App;

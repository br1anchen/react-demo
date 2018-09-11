import * as React from "react";
import { getKommunes, IKommune } from "../api";
import ErrorBoundary from "./ErrorBoundary";
import KommuneList from "./KommuneList";
import ListFilter from "./ListFilter";

interface IState {
  filteredKommunes: IKommune[];
  kommunes: IKommune[];
}

const matchDescription = (match: string) => (k: IKommune) => {
  return k.description.toLowerCase().indexOf(match) !== -1;
};

class App extends React.Component<{}, IState> {
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
        <ListFilter
          placeHolder={"Type keyword to filter"}
          onFilterChanged={this.handleFilterChanged}
        />
        <KommuneList kommunes={this.state.filteredKommunes} />
      </ErrorBoundary>
    );
  }
  private handleFilterChanged = (newFilter: string) => {
    if (this.state.kommunes.length > 0) {
      const match = matchDescription(newFilter);
      this.setState({
        filteredKommunes: this.state.kommunes.filter(match)
      });
    }
  };
}

export default App;

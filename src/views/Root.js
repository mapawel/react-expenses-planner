import React from 'react';
import RootTemplate from 'templates/RootTemplate';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { routes } from 'routes';
import { Provider } from 'react-redux';
import store from 'store';
import Dashboard from 'views/Dashboard';
import CalendarView from 'views/CalendarView';
import TestView3 from 'views/TestsViews/TestView3';
import DataUpdater from 'assets/data/DataUpdater';
import AppContext from 'context';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date(),
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.updateState, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateState = () => {
    this.setState({
      currentTime: new Date(),
    });
  }

  render() {
    const { currentTime } = this.state;
    const contextElements = {
      currentTime,
    };

    return (
      <Provider store={store}>
        <DataUpdater />
        <BrowserRouter>
          <AppContext.Provider value={contextElements}>
            <RootTemplate>
              <Switch>
                <Route exact path={routes.home} render={() => <Redirect to={routes.dashboard} />} />
                <Route path={routes.dashboard} component={Dashboard} />
                <Route path={routes.calendar} component={CalendarView} />
                <Route path={routes.test3} component={TestView3} />
              </Switch>
            </RootTemplate>
          </AppContext.Provider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;

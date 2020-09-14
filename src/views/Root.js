/* eslint-disable react/state-in-constructor */
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
import PaymentView from 'views/PaymentView';
import TestView3 from 'views/TestsViews/TestView3';
import MonthView from 'views/MonthView';
import DaysView from 'views/DaysView';
import AddPaymentView from 'views/AddPaymentView';
import ProceedPayment from 'views/ProceedPayment';
import DataUpdater from 'assets/data/DataUpdater';
import AppContext from 'context';
import { loadState } from 'localStorage';

class Root extends React.Component {
    state = {
      currentTime: new Date(),
      monthShift: 0,
      displiedDate: new Date(),
      isDataUpdaterShown: true,
    };

    componentDidMount() {
      const { currentTime } = this.state;
      this.timer = setInterval(this.updateTime, 60000);
      this.setState({
        displiedDate: new Date(currentTime.getFullYear(), currentTime.getMonth()),
      });
      if (loadState()) {
        this.setState({
          isDataUpdaterShown: false,
        });
      }
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }

  updateTime = () => {
    this.setState({
      currentTime: new Date(),
    });
  }

  handleMonthShift = (shift) => {
    const { currentTime, monthShift } = this.state;
    const calculatedMonth = currentTime.getMonth() + monthShift + shift + 1200;
    const calendarCalculatedMonth = calculatedMonth % 12;
    const calculatedYear = currentTime.getFullYear() + Math.floor((calculatedMonth - 1200) / 12);
    const displiedDate = new Date(calculatedYear, calendarCalculatedMonth);
    this.setState((prevState) => ({
      monthShift: prevState.monthShift + shift,
      displiedDate,
    }));
    if (shift === 0) {
      this.setState((prevState) => ({
        monthShift: 0,
        displiedDate: new Date(prevState.currentTime.getFullYear(), prevState.currentTime.getMonth()),
      }));
    }
  }

  handleDataUpdaterShow = () => {
    this.setState({
      isDataUpdaterShown: false,
    });
  }

  render() {
    const contextElements = {
      ...this.state,
      handleMonthShift: this.handleMonthShift,
      handleDataUpdaterShow: this.handleDataUpdaterShow,
    };

    const { isDataUpdaterShown } = this.state;

    return (
      <Provider store={store}>
        <BrowserRouter>
          <AppContext.Provider value={contextElements}>
            <RootTemplate>
              {isDataUpdaterShown && <DataUpdater />}
              <Switch>
                <Route exact path={routes.home} render={() => <Redirect to={routes.dashboard} />} />
                <Route path={routes.dashboard} component={Dashboard} />
                <Route path={routes.calendar} component={CalendarView} />
                <Route path={routes.test3} component={TestView3} />
                <Route path={routes.month} component={MonthView} />
                <Route path={routes.day} component={DaysView} />
                <Route path={routes.payment} component={PaymentView} />
                <Route path={routes.addnew} component={AddPaymentView} />
                <Route path={routes.proceed} component={ProceedPayment} />
              </Switch>
            </RootTemplate>
          </AppContext.Provider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;

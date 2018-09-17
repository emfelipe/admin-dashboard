import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import CONFIG from './config'

import Menu from "./components/Menu";

import TablePage from "./pages/TablePage";
import Statistics from "./pages/Statistics";
import columnsUsers from "./pages/columnsUsers";
import columnsPayments from "./pages/columnsPayments";

const token = CONFIG.TOKEN;

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route
          render={({ location }) => (
            <div className="container">
              <Menu />
              <div className="content l h100">
                {/* <TransitionGroup>
                  <CSSTransition key={location.pathname.split('/')[1]} timeout={150} classNames="pagefade" data-a-current="1" mountOnEnter={false} unmountOnExit={false}> */}
                <Switch location={location}>
                  <Route exact path="/" render={() => <Statistics />} />
                  <Route
                    path="/users"
                    render={props => (
                      <TablePage
                        {...props}
                        key={1}
                        title="Users"
                        columns={columnsUsers}
                        link="user/list"
                        token={token}
                      />
                    )}
                  />
                  <Route
                    path="/payments"
                    render={props => (
                      <TablePage
                        {...props}
                        key={2}
                        title="Payments"
                        columns={columnsPayments}
                        link="payments/list"
                        token={token}
                      />
                    )}
                  />
                  <Route
                    path="/licences"
                    render={props => (
                      <TablePage
                        {...props}
                        key={2}
                        title="Licenes"
                        columns={columnsPayments}
                        link="payments/list"
                        token={token}
                      />
                    )}
                  />
                  <Route render={() => <div>Nothing here</div>} />
                </Switch>
                {/* </CSSTransition>
                </TransitionGroup> */}
              </div>
            </div>
          )}
        />
      </BrowserRouter>
    );
  }
}

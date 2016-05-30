import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { Router, Route,IndexRoute, hashHistory, browserHistory, createBrowserHistory } from 'react-router'
import store from '../store/configureStore'

// PAGES and COMPONENTS

import CustomerPage from '../pages/CustomerPage'
import FindingsPage from '../pages/FindingsPage'
import InscriptionPage from '../pages/inscription'
import ConnexionPage from '../pages/Connexion'
import NotificationsPage from '../pages/Notifications'
import FindingDetailsPage from '../pages/FindingDetailsPage'

import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createHistory } from 'history'

import * as MainActions from '../actions'

function IndexComponent({ children }) {
  const location = children.props.location.pathname
  if(location === "/") {
    store.dispatch(MainActions.checkUserConnection("/findingsList"))
  }
  return (
    <div className="main-container">
      <div className="main-content">
        {children}
      </div>
    </div>
  )
}

class AppRoute extends React.Component {
  render() {
    const history = syncHistoryWithStore(hashHistory, store)
    return (
        <Provider store={store}>
          <Router history={history}>
            <Route path="/" component={IndexComponent}>
              <IndexRoute component={ConnexionPage}/>
              <Route path="/findingsList" component={FindingsPage}/>
              <Route path="/customerList" component={CustomerPage}/>
              <Route path="/findingDetails" component={FindingDetailsPage}/>
              <Route path="/inscriptionPage" component={InscriptionPage}/>
              <Route path="/notifications" component={NotificationsPage}/>
              <Route path="/connexionPage" component={ConnexionPage}/>
            </Route>
          </Router>
        </Provider>,
    );
  }
}

export default AppRoute

// STYLE
import '../../scss/base.scss';
import Parse from 'parse'
import ParseReact from 'parse-react'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route,IndexRoute, browserHistory } from 'react-router'
import { syncHistory, routeReducer, routeActions } from 'react-router-redux'
import { Link, hashHistory } from 'react-router'
import store from './store/configureStore'
import * as Actions from './actions'
import AppRoute from './components/AppRoute'
import {_NOTIFICATIONS_PAGE_URL} from './constants/config'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { _PARSE_APP_KEY, _PARSE_SERVER_URL } from './constants/config'
injectTapEventPlugin();

// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

const notifyMe = ( _notificationBody ) => {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('MyHuissier - A new finding was added', {
      icon: require("../../public/images/logo.png"),
      body: _notificationBody,
    });

    notification.onclick = function () {
      window.open( _NOTIFICATIONS_PAGE_URL );
    };
  }
}

Parse.initialize(_PARSE_APP_KEY)
Parse.serverURL = _PARSE_SERVER_URL
let _constatLiveQuery = new Parse.Query('constat')
let _subscriptionConstatLiveQuery = _constatLiveQuery.subscribe();

_subscriptionConstatLiveQuery.on('create', (constat) => {
  console.log('constat created and title === ' + constat.get('title'));
  notifyMe(constat.get('title'))

  //update notifications state on database and on local store
  store.dispatch(Actions.updateNotificationState(constat))
  store.dispatch(Actions.addFindingToState(constat))
});

ReactDOM.render(
  <Provider store={store}>
    <AppRoute />
  </Provider>,
  document.getElementById('app')
)

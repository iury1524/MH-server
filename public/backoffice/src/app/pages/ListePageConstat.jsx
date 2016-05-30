import React from 'react';
import VisibleConstatTableSimple from '../components/ListeConstat'
import HeaderBar from '../components/HeaderBar'
import {  prendreListeConstatViaParse } from '../actions'
import store from '../store/configureStore'
import RaisedButton from 'material-ui/lib/raised-button'

export default class MesConstats extends React.Component {

componentDidMount(){
  store.dispatch( prendreListeConstatViaParse() ) ;
}

render() {
    return (
      <div>
        <HeaderBar title="Liste des constats" className="header-bar" />
        <div id="mes-constats-container">
          <VisibleConstatTableSimple />
        </div>
      </div>
    );
  }
};

import React from 'react'
import ReactDOM from 'react-dom'
import { routeActions } from 'react-router-redux'
import FlatButton from 'material-ui/lib/flat-button'
import store from '../store/configureStore'

export default class Footer extends React.Component {
  render() {
    return (
      <div id="footer" className="grid-4" >
        <div className="box">
            <FlatButton
              label="Mon compte"
              onClick={() => store.dispatch(routeActions.push('/mon_compte'))}
            />
        </div>
        <div className="box">
            <FlatButton
              label="Mes constats"
              onClick={() => store.dispatch(routeActions.push('/mes_constats'))}
            />
        </div>
        <div className="box">
            <FlatButton
              label="Mes droits"
              onClick={() => store.dispatch(routeActions.push('/mes_droits'))}
            />
        </div>
        <div className="box">
            <FlatButton
              label="Aide"
              onClick={() => store.dispatch(routeActions.push('/aide'))}
            />
        </div>
      </div>
    );
  }
}

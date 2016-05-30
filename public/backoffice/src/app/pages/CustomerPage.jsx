import React from 'react';
import TableListeClients from '../components/TableListeClients'
import HeaderBar from '../components/HeaderBar'
import * as mainActions from '../actions'
import store from '../store/configureStore'
import RaisedButton from 'material-ui/lib/raised-button'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoadingBox from '../components/LoadingBox'
import Box from 'react-layout-components'

class CustomerPage extends React.Component {

// componentDidMount(){
//   console.log("componentDidMount === ")
//   store.dispatch( prendreListeClientViaParse() ) ;
// }
render() {
    const {clients, actions, _settingState} = this.props;
    const is_loading = _settingState.isLoading
    return (
      <div>
        <HeaderBar title="Customer List" className="header-bar" />
        { is_loading ? <LoadingBox /> : <Box></Box> }
        <div id="mes-constats-container">
          <TableListeClients clientsData = {clients} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // store.dispatch( prendreListeClientViaParse() )
  let clientsInState = state.myHuissier_bo.clients.clients
  const _settingState = state.myHuissier_bo.settings
  // if(clientsInState.length === 1 && clientsInState[0].id === 0){
  //   clientsInState.shift()
  // }
  return {
    clients: clientsInState,
    _settingState: _settingState,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(mainActions, dispatch),
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps,
)(CustomerPage)

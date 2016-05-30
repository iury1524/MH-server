import React from 'react';
import FindingsList from '../components/FindingsList'
import HeaderBar from '../components/HeaderBar'
import * as mainActions from '../actions'
import store from '../store/configureStore'
import RaisedButton from 'material-ui/lib/raised-button'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoadingBox from '../components/LoadingBox'
import Box from 'react-layout-components'


class FindingsPage extends React.Component {
  render() {
    const {findings, actions, _settingState} = this.props;
    const is_loading = _settingState.isLoading
    return (
      <div>
        <HeaderBar title="Findings List" className="header-bar" />
        { is_loading ? <LoadingBox /> : <Box></Box> }
        <div id="findings-container">
          <FindingsList findings={findings} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const findingsState = state.myHuissier_bo.constats.findings
  const _settingState = state.myHuissier_bo.settings
  return {
    findings: findingsState,
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
)(FindingsPage)

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
import IcMailOutline from 'material-ui/lib/svg-icons/communication/mail-outline'
import IcFileDownload from 'material-ui/lib/svg-icons/file/file-download'

const btnActionsStyles = {
  height: "auto",
};

export default class FindingDetailsPage extends React.Component {
  render() {
    const {findingDetails} = this.props
    if(findingDetails === null ) {
      return (<p>Any finding selected</p>)
    }
    else {
      return (
        <div>
          <HeaderBar title="Finding Details" className="header-bar" />
          <div id="details-constat-container" className="container">
            <div className="actions-to-that-detail grid-2">
              <div className="box">
                <RaisedButton
                  label="Download the finding"
                  primary={true}
                  style={btnActionsStyles}
                  icon={<IcFileDownload />} />
              </div>
              <div className="box">
                <RaisedButton
                  label="Send to mail"
                  secondary={true}
                  style={btnActionsStyles}
                  icon={<IcMailOutline />} />
              </div>
            </div>
            <h1 className="title">{findingDetails.titre}</h1>
            <div className="description-constat-container">
              <h2>Description</h2>
              <p>{findingDetails.description}</p>
            </div>
            <div className="photos-constat-container">
              <h2>Medias</h2>
              <div className="photos-constat-detail">
                {findingDetails.medias.map(media => (
                  <div key={media.id} className="grid-2 photo-detail">
                    <div className="box">
                      <img src={media.img} alt="" />
                    </div>
                    <div className="box">
                      <p>{media.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const _settingState = state.myHuissier_bo.settings
  return {
    findingDetails: _settingState.findingViewedDetails,
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
)(FindingDetailsPage)

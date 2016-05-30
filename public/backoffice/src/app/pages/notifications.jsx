import React from 'react'
import HeaderBar from '../components/HeaderBar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Paper from 'material-ui/lib/paper'
import store from '../store/configureStore'
import { push } from 'react-router-redux'
import Box from 'react-layout-components'
import * as mainActions from '../actions'

const _notificationDetailsStyle = {
  width: "90%",
  textAlign: "left",
}

class NotificationsPage extends React.Component {
  render() {
    const {notifications, actions} = this.props;
    console.log(notifications)
    return (
      <div>
        <HeaderBar className="header-bar" title="Notifications" />
        <Box id="mes-constats-container" className="liste-constat-grid" column="shortcut">
          {notifications.map(notification => (
            <Paper zDepth={1} key={notification.id} className="constat-grid-details" style={_notificationDetailsStyle}>
              <Box>
                <Box className="description-constat-container" column="shortcut" alignSelf="baseline">
                  <Box>
                    <p>
                      <strong>{notification.titre}</strong> <br />
                      {notification._updated_at} <br />
                      {notification.description}
                    </p>
                  </Box>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      </div>
    );
  }
};

function mapStateToProps(state) {
  let notificationsState = state.myHuissier_bo.settings.notifications
  return {
    notifications: notificationsState,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(mainActions, dispatch),
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(NotificationsPage)

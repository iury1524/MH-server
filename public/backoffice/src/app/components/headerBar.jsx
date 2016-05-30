import React from 'react';
import FlatButton from 'material-ui/lib/flat-button'
import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import ActionAdd from 'material-ui/lib/svg-icons/content/add'
import store from '../store/configureStore'
import { syncHistory, routeReducer, routeActions } from 'react-router-redux'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import { push } from 'react-router-redux'

import Badge from 'material-ui/lib/badge'
import NotificationsIcon from 'material-ui/lib/svg-icons/social/notifications'
import Divider from 'material-ui/lib/divider'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mainActions from '../actions'

const _badgeStyle = {
  top: 24,
  right: 12,
}
const _logoStyle = {
  margin: 12,
}
const _logoImgStyle = {
  width: "100%",
}


class HeaderBar extends React.Component {

  constructor(props) {
      super(props);
      this.state = {open: false};
    }

  handleToggle = () => {
     this.setState({open: !this.state.open});
  }
  showNotifications = () => {
    alert("show notifications")
    // appel action pour modifier l'etats des notifications et rediriger vers la page de notifications
    // store.dispatch( viewNotification())
  }
  handleClose = () => this.setState({open: false});
  render() {
    const {notifications, actions} = this.props;
    return (
        <div>
          <AppBar
            title={<span>{this.props.title}</span>}
            iconElementRight={null}
            showMenuIconButton = {true}
            onLeftIconButtonTouchTap = {this.handleToggle}
          />
          <div>
            <LeftNav
              docked={false}
              width={200}
              open={this.state.open}
              onRequestChange={open => this.setState({open})}
            >
            <div style={_logoStyle} >
              <img style={_logoImgStyle}  src={require("../../../public/images/logo.png")} alt="My Huissier" />
            </div>
            <Divider />
              <Badge
                badgeContent={notifications.length}
                secondary={true}
                badgeStyle={_badgeStyle}
                onTouchTap= {() => store.dispatch(push('/notifications'))}
              >
                <IconButton tooltip="Notifications">
                   <NotificationsIcon/>
                </IconButton>
              </Badge>
              <Divider />
              <MenuItem onTouchTap={this.handleClose} onClick={() => store.dispatch(push('/findingsList'))} >Finding</MenuItem>
              <MenuItem onTouchTap={this.handleClose} onClick={() => store.dispatch(push('/customerList'))} >Customer</MenuItem>

              <Divider />
              <MenuItem onTouchTap={this.handleClose} onClick={() => store.dispatch(mainActions.logOut("/connexionPage"))} >Log Out</MenuItem>
            </LeftNav>
          </div>
        </div>
    );
  }
}

HeaderBar.propTypes = {
	title: React.PropTypes.string.isRequired,
}

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
)(HeaderBar)

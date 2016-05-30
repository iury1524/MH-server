import React from 'react';
import HeaderBar from '../components/HeaderBar'
import {reduxForm} from 'redux-form'
import CircularProgress from 'material-ui/lib/circular-progress'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import IcSend from 'material-ui/lib/svg-icons/content/send'
import { Link, hashHistory } from 'react-router'
import store from '../store/configureStore'
import { syncHistory, routeReducer, routeActions } from 'react-router-redux'
import {rechercherUser} from '../actions'
import { bindActionCreators } from 'redux'
import * as CompteActions from '../actions'
import LoadingBox from '../components/LoadingBox'
import Box from 'react-layout-components'
import Snackbar from 'material-ui/lib/snackbar';
import { connect } from 'react-redux'

const submitBtnStyle = {
  marginTop: 14,
}

//-------------------------------------------------//
//-------------- Begin Form validation  -----------//
//-------------------------------------------------//
const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}
//-------------------------------------------------//
//-------------- End Form validation  -------------//
//-------------------------------------------------//

const responseFacebook = (response) => {
  console.log("FacebookLogin ====");
  console.log(response);
}

class Connexion extends React.Component {
  render() {
    const {fields: { password, email }  , handleSubmit, _settingState} = this.props
    const is_loading = _settingState.isLoading
    const submit = (values, dispatch) => {
      const _user = {
         mail:values.email,
         password: values.password ,
      }
      store.dispatch( CompteActions.rechercherUser( _user, "findingsList" ))
    }
    return (
      <div>
        <HeaderBar title="Log In" className="header-bar" />
        <div id="connexion-container" className="container">
          { is_loading ? <LoadingBox /> : <Box></Box> }
          <div className="form-connexion">
            <form onSubmit={handleSubmit(submit)}>
              <div>
                <TextField
                  hintText=""
                  floatingLabelText="E-mail"
                  errorText={email.touched && email.error ? email.error : ''}
                   {...email}
                />
              </div>
              <div>
                <TextField
                  hintText=""
                  floatingLabelText="Password"
                  type="password"
                  errorText={password.touched && password.error ? password.error : ''}
                   {...password}
                />
              </div>
              <div className="submit-btn" style= {submitBtnStyle}>
                <RaisedButton
                  label="Log In"
                  icon={<IcSend />}
                  type="submit"
                  primary={true} />
              </div>
            </form>
          </div>
          <div className="util-link" >
            <Link to="/inscriptionPage">Sign Up</Link>
          </div>

        </div>

      </div>
    );
  }
}

Connexion = reduxForm ({
  form: 'Log In',
  fields: ['password', 'email'],
  validate,
})(Connexion);

function mapStateToProps(state) {
  const _settingState = state.myHuissier_bo.settings
  return {
    _settingState: _settingState,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CompteActions, dispatch),
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Connexion)

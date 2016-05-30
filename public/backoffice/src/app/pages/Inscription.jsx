import React from 'react';
import HeaderBar from '../components/HeaderBar'
import {reduxForm} from 'redux-form'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import IcSend from 'material-ui/lib/svg-icons/content/send'
import { insertHuissier }   from '../actions'
import store from '../store/configureStore'
import { Link, hashHistory } from 'react-router'
import * as CompteActions from '../actions'
import { bindActionCreators } from 'redux'
import Box from 'react-layout-components'
import { connect } from 'react-redux'
import LoadingBox from '../components/LoadingBox'


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
  if (!values.prenom) {
    errors.prenom = 'Required'
  }
  if (!values.nom) {
    errors.nom = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  if (!values.confirmpassword) {
    errors.confirmpassword = 'Required'
  } else if (values.confirmpassword !== values.password) {
    errors.confirmpassword = 'Must match the previous entry'
  }
  return errors
}
//-------------------------------------------------//
//-------------- End Form validation  -------------//
//-------------------------------------------------//

const responseFacebook = (response) => {
  console.log("Facebook Inscription ====");
  console.log(response);
}

class Inscription extends React.Component {
  render() {
    const {fields: {prenom, nom, email, password, confirmpassword}, handleSubmit, _settingState} = this.props
    const is_loading = _settingState.isLoading
    const submit = (values, dispatch) => {
      var _user = {
         nom: values.nom ,
         prenom:values.prenom,
         email:values.email,
         password: values.password ,
         id_fb:""
      };
      store.dispatch( CompteActions.insertHuissier( _user , store ) )
    }
    return (
      <div>
        <HeaderBar title="Sign Up" className="header-bar" />
        <div id="inscription-container" className="container">
          { is_loading ? <LoadingBox /> : <Box></Box> }
          <form onSubmit={handleSubmit(submit)}>
            <div>
              <TextField
                hintText=""
                floatingLabelText="E-mail"
                value= ""
                errorText={email.touched && email.error ? email.error : ''}
                 {...email}
              />
            </div>
            <div>
              <TextField
                hintText=""
                floatingLabelText="Firstname"
                errorText={prenom.touched && prenom.error ? prenom.error : ''}
                value= ""
                 {...prenom}
              />
            </div>
            <div>
              <TextField
                hintText=""
                floatingLabelText="Lastname"
                value= ""
                errorText={nom.touched && nom.error ? nom.error : ''}
                 {...nom}
              />
            </div>
            <div>
              <TextField
                type="password"
                hintText=""
                floatingLabelText="Password"
                value= ""
                errorText={password.touched && password.error ? password.error : ''}
                 {...password}
              />
            </div>
            <div>
              <TextField
                type="password"
                hintText=""
                floatingLabelText="Confirm password"
                value= ""
                errorText={confirmpassword.touched && confirmpassword.error ? confirmpassword.error : ''}
                 {...confirmpassword}
              />
            </div>
            <div className="submit-btn" style= {submitBtnStyle}>
              <RaisedButton
                label="Register"
                icon={<IcSend />}
                type="submit"
                primary={true} />
            </div>
          </form>
        </div>
      </div>
    );
  }

};

Inscription = reduxForm ({
  form: 'Sign Up',
  fields: ['prenom', 'nom', 'email', 'password', 'confirmpassword'],
  validate,
})(Inscription);

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
)(Inscription)

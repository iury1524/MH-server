import { UPDATE_LOCATION } from 'react-router-redux'

import fetch from 'isomorphic-fetch'
import thunk from 'redux-thunk'
import { syncHistory, routeReducer, routeActions } from 'react-router-redux'

import store from '../store/configureStore'
import { push } from 'react-router-redux'
import { _PARSE_APP_KEY, _PARSE_SERVER_URL } from '../constants/config'
import { ADD_FINDING_TO_STATE, UPDATE_CUSTOMERS_STATE, VIEW_FINDING_DETAILS_STATE, UPDATE_FINDINGS_STATE, UPDATE_FINDING_NOTIFICATION_STATE, SET_LOADING_STATE, REQUEST_POSTS, RECEIVE_POSTS, RECEIVE_PARSE, REQUETTE_USER_VIA_PARSE, RECEPTION_USER_VIA_PARSE, REQUETTE_CONSTAT_VIA_PARSE, RECEPTION_CONSTAT_VIA_PARSE } from '../constants/ActionsType'

var Parse = require('parse')
var ParseReact = require('parse-react')


export function startLoading() {
  console.log("startLoading ===")
    return {
      type: SET_LOADING_STATE,
      _loading: true,
    }
}

export function stopLoading() {
console.log("stopLoading ===")
    return {
      type: SET_LOADING_STATE,
      _loading: false,
    }
}

export function updateNotificationState( _finding ) {
    let _uptAt = new Date(_finding.get("updatedAt"))
    let _crtAt = new Date(_finding.get("createdAt"))
    let _newConstat = {
      id: _finding.id,
      titre: _finding.get("title"),
      description: _finding.get("description"),
      status: _finding.get("statut"),
      _updated_at: _uptAt.getDate() + "/" + (_uptAt.getMonth()) + "/" + _uptAt.getFullYear(),
      _created_at: _crtAt.getDate() + "/" + (_crtAt.getMonth()) + "/" + _crtAt.getFullYear(),
      medias: _finding.get("medias"),
    }
    return {
      type: UPDATE_FINDING_NOTIFICATION_STATE,
      _finding: _newConstat,
    }
}

export function addFindingToState( _finding ) {
    return {
      type: ADD_FINDING_TO_STATE,
      _finding: _finding,
    }
}

export function viewFindingDetails( _finding ) {
    let _uptAt = new Date(_finding.get("updatedAt"))
    let _crtAt = new Date(_finding.get("createdAt"))
    let findingDetails = {
      id: _finding.id,
      titre: _finding.get("title"),
      description: _finding.get("description"),
      status: _finding.get("statut"),
      _updated_at: _uptAt.getDate() + "/" + (_uptAt.getMonth()) + "/" + _uptAt.getFullYear(),
      _created_at: _crtAt.getDate() + "/" + (_crtAt.getMonth()) + "/" + _crtAt.getFullYear(),
      medias: _finding.get("medias"),
    }
    return {
      type: VIEW_FINDING_DETAILS_STATE,
      _finding: findingDetails,
    }
}

export function viewFindingDetailsAsync(_finding) {
  return dispatch => {
    dispatch(startLoading())
    dispatch(viewFindingDetails(_finding))
    dispatch(stopLoading())
    store.dispatch(push('/findingDetails'))
  }
}

export function updateFindingsState( _findings ) {
    return {
      type: UPDATE_FINDINGS_STATE,
      _findings: _findings,
    }
}

export function updateCustomersState( _customers ) {
    return {
      type: UPDATE_CUSTOMERS_STATE,
      _customers: _customers,
    }
}

export function rechercherUser(utilisateurclient, _nextPush) {
  return dispatch => {
    Parse.initialize(_PARSE_APP_KEY);
    Parse.serverURL = _PARSE_SERVER_URL;
    dispatch(startLoading())
    Parse.User.logIn( utilisateurclient.mail, utilisateurclient.password , {
      success: function(user) {
        store.dispatch(push(_nextPush))
      },
      error: function(user, error) {
         console.log( "Erreur "+ error.message )
         dispatch(stopLoading())
      }
    }).then(() => {
      console.log("end of rechercherUser")
      dispatch(stopLoading())
    })
  }
}


export function synchronizeData() {
    return dispatch => {
      Parse.initialize(_PARSE_APP_KEY);
      Parse.serverURL = _PARSE_SERVER_URL;
      dispatch(startLoading())
      // user informations
      const Finding = Parse.Object.extend("constat");
      let _findingsQuery = new Parse.Query(Finding);
      _findingsQuery.descending("_updated_at");
      _findingsQuery.find({
        success: function(_findingsResult) {
          return dispatch(updateFindingsState( _findingsResult ))
        },
        error: function(error) {
          console.log("Error: " + error.code + " " + error.message)
        }
      }).then(() => {
        let customerQuery = new Parse.Query(Parse.User);
        customerQuery.equalTo("type", "1");  // find all client type
        customerQuery.find({
          success: function(_customers) {
            return dispatch(updateCustomersState( _customers ))
          },
          error: function(error) {
            console.log("Error: " + error.code + " " + error.message)
          }
        })
      })
      dispatch(stopLoading())
    }
}

export function checkUserConnection( _nextPush ) {
  return dispatch => {
    Parse.initialize(_PARSE_APP_KEY);
    Parse.serverURL = _PARSE_SERVER_URL;
    //var client = Parse.Object.extend("client");
    dispatch(startLoading())
    Parse.User.current().fetch().then ( currentUser => {
      if( currentUser !== null ) {
        dispatch(stopLoading())
        store.dispatch(synchronizeData()).then( () => {
          store.dispatch(push( _nextPush ))
        })
      }
      dispatch(stopLoading())
    })
  }
}

export function logOut( _nextPush ) {
  return dispatch => {
    Parse.initialize(_PARSE_APP_KEY);
    Parse.serverURL = _PARSE_SERVER_URL;
    dispatch(startLoading())
    Parse.User.current().fetch().then( currentUser => {
      if( currentUser !== null ) {
        console.log("currentUser not null")
        Parse.User.logout()
        dispatch(stopLoading())
        store.dispatch(push( _nextPush ))
      }
      dispatch(stopLoading())
    })
  }
}

function update(state, action) {
  switch(action.type) {
  case UPDATE_LOCATION:
    alert(action.playload.pathname);
  }
}

export function prendreConstat() {
  return (dispatch, getState) => {
      return dispatch(fetchPosts())
  }
}

function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts())
    return fetch('http://rest-service.guides.spring.io/greeting')
      .then( response => response.json() )
      .then( json => dispatch( receivePosts(json) ) )
  }
}

function requestPosts() {
  return {
    type: REQUEST_POSTS,
    message : "envoye"
  }
}

function receivePosts(json) {

  return {
    type: RECEIVE_POSTS,
    message: "recu",
    posts: json,
    receivedAt: Date.now()
  }
}

export function prendreListeClientViaParse() {
 var liste = [] ;
 Parse.initialize(_PARSE_APP_KEY);
 Parse.serverURL = _PARSE_SERVER_URL;
 // var clientObjet = Parse.Object.extend("client");
 var clientObjet = Parse.Object.extend(Parse.User);

 var query = new Parse.Query(clientObjet);

  return dispatch => {
    query.find({
    success: function(results) {
       liste = results ;
       dispatch(receiveUserParse( liste ) );
      },
        error: function( error ) {
          // console.log( "Error: " + error.code + " " + error.message );
         var liste = [] ;
         dispatch(receiveUserParse( liste ));
        }
    });
 };

 return {
   type: REQUETTE_USER_VIA_PARSE ,
   message: "recu" ,
   listes :   liste   ,
   receivedAt: Date.now()
 }
}

function receiveUserParse(json) {
  return {
    type: RECEPTION_USER_VIA_PARSE ,
    message: "recu",
    listes : json ,
    receivedAt: Date.now(),
    liste : true
  }
}


export function prendreListeConstatViaParse() {

 var liste = [] ;
 Parse.initialize(_PARSE_APP_KEY);
 Parse.serverURL = _PARSE_SERVER_URL;
 // var clientObjet = Parse.Object.extend("client");
 var clientObjet = Parse.Object.extend("constat");

 var query = new Parse.Query(clientObjet);

  return dispatch => {
    query.find({
    success: function(results) {
       liste = results ;
       dispatch(receiveConstatParse( liste ) );
      },
        error: function( error ) {
          // console.log( "Error: " + error.code + " " + error.message );
         var liste = [] ;
         dispatch(receiveConstatParse( liste ));
        }
    });
 };

 return {
   type: REQUETTE_CONSTAT_VIA_PARSE ,
   message: "recu" ,
   listes :   liste   ,
   receivedAt: Date.now()
 }

}


function receiveConstatParse(json) {

  return {
    type: RECEPTION_CONSTAT_VIA_PARSE ,
    message: "recu",
    listes : json ,
    receivedAt: Date.now(),
    liste : true
  }

}


export function insertHuissier(client,storeArg) {
  return dispatch => {
    Parse.initialize(_PARSE_APP_KEY);
    Parse.serverURL = _PARSE_SERVER_URL;
    let user = new Parse.User();
    user.set("username",  client.email);
    user.set("password", client.password);
    user.set("email", client.email);
    user.set("nom", client.nom);
    user.set("prenom", client.prenom);
    user.set("type", "1");

    dispatch(startLoading())

    user.signUp(null, {
      success: function(user) {
        console.log("Sign up success")
        store.dispatch(push('/listeUser'))
      },
      error: function(user, error) {
        console.log("Erreur: " + error.message)
        dispatch(stopLoading())
      }
    }).then(() => {
      console.log("end of sign up")
      dispatch(stopLoading())
    })
  }
}


export function action_CONNECTION_ECHOUEE()
{
  return {
    type: CONNECTION_ECHOUEE ,
    infos : "" ,
    dateEnvoie: Date.now()
  }

}


export function addCustom(custom){
  return {
    type: 'addCustom',
    custom
  }
}

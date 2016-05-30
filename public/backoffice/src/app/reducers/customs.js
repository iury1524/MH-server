import { UPDATE_LOCATION } from 'react-router-redux'

import {  REQUEST_POSTS , RECEIVE_POSTS , REQUETTE_USER_VIA_PARSE , RECEPTION_USER_VIA_PARSE ,  REQUETTE_CONSTAT_VIA_PARSE , RECEPTION_CONSTAT_VIA_PARSE} from '../actions'

const initialState = {
  isFetching: true
};

export default function rootReducer(state = initialState , action) {
  switch (action.type) {
    case REQUEST_POSTS:

      return [
              {
                isFetching: true,
                didInvalidate: false,
                items:[]
              },
              ...state
            ]
    case REQUETTE_USER_VIA_PARSE:

        console.log(" arrive dans reducer REQUETTE_USER_VIA_PARSE ");

      return [
              {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
              },
              ...state
            ]

  case RECEPTION_USER_VIA_PARSE:

        console.log(" arrive dans reducer RECEPTION_USER_VIA_PARSE ");

              return [
                      {
                        isFetching: false,
                        didInvalidate: false,
                        liste_users : action.listes,
                        lastUpdated: action.receivedAt,
                        liste_user : true
                      },
                      ...state
                    ]
  case RECEPTION_CONSTAT_VIA_PARSE:

        console.log(" arrive dans reducer RECEPTION_USER_VIA_PARSE ");

              return [
                      {
                        isFetching: false,
                        didInvalidate: false,
                        liste_constats : action.listes,
                        lastUpdated: action.receivedAt,
                        liste_constat : true
                      },
                      ...state
                    ]

    default:
      return state

  }
}

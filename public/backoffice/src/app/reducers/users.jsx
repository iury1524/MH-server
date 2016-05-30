import { UPDATE_LOCATION } from 'react-router-redux'

import {  REQUEST_POSTS , RECEIVE_POSTS , REQUETTE_USER_VIA_PARSE , RECEPTION_USER_VIA_PARSE ,  REQUETTE_CONSTAT_VIA_PARSE , RECEPTION_CONSTAT_VIA_PARSE} from '../actions'

const initialState = {
  isFetching: true,
  didInvalidate: true,
  users: [],
  lastUpdated: Date.now()
}

export default function settings(state = initialState , action) {
  switch (action.type) {
    case REQUETTE_USER_VIA_PARSE:
      return [
              {
                isFetching: false,
                didInvalidate: false,
                users: action.posts,
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
                          users : action.listes,
                          lastUpdated: action.receivedAt,
                          liste_user : true
                        },
                        ...state
                      ]
      default:
        return state

  }
}

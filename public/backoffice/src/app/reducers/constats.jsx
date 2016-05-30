import { UPDATE_LOCATION } from 'react-router-redux'

import { ADD_FINDING_TO_STATE, UPDATE_FINDINGS_STATE, REQUEST_POSTS , RECEIVE_POSTS , REQUETTE_USER_VIA_PARSE , RECEPTION_USER_VIA_PARSE ,  REQUETTE_CONSTAT_VIA_PARSE , RECEPTION_CONSTAT_VIA_PARSE} from '../constants/ActionsType'

const initialState = {
  isFetching: true,
  didInvalidate: true,
  findings : [],
  lastUpdated: Date.now(),
  liste_constat : false,
}

export default function settings(state = initialState , action) {
  switch (action.type) {
  case RECEPTION_CONSTAT_VIA_PARSE:
    console.log(" arrive dans reducer RECEPTION_USER_VIA_PARSE ");
    return [
            {
              isFetching: false,
              didInvalidate: false,
              constats : action.listes,
              lastUpdated: action.receivedAt,
              liste_constat : true
            },
            ...state
          ]
  case UPDATE_FINDINGS_STATE:
      return {
        ...state,
        findings: action._findings,
      }
  case ADD_FINDING_TO_STATE:
    return {
      ...state,
      findings: [
        action._finding,
        ...state.findings,
      ],
    }
    default:
      return state

  }
}

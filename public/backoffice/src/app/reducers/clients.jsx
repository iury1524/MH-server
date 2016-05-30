import { UPDATE_LOCATION } from 'react-router-redux'
import { getClientsCurrentHuissier } from '../utils/data'
import {UPDATE_CUSTOMERS_STATE, REQUETTE_USER_VIA_PARSE, RECEPTION_USER_VIA_PARSE} from '../constants/ActionsType'

const initialState = {
  isFetching: true,
  didInvalidate: true,
  clients: [],
  lastUpdated: Date.now()
}

export default function settings(state = initialState , action) {
  switch (action.type) {
    case REQUETTE_USER_VIA_PARSE:
      return [
              {
                isFetching: false,
                didInvalidate: false,
                clients: action.posts,
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
                  clients : action.listes,
                  lastUpdated: action.receivedAt,
                  liste_user : true
                },
                ...state
              ]
    case UPDATE_CUSTOMERS_STATE:
      return {
        ...state,
        clients: action._customers,
      }
    default:
      return state
  }
}

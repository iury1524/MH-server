import { UPDATE_LOCATION } from 'react-router-redux'

import { VIEW_FINDING_DETAILS_STATE, SET_LOADING_STATE, REQUEST_POSTS, UPDATE_FINDING_NOTIFICATION_STATE } from '../constants/ActionsType'

const initialState = {
  isFetching: true,
  didInvalidate: true,
  isLoading: false,
  notifications: [],
  findingViewedDetails: {},
}

export default function settings(state = initialState , action) {
  switch (action.type) {
    case SET_LOADING_STATE:
      return {
        ...state,
        isLoading : action._loading,
      }
    case REQUEST_POSTS:
      return [
              {
                isFetching: true,
                didInvalidate: false,
              },
              ...state
            ]
    case UPDATE_FINDING_NOTIFICATION_STATE:
      return {
        ...state,
        notifications: [
          action._finding,
          ...state.notifications,
        ],
      }
    case VIEW_FINDING_DETAILS_STATE:
      return {
        ...state,
        findingViewedDetails: action._finding,
      }
    default:
      return state

  }
}

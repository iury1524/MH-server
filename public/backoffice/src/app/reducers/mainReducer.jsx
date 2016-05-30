import { combineReducers } from 'redux'
import settings from './settings'
import users from './users'
import constats from './constats'
import clients from './clients'

const mainReducer = combineReducers({
  settings,
  users,
  constats,
  clients,
})

export default mainReducer

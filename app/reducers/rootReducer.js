import { combineReducers } from 'redux'
import todos from './todos'
import groups from './groups'
import counter from './counter'
import visibilityFilter from './visibility'

let rootReducer = combineReducers({
  counter,
  visibilityFilter,
  todos,
  groups
})

export default rootReducer

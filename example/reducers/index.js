import { combineReducers } from 'redux'

function catsReducer(state = null, action) {
	if (action.type == 'FETCH_CATS_SUCCESS')
		return action.response
  return state
}

export default combineReducers({
  cats: catsReducer,
})
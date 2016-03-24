import { ADD_TODO, COMPLETE_TODO } from '../actions/actions'

function todo(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        text: action.text,
        completed: false
      }
    case COMPLETE_TODO:
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        completed:!state.completed
      }
    default:
      return state
  }
}

function todos(state = [], action) {

  switch (action.type) {
    case ADD_TODO:
      if(!action.text) {
        return state;
      }
      return [
        ...state,
        todo({
          id:state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
        }, action)
      ]
    case COMPLETE_TODO:
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

export default todos

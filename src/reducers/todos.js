const todo = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        name: action.name,
        quantity: action.quantity,
        typeTodo: action.typeTodo,
        tags: action.tags,
        completed: action.completed
      }
    case 'EDIT_TODO':
      if (state._id !== action._id) {
        return state
      }
      return Object.assign({}, state, {
        ...action
      })

    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_TODO': 
      return action.payload
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'EDIT_TODO':
      return state.map(t =>
        todo(t, action)
      )
    case 'DELETE_TODO':
      return state.filter(item => action._id !== item._id)
    default:
      return state
  }
}

export default todos
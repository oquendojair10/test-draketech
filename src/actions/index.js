import axios from "axios"

const api = 'https://crudcrud.com/api/3dd04ee65f744f39b1eb42a6c845c75f'

export const loadTodos = async () => {
  let payload = []
  try {
    const response = await axios.get(`${api}/todos`)
    payload = response.data
  } catch (error) {
   console.log(error) 
  }
  return {
    type: 'LOAD_TODO',
    payload
  }
} 

export const addTodo = async (payload) => {
  try {
    const response = await axios.post(`${api}/todos`, payload)
    return {
      type: 'ADD_TODO',
      ...response
    }
  } catch (error) {
    console.log(error)
  }
}

export const editTodo = async (id, payload) => {
  try {
    const response = await axios.put(`${api}/todos/${id}`, payload)
    return {
      type: 'EDIT_TODO',
      ...response
    }
  } catch (error) {
    console.log(error)
  }
}

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${api}/todos/${id}`)
    return {
      type: 'DELETE_TODO',
      id
    }
  } catch (error) {
    console.log(error)
  }
}
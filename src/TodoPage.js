import React from 'react'
import AddTodo from './Containers/AddTodo'
import TodoList from './components/TodoList'

const ToDo = () => (
  <div className="container">
    <div className="row">
      <div className="col-8 mx-auto p-4">
        <AddTodo />
        <TodoList />
      </div>
    </div>
  </div>
)

export default ToDo
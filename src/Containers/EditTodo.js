import React, { useState } from 'react'
import { connect } from 'react-redux'
import { editTodo, loadTodos } from '../actions'

import { Input, Checkbox, Select } from 'antd';

const { Option } = Select;

let EditTodo = ({ todo, clearSelected, dispatch }) => {
  const [completed, setCompleted] = useState(todo.completed)
  const [typeSelect, setTypeSelect] = useState(todo.typeTodo)
  const [tagsSelect, setTagsSelect] = useState(todo.tags)
  const handleSubmit = async e => {
    e.preventDefault()
    let data = {
      name: e.target.name.value,
      quantity: e.target.quantity.value,
      typeTodo: typeSelect,
      tags: tagsSelect,
      completed
    }
    dispatch(await editTodo(todo._id, data))
    dispatch(await loadTodos())
    e.target.reset()
    setTypeSelect()
    setTagsSelect([])
    clearSelected()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input 
          name="name" 
          placeholder="Nombre"
          className="mt-2"
          defaultValue={todo?.name}
          required
        />
        <Input 
          name="quantity" 
          className="mt-2"
          placeholder="Cantidad"
          defaultValue={todo?.quantity}
          required
        />
        <Select 
          placeholder="Seleccionar tipo"
          className="mt-2"
          defaultValue={typeSelect}
          onChange={e => setTypeSelect(e)}
          style={{ width: '100%' }}
        >
          <Option value="primary">
            Principal
          </Option>
          <Option value="secondary">
            Secundario
          </Option>
          <Option value="other">
            Otro
          </Option>
        </Select>
        <Select
          mode="tags"
          placeholder="Seleccionar etiquetas"
          className="mt-2"
          defaultValue={[...tagsSelect]}
          onChange={e => setTagsSelect([...e])}
          style={{ width: '100%' }}
        >
          <Option value="nice">
            NICE
          </Option>
          <Option value="developer">
            DEVELOPER
          </Option>
          <Option value="loser">
            LOSER
          </Option>
          <Option value="volcano">
            VOLCANO
          </Option>
        </Select>
        {/* <Checkbox 
          onChange={e => setCompleted(e.target.value)}
          value={completed}
        >
            Completado
          </Checkbox> */}
        <div className="d-flex">
          <button 
            style={{ 
              background: 'none',
              color: '#1890ff',
              border: '1px solid #1890ff',
            }} 
            onClick={clearSelected}
            className="p-2 ml-auto mx-2 d-block mt-2"
            type="button"
          >
            Cancelar
          </button>
          <button 
            style={{ 
              background: '#1890ff',
              color: 'white',
              border: 'none'
            }} 
            className="p-2 d-block mt-2"
            type="submit"
          >
            Actualizar tarea
          </button>
        </div>
      </form>
    </div>
  )
}

EditTodo = connect()(EditTodo)

export default EditTodo
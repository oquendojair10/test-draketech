import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import { addTodo, loadTodos } from '../actions'

import { Input, Checkbox, Select } from 'antd';

const { Option } = Select;

let AddTodo = ({ dispatch }) => {
  const [typeSelect, setTypeSelect] = useState()
  const [completed, setCompleted] = useState(false)
  const [tagsSelect, setTagsSelect] = useState([])
  let nameRef = useRef()
  let quantityRef = useRef()
  const handleSubmit = async e => {
    e.preventDefault()
    let data = {
      name: e.target.name.value,
      quantity: e.target.quantity.value,
      typeTodo: typeSelect,
      tags: tagsSelect,
      completed
    }
    dispatch(await addTodo(data))
    dispatch(await loadTodos())
    e.target.reset()
    nameRef.current.state.value = null
    quantityRef.current.state.value = null
    setTypeSelect()
    setTagsSelect([])
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input 
          name="name" 
          placeholder="Nombre"
          className="mt-2"
          ref={nameRef}
          required
        />
        <Input 
          name="quantity" 
          className="mt-2"
          placeholder="Cantidad"
          ref={quantityRef}
          required
        />
        <Select 
          placeholder="Seleccionar tipo"
          className="mt-2"
          onChange={e => setTypeSelect(e)}
          value={typeSelect || null}
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
          value={tagsSelect || []}
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
        {/* <Checkbox onChange={e => setCompleted(e)}>Completado</Checkbox> */}
        <button 
          style={{ 
            background: '#1890ff',
            color: 'white',
            border: 'none'
          }} 
          className="p-2 ml-auto d-block mt-2"
          type="submit"
        >
          Añadir tarea
        </button>
      </form>
    </div>
  )
}

AddTodo = connect()(AddTodo)

export default AddTodo
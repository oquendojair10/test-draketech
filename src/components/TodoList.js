import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
// import Todo from './Todo'
import { Table, Tag, Space } from 'antd';
import EditTodo from '../Containers/EditTodo';
import { deleteTodo, loadTodos } from '../actions';

// let TodoList = ({ todos, onTodoClick }) => (
//   <ul>
//     {todos.map(todo =>
//       <Todo
//         key={todo.id}
//         {...todo}
//         onClick={() => onTodoClick(todo.id)}
//       />
//     )}
//   </ul>
// )
let TodoList = ({ todos, loadTodo, deleteTodo }) => {
  const [selectedIndexTodo, setSelectedIndexTodo] = useState(null)
  useEffect(() => {
    loadTodo()
  }, [])
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: id => <span>{id}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <span>{text}</span>,
    },{
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
      render: quantity => <span>{quantity}</span>,
    },
    {
      title: 'Tipo',
      dataIndex: 'typeTodo',
      key: 'typeTodo',
      render: type => <span>{type?.toUpperCase()}</span>,
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags?.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag?.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <span onClick={() => setSelectedIndexTodo(record._id)}>
            <svg height="20" width="20" style={{ color: '#9fa0a1' }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </span>
          <span onClick={async () => {
            await deleteTodo(record._id)
            await loadTodo()
          }}>
            <svg height="20" width="20" style={{ color: '#9fa0a1' }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </span>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table className="mt-4" columns={columns} dataSource={todos} />
      {selectedIndexTodo != null ? <EditTodo clearSelected={() => setSelectedIndexTodo()} todo={todos.find(item => item._id === selectedIndexTodo)} /> : null}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodo: async (id) => dispatch(await deleteTodo(id)),
    loadTodo: async () => dispatch(await loadTodos()),
  }
}


TodoList = connect(state => state, mapDispatchToProps)(TodoList)

export default TodoList
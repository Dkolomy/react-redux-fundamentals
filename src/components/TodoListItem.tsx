import React from 'react'

import {AVAILABLE_COLORS, capitalize} from '../features/filters/filtersSlice'
import { todoColorSelected, todoDeleted, todoToggled, type Todo } from '../features/todo/todoSlice'
import { useAppDispatch } from '../app/hooks'

type TodoListItemProps = {
  todo: Todo
}
const TodoListItem = ({todo}: TodoListItemProps) => {
  const dispatch = useAppDispatch()
  const { text, completed, color } = todo

  const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(todoToggled(todo.id))
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(todoColorSelected({ id: todo.id, color: e.target.value }))
  }

  const handleDelete = () => {
    dispatch(todoDeleted(todo.id))
  }

  const colorOptions = AVAILABLE_COLORS.map((color) => (
    <option key={color} value={color}>
      {capitalize(color)}
    </option>
  ))

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle" 
            type="checkbox" 
            checked={completed} 
            onChange={handleCompletedChange} 
          />
          <label className="todo-text">{text}</label>
        </div>
        <div className="segment buttons">
          <select 
            className="colorPicker" 
            value={color}
            style={{ color }}
            onChange={handleColorChange}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={handleDelete}>
            <svg
              width={20}
              height={20}
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="times"
              className="svg-inline--fa fa-times fa-w-11"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 352 512"
            >
              <path
                fill="currentColor"
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              ></path>
            </svg>      
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
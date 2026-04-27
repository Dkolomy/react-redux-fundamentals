import React from 'react'

import {AVAILABLE_COLORS, capitalize} from '../features/filters/filtersSlice'
import type { Todo } from '../features/todo/todoSlice'

type TodoListItemProps = {
  todo: Todo
  onColorChange: (color: string) => void
  onCompletedChange: (completed: boolean) => void
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const TodoListItem = ({todo, onColorChange, onCompletedChange, onDelete}: TodoListItemProps) => {
  const { text, completed, color } = todo

  const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCompletedChange(e.target.checked)
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onColorChange(e.target.value)
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
          <button className="destroy" onClick={onDelete}>
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
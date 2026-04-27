import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { selectColors, selectStatus, STATUS_FILTERS } from "../filters/filtersSlice"

export type Todo = {
  id: number
  text: string
  completed: boolean
  color?: string
}

type AppState = {
  todos: Todo[]
}

const initialState: AppState = {
  todos: [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
  ],
}

const nextTodoId = (todos: Todo[]): number => {
  const maxId = todos.reduce((maxId: number, todo: Todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

// Use the initialState as a default value
export const todoSlice = createAppSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: (state, action: PayloadAction<string>) => {
      state.todos.push({ id: nextTodoId(state.todos), text: action.payload, completed: false })
    },
    todoToggled: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    todoColorSelected: (state, action: PayloadAction<{ id: number, color: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id)
      if (todo) {
        todo.color = action.payload.color
      }
    },
    todoDeleted: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
    todosAllCompleted: (state) => {
      state.todos.forEach(todo => {
        todo.completed = true
      })
    },
    todosCleared: (state) => {
      state.todos = state.todos.filter(todo => !todo.completed)
    }
  }
})

export const { 
  todoAdded, 
  todoToggled, 
  todoColorSelected, 
  todoDeleted, 
  todosAllCompleted, 
  todosCleared 
} = todoSlice.actions
export default todoSlice.reducer

export const selectCompletedTodos = (state: { todos: AppState }) => {
  return state.todos.todos.filter(todo => todo.completed);
}

export const selectNotCompletedTodos = (state: { todos: AppState }) => {
  return state.todos.todos.filter(todo => !todo.completed);
}

export const selectTodos = (state: { todos: AppState }) => state.todos.todos

const matchesColorFilter = (todo: Todo, selectedColors: string[]) =>
  !todo.color || selectedColors.includes(todo.color)

export const selectFilteredTodos = (state: {
  todos: AppState
  filters: { filters: { status: string; colors: string[] } }
}) => {
  const todos = selectTodos(state)
  const status = selectStatus(state)
  const colors = selectColors(state)
  switch (status) {
    case STATUS_FILTERS.All:
      return todos.filter((todo) => matchesColorFilter(todo, colors))
    case STATUS_FILTERS.Completed:
      return todos.filter(
        (todo) => todo.completed && matchesColorFilter(todo, colors),
      )
    case STATUS_FILTERS.Active:
      return todos.filter(
        (todo) => !todo.completed && matchesColorFilter(todo, colors),
      )
    default:
      return todos.filter((todo) => matchesColorFilter(todo, colors))
  }
}
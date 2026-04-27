import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

type Todo = {
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
    }
  }
})

  export const { todoAdded, todoToggled } = todoSlice.actions
  export default todoSlice.reducer
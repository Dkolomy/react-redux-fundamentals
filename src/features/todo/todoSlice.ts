import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppDispatch, RootState } from "../../app/store"
import { selectColors, selectStatus, STATUS_FILTERS } from "../filters/filtersSlice"
import { client } from "../../api/client"

export type Todo = {
  id: number
  text: string
  completed: boolean
  color?: string
}

type TodosState = {
  todos: Todo[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: TodosState = {
  todos: [],
  status: "idle",
  error: null,
}





// const initialState: AppState = {
//   todos: [
//     { id: 0, text: 'Learn React', completed: true },
//     { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
//     { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
//   ],
// }

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
    },
    todosLoaded: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload
      state.status = "succeeded"
      state.error = null
    },
    todosLoading: (state) => {
      state.status = "loading"
      state.error = null
    },
    todosFailed: (state, action: PayloadAction<string>) => {
      state.status = "failed"
      state.error = action.payload
    },
  }
})

export const { 
  todoAdded, 
  todoToggled, 
  todoColorSelected, 
  todoDeleted, 
  todosAllCompleted, 
  todosCleared,
  todosLoaded,
  todosLoading,
  todosFailed,
} = todoSlice.actions
export default todoSlice.reducer

export async function fetchTodos(dispatch: AppDispatch, getState: () => RootState) {
  void getState
  dispatch(todosLoading())
  try {
    const response = await client.get("/fakeApi/todos")
    dispatch(todosLoaded(response.todos))
  } catch (error) {
    const message =
      typeof error === "string"
        ? error
        : error instanceof Error
          ? error.message
          : "Failed to fetch todos"
    dispatch(todosFailed(message))
  }
}

export const selectCompletedTodos = (state: { todos: TodosState }) => {
  return state.todos.todos.filter(todo => todo.completed);
}

export const selectNotCompletedTodos = (state: { todos: TodosState }) => {
  return state.todos.todos.filter(todo => !todo.completed);
}

export const selectTodos = (state: { todos: TodosState }) => state.todos.todos
export const selectTodosStatus = (state: { todos: TodosState }) => state.todos.status
export const selectTodosError = (state: { todos: TodosState }) => state.todos.error

const matchesColorFilter = (todo: Todo, selectedColors: string[]) =>
  !todo.color || selectedColors.includes(todo.color)

export const selectFilteredTodos = (state: {
  todos: TodosState
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
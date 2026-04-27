type Todo = {
  id: number
  text: string
  completed: boolean
  color?: string
}

type Filters = {
  status: string
  colors: string[]
}

type AppState = {
  todos: Todo[]
  filters: Filters
}

type TodoAddedAction = {
  type: 'todos/todoAdded'
  payload: string
}

type AppAction = TodoAddedAction | { type: string; [key: string]: any }

const initialState: AppState = {
  todos: [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
  ],
  filters: {
    status: 'All',
    colors: []
  }
}

const nextTodoId = (todos: Todo[]): number => {
  const maxId = todos.reduce((maxId: number, todo: Todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

// Use the initialState as a default value
export default function appReducer(state: AppState = initialState, action: AppAction): AppState {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case 'todos/todoAdded': {
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: nextTodoId(state.todos), text: action.payload, completed: false }
        ]
      }
    }
    case 'todos/todoToggled': {
      return {
        ...state,
        todos: state.todos.map(todo => todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)
      }
    }
    case 'todos/statusFilterChanged': {
      return {
        ...state,
        filters: {
          ...state.filters,
          status: action.payload
        }
      }
    }
    // Do something here based on the different types of actions
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}
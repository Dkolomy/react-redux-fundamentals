import TodoListItem from './TodoListItem'
import type { Todo } from '../features/todo/todoSlice'
import {
  selectFilteredTodos,
  selectTodosError,
  selectTodosStatus,
} from '../features/todo/todoSlice'
import { useAppSelector } from '../app/hooks'

const TodoList = () => {
  const todos: Todo[] = useAppSelector(selectFilteredTodos)
  const status = useAppSelector(selectTodosStatus)
  const error = useAppSelector(selectTodosError)

  if (status === 'loading') {
    return <div>Loading todos...</div>
  }

  if (status === 'failed') {
    return <div role="alert">Error loading todos: {error}</div>
  }

  const renderedTodos = todos.map((todo: Todo) => (
    <TodoListItem key={todo.id} todo={todo} />
  ))

  return <ul className="todo-list">{renderedTodos}</ul>
}

export default TodoList

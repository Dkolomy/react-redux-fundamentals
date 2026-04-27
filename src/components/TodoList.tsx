import TodoListItem from './TodoListItem'
import type { Todo } from '../features/todo/todoSlice'
import { selectFilteredTodos } from '../features/todo/todoSlice'
import { useAppSelector } from '../app/hooks'

const TodoList = () => {
  const todos: Todo[] = useAppSelector(selectFilteredTodos)

  const renderedTodos = todos.map((todo: Todo) => (
    <TodoListItem key={todo.id} todo={todo} />
  ))

  return <ul className="todo-list">{renderedTodos}</ul>
}

export default TodoList

import TodoListItem from './TodoListItem'
import type { Todo } from '../features/todo/todoSlice'
import { useAppSelector } from '../app/hooks'

const TodoList = () => {
  const todos: Todo[] = useAppSelector(state => state.todos.todos)

  const renderedTodos = todos.map((todo: Todo) => (
    <TodoListItem 
      key={todo.id} 
      todo={todo} 
    />
  ))

  return (
    <ul className="todo-list">
      {renderedTodos}
    </ul>
  )
}

export default TodoList
import TodoListItem from './TodoListItem'
import type { Todo } from '../features/todo/todoSlice'

const TodoList = () => {
  const todos: Todo[] = []

  const renderedTodos = todos.map((todo: Todo) => (
    <TodoListItem 
      key={todo.id} 
      todo={todo} 
      onColorChange={() => {}} 
      onCompletedChange={() => {}} 
      onDelete={() => {}} />
  ))

  return (
    <ul className="todo-list">
      {renderedTodos}
    </ul>
  )
}

export default TodoList
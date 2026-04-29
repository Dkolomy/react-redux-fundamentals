import { useEffect } from "react"
import Header from "./components/Header"
import TodoList from "./components/TodoList"
import Footer from "./components/Footer"
import { useAppDispatch } from "./app/hooks"
import { fetchTodos } from "./features/todo/todoSlice"

export const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodos)
  }, [dispatch])

  return (
    <div className="App">
      <nav>
        <section>
          <h1>Todo List (React + Redux)</h1>
        </section>
      </nav>
      <main>
        <section className="medium-container">
          <h2>Todos</h2>
          <div className="todoapp">
            <Header />
            <TodoList />
            <Footer />
          </div>
        </section>
      </main>
    </div>
  )
}
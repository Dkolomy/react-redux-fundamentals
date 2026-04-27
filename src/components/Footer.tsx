import classNames from 'classnames'
import { STATUS_FILTERS, AVAILABLE_COLORS, capitalize, statusFilterChanged, colorFilterChanged, selectStatus, selectColors } from '../features/filters/filtersSlice'
import { selectFilteredTodos } from '../features/todo/todoSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'

type RemainingTodosProps = {
  count: number
}
const RemainingTodos = ({count}: RemainingTodosProps) => {
  const suffix = count === 1 ? '' : 's'

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> {suffix} left
    </div>
  )
}

type StatusFiltersProps = {
  value: string
}
const StatusFilters = ({value: status}: StatusFiltersProps) => {
  const dispatch = useAppDispatch()
  const renderedFilters = Object.keys(STATUS_FILTERS).map((key) => {
    const value = STATUS_FILTERS[key as keyof typeof STATUS_FILTERS]
    const handleClick = () => {
      dispatch(statusFilterChanged(value))
      console.log('Status change: ', value)
    }
    const className = value === status ? 'selected' : ''

    return (
      <li key={value}>
        <button className={classNames(className)} onClick={handleClick}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>
        {renderedFilters}
      </ul>
    </div>
  )
}

type ColorFiltersProps = {
  value: string[]
}
const ColorFilters = ({value: colors}: ColorFiltersProps) => {
  const dispatch = useAppDispatch()
  const renderedColors = AVAILABLE_COLORS.map((color) => {
    const checked = colors.includes(color)
    const handleClick = () => {
      const changeType = checked ? "removed" : "added"
      dispatch(colorFilterChanged({ color, changeType }))
      console.log('Color change: ', color, changeType)
    }

    return (
      <label key={color} style={{ display: 'block' }}>
        <input 
          type="checkbox"
          name={color} 
          checked={checked} 
          onChange={handleClick} 
        />
        <span 
          className="color-block" 
          style={{backgroundColor: color}}
        ></span>
        {capitalize(color)}
      </label>
    )
  })

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">
        {renderedColors}
      </form>
    </div>
  )
}

const Footer = () => {
  const colors = useAppSelector(selectColors)
  const status = useAppSelector(selectStatus)
  const filteredTodos = useAppSelector(selectFilteredTodos)
  const todosRemaining = filteredTodos.filter((todo) => !todo.completed).length

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button">Mark All Completed</button>
        <button className="button">Clear Completed</button>
      </div>

      <RemainingTodos count={todosRemaining} />
      <StatusFilters value={status} />
      <ColorFilters value={colors} />
    </footer>
  )
}

export default Footer
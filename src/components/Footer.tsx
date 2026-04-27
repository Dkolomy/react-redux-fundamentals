import classNames from 'classnames'
import { STATUS_FILTERS, AVAILABLE_COLORS, capitalize } from '../features/filters/filtersSlice'

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
  onChange: (status: string) => void
}
const StatusFilters = ({value: status, onChange}: StatusFiltersProps) => {
  const renderedFilters = Object.keys(STATUS_FILTERS).map((key) => {
    const value = STATUS_FILTERS[key as keyof typeof STATUS_FILTERS]
    const handleClick = () => {
      onChange(value)
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
  onChange: (color: string, changeType: 'added' | 'removed') => void
}
const ColorFilters = ({value: colors, onChange}: ColorFiltersProps) => {
  const renderedColors = AVAILABLE_COLORS.map((color) => {
    const checked = colors.includes(color)
    const handleClick = () => {
      const changeType = checked ? "removed" : "added"
      onChange(color, changeType)
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
  const colors: string[] = []
  const status = STATUS_FILTERS.All
  const todosRemaining = 1

  const onColorChange = (color: string, changeType: 'added' | 'removed') => console.log(color, changeType)
  const onStatusChange = (status: string) => console.log('Status change: ', status)
  
  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button">Mark All Completed</button>
        <button className="button">Clear Completed</button>
      </div>

      <RemainingTodos count={todosRemaining} />
      <StatusFilters value={status} onChange={onStatusChange}/>
      <ColorFilters value={colors} onChange={onColorChange}/>
    </footer>
  )
}

export default Footer
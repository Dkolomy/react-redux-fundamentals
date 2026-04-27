import React, { useState } from 'react'
import { todoAdded } from '../features/todo/todoSlice'
import { useAppDispatch } from '../app/hooks'

const Header = () => {
  const dispatch = useAppDispatch()
  
  const [text, setText] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(todoAdded(text))
      setText('')
    }
  }

  return (
    <header className="header">
      <input 
        className="new-todo" 
        placeholder="What needs to be done?" 
        autoFocus 
        value={text} 
        onChange={handleChange} 
        onKeyDown={handleKeyDown}
      />
    </header>
  )
}

export default Header
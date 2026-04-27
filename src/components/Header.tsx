import React, { useState } from 'react'

const Header = () => {
  const [text, setText] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  
  return (
    <header className="header">
      <input 
        className="new-todo" 
        placeholder="What needs to be done?" 
        autoFocus 
        value={text} 
        onChange={handleChange} />
    </header>
  )
}

export default Header
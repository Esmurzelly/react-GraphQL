import React from 'react'

const TodoItem = ({ id, text, completed, onToggle, onDelete }) => {
  return (
    <div>
      <input
        type='checkbox'
        checked={completed}
        onChange={() => onToggle({
          variables: {
            id,
            completed: !completed,
          }
        })}
      />
      <span>{text}</span>
      <span
        onClick={() => onDelete({
          variables: { id }
        })}
      > x</span>
    </div>
  )
}

export default TodoItem
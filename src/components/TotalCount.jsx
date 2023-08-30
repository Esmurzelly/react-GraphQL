import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_TODO } from '../apollo/todos'

const TotalCount = () => {
  const { data } = useQuery(ALL_TODO);

  return (
    <div>
      {data?.todos && (
        <b>Total todos: {data.todos.length}</b>
      )}
    </div>
  )
}

export default TotalCount
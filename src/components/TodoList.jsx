import React from 'react';

import TodoItem from './TodoItem';
import TotalCount from './TotalCount';

import { useQuery, useMutation } from '@apollo/client';
import { ALL_TODO, UPDATE_TODO, DELETE_TODO } from '../apollo/todos';

const TodoList = () => {
    const { loading, error, data } = useQuery(ALL_TODO);
    const [toggleTodo, {error: updateError}] = useMutation(UPDATE_TODO);
    const [deleteTodo, {error: deleteError}] = useMutation(DELETE_TODO, {
        refetchQueries: [
            {query: ALL_TODO}
        ]
        // update (cache, {data: {deleteTodo}}) {
        //     cache.modify({
        //         fields: {
        //             allTodos (currentTodos = []) { // use orignal nae from todos.js, not alias
        //                 return currentTodos.filter(todo => todo.__ref !== `Todo:${deleteTodo.id}`)                    } 
        //         }
        //     })
        // }
    });

    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error || updateError || deleteError) {
        return <h1>Error!!!</h1>
    }

    return (
        <>
            <div>
                {data.todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        onToggle = {toggleTodo}
                        onDelete = {deleteTodo}
                        {...todo}
                    />
                ))}
            </div>
            <TotalCount />
        </>
    )
}

export default TodoList
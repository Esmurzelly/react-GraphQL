import React, { useState } from 'react';

import { ADD_TODO, ALL_TODO } from '../apollo/todos';
import { useMutation } from '@apollo/client';

const AddTodo = () => {
    const [text, setText] = useState('');
    const [addTodo, { error }] = useMutation(ADD_TODO, {
        // refetchQueries: [
        //     {query: ADD_TODO} // update all todos
        // ],
        update(cache, { data: { newTodo } }) {
            const { todos } = cache.readQuery({ query: ALL_TODO }) // read all values from ALL_TODO

            cache.writeQuery({ // write a new value to cache
                query: ALL_TODO,
                data: {
                    todos: [newTodo, ...todos] // create new structure
                }
            })
        }
    })

    const handleAddTodo = () => {
        if (text.trim().length) {
            addTodo({
                variables: {
                    title: text,
                    completed: false,
                    userId: 123,
                },
            });
            setText('');
        }
    }

    const handleKey = (event) => {
        if (event.key === "Enter") handleAddTodo();
    }

    if (error) {
        return <h1>Error!!!</h1>
    }

    return (
        <form>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKey}
            />
            <button onClick={handleAddTodo}>Add todo</button>
        </form>
    )
}

export default AddTodo
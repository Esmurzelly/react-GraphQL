import { gql } from '@apollo/client'; // write graphql requests via this lib

export const ALL_TODO = gql`
    query AllTodos {
	todos: allTodos {
		id
        text: title
        completed
    }
}
`;

export const ADD_TODO = gql`
    mutation AddTodo ($title: String!, $userId: ID!, $completed: Boolean!) {
        newTodo: createTodo (title: $title, user_id:$userId, completed: $completed) {
            id
        title
        completed
    }  
}
`;

export const UPDATE_TODO = gql`
    mutation updateTodo ($id: ID!, $completed: Boolean) {
        updateTodo (id: $id, completed: $completed) {
            id
            title
            completed
    }
}
`;

export const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID!) {
        removeTodo (id: $id) {
        id
    }
}
`
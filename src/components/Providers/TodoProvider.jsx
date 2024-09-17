import React, { createContext, useContext, useReducer } from 'react';
import { getTodos, setTodos } from '../Utilities/localStorage';

const todoContext = createContext(null);

const initialTodos = {
    todos: getTodos()
}

const reducer = ( state, { type, payload } ) => {
    switch(type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: setTodos([payload, ...state.todos])
            }
        case 'DELETE_TODO':
            return {
                ...state,
                todos: setTodos(state.todos.filter(todo => todo.id !== payload))
            }
        case 'UPDATE_TODO':
            let idx = state.todos.findIndex(todo => todo.id === payload[0]);
            state.todos[idx] = {...state.todos[idx], id: payload[1].id, title: payload[1].title, desc: payload[1].desc, tags: payload[1].tags, alloted: payload[1].alloted };
            setTodos(state.todos);
            return state;
        default:
            return state;
    }
}

const TodoProvider = ({ children }) => {
    const [ todos, dispatch ] = useReducer(reducer, initialTodos);

    return (
        <todoContext.Provider value={{ todos, dispatch }} >
            { children }
        </todoContext.Provider>
    )
}

const useTodos = () => useContext(todoContext);

export{
    TodoProvider,
    useTodos
};
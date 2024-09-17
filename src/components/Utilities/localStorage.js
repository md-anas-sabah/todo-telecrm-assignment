const storeInLocalStorage = (data) => {
    localStorage.setItem('theme', data);
}

const getFromLocalStorage = () => {
    return localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark';
}

const setTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
    return JSON.parse(localStorage.getItem('todos'))
}

const getTodos = () => {
    return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
}

export {
    storeInLocalStorage,
    getFromLocalStorage,
    setTodos,
    getTodos
}
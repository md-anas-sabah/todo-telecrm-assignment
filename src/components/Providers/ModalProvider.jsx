import React, { createContext, useContext, useState } from 'react';

const modalContext = createContext(null);

const ModalProvider = ({ children }) => {
    const [modalOpen, setModalOpen] = useState({
        status: false,
        data: {
            todoId: '',
            todoTitle: '', 
            todoDesc: '', 
            todoTags: '', 
            todoAlloted: '', 
            todoCreatedAt: ''
        }
    });

    return (
        <modalContext.Provider value={{ modalOpen, setModalOpen }} >
            { children }
        </modalContext.Provider>
    )
}

const useModal = () => useContext(modalContext);

export{
    ModalProvider,
    useModal
};
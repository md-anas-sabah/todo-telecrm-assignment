import React, { useState, useContext, createContext } from 'react';
import { getFromLocalStorage } from '../Utilities/localStorage';

const themeContext = createContext(null);

const ThemeProvider = ({ children }) => {
    const [ theme, setTheme ] = useState(getFromLocalStorage());

    return (
        <themeContext.Provider value={{ theme, setTheme }}>
            {children}
        </themeContext.Provider>
    )
}

const useTheme = () => useContext(themeContext);

export {
    useTheme,
    ThemeProvider
}
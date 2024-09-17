import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TodoProvider } from './components/Providers/TodoProvider';
import { ModalProvider } from './components/Providers/ModalProvider';
import { ThemeProvider } from './components/Providers/ThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ModalProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </ModalProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
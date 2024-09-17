import Home from './components/Pages/Home';
import TodoPage from './components/Pages/TodoPage';
import ErrorPage from './components/Pages/ErrorPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todo/:id' element={<TodoPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;

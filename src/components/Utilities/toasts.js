import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const todoadded = (theme) =>
  toast.success('Todo added successfully!', {
    position: 'top-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
  });

const todoedited = (theme) =>
  toast.success('Todo edited successfully!', {
    position: 'top-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
  });

const todoremoved = (theme) =>
  toast.error('Todo removed successfully!', {
    position: 'top-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
  });

const timeover = (theme) =>
  toast.error('Your time for this task is over!', {
    position: 'top-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
  });

export { todoadded, todoedited, todoremoved, timeover };

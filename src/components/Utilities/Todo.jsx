import React, { useState, useEffect } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import '../Styles/Todo.css';
import { useTodos } from '../Providers/TodoProvider';
import { useModal } from '../Providers/ModalProvider';
import { useTheme } from '../Providers/ThemeProvider';
import { Link } from 'react-router-dom';
import { todoremoved } from './toasts';

const Todo = ({ todo: { id, title, desc, tags, alloted, createdAt } }) => {
  const { theme } = useTheme();
  const { dispatch } = useTodos();
  const { modalOpen, setModalOpen } = useModal();
  const [themeClass, setThemeClass] = useState('');

  const deleteTodo = (e) => {
    dispatch({
      type: 'DELETE_TODO',
      payload: id,
    });
    todoremoved(theme);
  };

  const editTodo = (e) => {
    setModalOpen({
      ...modalOpen,
      data: {
        ...modalOpen.data,
        todoId: id,
        todoTitle: title,
        todoDesc: desc,
        todoAlloted: alloted,
        todoTags: tags.join(', '),
        todoCreatedAt: createdAt,
      },
      status: true,
    });
  };

  useEffect(() => {
    setThemeClass(theme === 'dark' ? '' : 'light-theme');
  }, [theme]);

  return (
    <div
      className={`todo flex flex-col align-start justify-center ${themeClass}`}
    >
      <Link to={`/todo/${id}`} className='todo-title'>
        {title}
      </Link>
      {desc && (
        <p className='todo-desc'>
          {desc.charAt(0).toUpperCase() + desc.slice(1)}
        </p>
      )}
      <div className='todo-tags flex-row-wrap align-center justify-start'>
        <h5>TAGS: </h5>
        {tags.filter((tag) => tag !== '').length > 0 ? (
          tags.map((tag, idx) => (
            <div key={idx} className='tag'>
              <h5>
                <span className='apos'>❛</span> {tag}{' '}
                <span className='apos'>❜</span>
              </h5>
            </div>
          ))
        ) : (
          <p>None</p>
        )}
      </div>
      <div className='todo-icons flex-center'>
        <FaRegEdit className='icon icon-edit' onClick={editTodo} />
        <RiDeleteBin5Line className='icon icon-delete' onClick={deleteTodo} />
      </div>
    </div>
  );
};

export default Todo;

import React, { useState } from 'react';
import '../Styles/Modal.css';
import { useModal } from '../Providers/ModalProvider';
import { useTodos } from '../Providers/TodoProvider';
import { useTheme } from '../Providers/ThemeProvider';
import { todoadded, todoedited } from './toasts';
import { v4 as uuid } from 'uuid';

const Modal = ({
  data: { todoId, todoTitle, todoDesc, todoTags, todoAlloted, todoCreatedAt },
}) => {
  const { theme } = useTheme();
  const { modalOpen, setModalOpen } = useModal();
  const { dispatch } = useTodos();
  const [formData, setFormData] = useState({
    title: todoTitle,
    desc: todoDesc,
    tags: todoTags,
    alloted: todoAlloted,
  });

  const { title, desc, tags, alloted } = formData;

  const toggleModal = (e) => {
    setModalOpen({ ...modalOpen, status: false });
  };

  const changeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    if (!todoId) {
      dispatch({
        type: 'ADD_TODO',
        payload: {
          id: uuid(),
          title,
          desc,
          tags: tags.split(',').map((item) => item.trim()),
          alloted: +alloted,
          createdAt: Date.now(),
        },
      });
      todoadded(theme);
    } else {
      dispatch({
        type: 'UPDATE_TODO',
        payload: [
          todoId,
          {
            id: todoId,
            title: title,
            desc: desc,
            tags: tags.split(',').map((item) => item.trim()),
            alloted: +alloted,
            createdAt: todoCreatedAt,
          },
        ],
      });
      todoedited(theme);
    }
    setModalOpen({ ...modalOpen, status: false });
    e.preventDefault();
  };

  return (
    <div className='modal-container flex-center'>
      <div className='modal-border-frame'>
        <form
          className='modal-form flex-center flex-col'
          onSubmit={submitHandler}
        >
          <input
            name='title'
            value={title}
            type='text'
            placeholder='Todo title...'
            onChange={changeFormData}
            required
          />
          <textarea
            name='desc'
            value={desc}
            rows='10'
            placeholder='Todo description...'
            onChange={changeFormData}
          />
          <input
            name='tags'
            value={tags}
            type='text'
            placeholder='Todo tags separated by commas...'
            onChange={changeFormData}
          />
          <input
            name='alloted'
            value={alloted}
            type='number'
            min='0'
            placeholder='Minutes to allot for this todo...'
            onChange={changeFormData}
          />
          <div className='buttons flex-center'>
            <button className='btn btn-cancel' onClick={toggleModal}>
              Close
            </button>
            <input
              className='btn btn-add'
              type='submit'
              value={todoId ? 'Update' : 'Create'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

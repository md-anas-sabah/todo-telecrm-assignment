import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTodos } from '../Providers/TodoProvider';
import { useTheme } from '../Providers/ThemeProvider';
import '../Styles/TodoPage.css';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { VscDebugStart } from 'react-icons/vsc';
import { MdOutlineRestartAlt } from 'react-icons/md';
import { AiOutlinePause } from 'react-icons/ai';
import { timeover } from '../Utilities/toasts';

const TodoPage = () => {
  const { id } = useParams();
  const {
    todos: { todos },
  } = useTodos();
  const { theme } = useTheme();
  const [currentTodo, setCurrentTodo] = useState({});
  const [timer, setTimer] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [timerOn, setTimerOn] = useState(false);
  const [colorId, setColorId] = useState('');

  const { minutes, seconds } = timer;
  const timeout = useRef();

  useEffect(() => {
    setCurrentTodo({ ...todos.filter((todo) => todo.id === id)[0] });
  }, [id, todos]);

  useEffect(() => {
    setTimer({ minutes: +currentTodo.alloted, seconds: 0 });
  }, [currentTodo]);

  useEffect(() => {
    setColorId(theme === 'dark' ? '' : 'black-color');
  }, [theme]);

  useEffect(() => {
    document.title = `${minutes}m : ${seconds < 10 ? 0 : ''}${seconds}s || ${
      currentTodo && currentTodo.title
    }`;
    if (timerOn) {
      if (minutes === 0 && seconds === 0) {
        setTimerOn(false);
        timeover(theme);
      } else if (seconds === 0) {
        timeout.current = setTimeout(
          () => setTimer({ ...timer, seconds: 59, minutes: minutes - 1 }),
          1000
        );
        document.title = `${minutes}m : ${
          seconds < 10 ? 0 : ''
        }${seconds}s || POMODORO`;
      } else {
        timeout.current = setTimeout(
          () => setTimer({ ...timer, seconds: seconds - 1 }),
          1000
        );
        document.title = `${minutes}m : ${
          seconds < 10 ? 0 : ''
        }${seconds}s || POMODORO`;
      }
    }

    return () => {
      clearTimeout(timeout.current);
    };
  }, [timer, timerOn, minutes, seconds]);

  const resetTimer = (e) => {
    setTimerOn(false);
    setTimer({ minutes: +currentTodo.alloted, seconds: 0 });
  };

  const date = Date(currentTodo.createdAt).split(' ');
  let creationDate = date[0] + ' ' + date[2] + ' ' + date[1] + ' ' + date[3];

  return (
    <div id={colorId}>
      <Link to='/' className='btn go-back flex-center'>
        &larr; GO BACK
      </Link>
      <div className='todo-page flex-center flex-col'>
        <div className='todo-page-left flex-center'>
          <div className='buttons flex-row-wrap align-center justify-center'>
            <button
              className='btn flex-center'
              onClick={(e) => currentTodo.alloted > 0 && setTimerOn(true)}
            >
              {' '}
              <VscDebugStart className='icon' /> Start
            </button>
            <button
              className='btn flex-center'
              onClick={(e) => setTimerOn(false)}
            >
              {' '}
              <AiOutlinePause className='icon' /> Pause
            </button>
            <button className='btn flex-center' onClick={resetTimer}>
              {' '}
              <MdOutlineRestartAlt className='icon' /> Restart
            </button>
          </div>
          <div
            className='progress-bar'
            style={{
              border: `10px solid var(--${
                theme === 'dark' ? 'black' : 'white'
              }-color)`,
              borderRadius: '50%',
            }}
          >
            <CircularProgressbarWithChildren
              value={minutes * 60 + seconds}
              minValue={0}
              strokeWidth={5}
              background={true}
              maxValue={currentTodo.alloted * 60}
              styles={buildStyles({
                strokeLinecap: 'round',
                textSize: '0.75rem',
                pathTransitionDuration: 1,
                pathColor: `${
                  minutes * 60 + seconds < (currentTodo.alloted * 60) / 4
                    ? 'var(--red-color)'
                    : '#069a8e'
                }`,
                trailColor: `var(--${
                  theme === 'dark' ? 'black' : 'white'
                }-color)`,
                transition: 'var(--default-transition)',
                backgroundColor: `var(--${
                  theme === 'dark' ? 'black' : 'white'
                }-color)`,
              })}
            >
              <div
                className={`flex-center flex-col ${
                  theme === 'dark' ? 'timer' : 'timer-light'
                }`}
              >
                <h1
                  className={`${
                    minutes * 60 + seconds < (currentTodo.alloted * 60) / 4
                      ? 'blinking-text'
                      : ''
                  }`}
                  style={{
                    color: `${
                      minutes * 60 + seconds < (currentTodo.alloted * 60) / 4
                        ? 'var(--red-color)'
                        : '#069a8e'
                    }`,
                  }}
                >{currentTodo.alloted === 0 ? '∞' : `${minutes}m : ${seconds < 10 ? 0 : ''}${seconds}s`}</h1>
                <h3>{`Out of ${currentTodo.alloted === 0 ? '∞' : currentTodo.alloted} ${
                  currentTodo.alloted === 1 ? 'minute' : 'minutes'
                }`}</h3>
              </div>
            </CircularProgressbarWithChildren>
          </div>
          <div class='waves'>
            <svg
              data-name='Layer 1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 1200 120'
              preserveAspectRatio='none'
            >
              <path
                d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
                class='shape-fill'
              ></path>
            </svg>
          </div>
        </div>
        <div className='todo-page-right flex flex-col align-start justify-start '>
          <h1>{currentTodo.title}</h1>
          {currentTodo.desc && (
            <p className='description'>{currentTodo.desc}</p>
          )}
          <div className='todo-tags flex-row-wrap align-center justify-start'>
            {currentTodo.tags &&
            currentTodo.tags.filter((tag) => tag !== '').length > 0 ? (
              currentTodo.tags.map((tag, idx) => (
                <div key={idx} className='tag'>
                  <h5>
                    <span className='apos'>❛</span> {tag}{' '}
                    <span className='apos'>❜</span>
                  </h5>
                </div>
              ))
            ) : (
              <p>No tags</p>
            )}
          </div>
          <h4 className='creation'>Created At &rarr; {creationDate}</h4>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;

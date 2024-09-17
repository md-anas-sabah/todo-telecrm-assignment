import React from 'react';
import '../Styles/EmptyPage.css';
import { useTheme } from '../Providers/ThemeProvider';

const ErrorPage = () => {
  const { theme } = useTheme();

  return (
    <div className='error-page flex-center flex-col'>
      <div className='err-text flex-center flex-col'>
        <h1
          style={{
            color: theme === 'dark' ? '#fff' : '#000',
            fontSize: '10rem',
          }}
        >
          404
        </h1>
        <p
          style={{
            color: theme === 'dark' ? '#fff' : '#000',
            fontSize: '1.5rem',
          }}
        >
          This is a forbidden zone please refrain from entering...
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;

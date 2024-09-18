import { createTheme } from '@mui/material/styles';
import { useState } from 'react';

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);
  
    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
    };
  
    const theme = createTheme(({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }));
    
      return { theme, toggleDarkMode };
    };

    export default useDarkMode;
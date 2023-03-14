import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),

    poppins: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  palette: {
    primary: {
      // Coklat
      main: '#5B4947',
    },
    secondary: {
      // Kuning
      main: '#FABC1D',
    },

    // Custom colors
    gray1: {
      // Abu-abu 1
      main: "#333333",
    },
    gray2: {
      // Abu-abu 2
      main: "#4F4F4F",
    },
    gray3: {
      // Abu-abu 3
      main: "#828282",
    },
  },
});




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

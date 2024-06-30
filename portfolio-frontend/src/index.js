import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Home from './Pages/Home';
import { createTheme, ThemeProvider } from '@mui/material';
import { green, purple, yellow } from '@mui/material/colors';
import NotFound from './Pages/NotFound';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <NotFound/>
  },
]);



export const theme = createTheme({
  palette: {
    primary: {
      main: green[900],
      contrastText: "white",
    },
    secondary: {
      main: yellow[800],
      
    },
  },
  typography:{
    fontFamily: "VT323, Roboto, Arial, sans-serif",
    color:green[900]
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'VT323, Roboto, Arial, sans-serif',
          fontSize: '25px',
          textTransform: 'none', // Optional: Disable uppercase transformation
          color:green[900]
        },
      }
    }
  }
});


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

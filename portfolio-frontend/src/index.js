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
import { Colors } from './Constants/Colours';


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
      main: Colors.main.primary,
      contrastText: "white",
    },
    secondary: {
      main: Colors.main.secondary,
      
    },
  },
  typography:{
    fontFamily: "VT323, Roboto, Arial, sans-serif",
    color:Colors.main.primary
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'VT323, Roboto, Arial, sans-serif',
          fontSize: '25px',
          textTransform: 'none', // Optional: Disable uppercase transformation
          color:Colors.main.primary
        },
      }
    },
    MuiDivider:{
      styleOverrides: {
        root: {
          backgroundColor:Colors.main.primary
        }
      }
    },
    MuiChip:{
      styleOverrides:{
        root:{
          backgroundColor:Colors.main.primary
        }
      }
    },
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

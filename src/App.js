import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter';
import UserProvider from './providers/UserProvider';
import './App.css';
import Header from './components/common/Header';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import theme from "./components/common/MuiTheme"

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Header />
          {/* <MainRouter /> */}
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

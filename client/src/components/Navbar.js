
import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import { Lock, Menu } from '@mui/icons-material';
// import photoURL from '../profile.jpeg';
import { useValue } from '../context/ContextProvider';
import UserIcons from './user/UserIcons.js';
import Sidebar from './sidebar/Sidebar.js';
import { useState } from 'react';

// const user = { name: 'test', photoURL };
const theme = createTheme({
  palette: {
    primary: {
      // main: '#0e4686',
      main: '#1565c0',
     
    }
  }
});
const NavBar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
  const [isOpen,setIsOpen]=useState(false);

  return (
    <>
    <Toolbar>
    <AppBar theme={theme}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ mr: 1 }}>
            <IconButton size="large" color="inherit" onClick ={()=>setIsOpen(true)}>
              <Menu />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            component="h1"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            LearnLocate
          </Typography>
          <Typography
            variant="h6"
            component="h1"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
           LL
          </Typography>
          {!currentUser ? (
            <Button
              color="inherit"
              startIcon={<Lock />}
              onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
            >
              Login
            </Button>
          ) : (
            <UserIcons />
          )}
        </Toolbar>
      </Container>
    </AppBar>
    </Toolbar>
    <Sidebar {...{isOpen,setIsOpen}}></Sidebar>
    </>
  );
};

export default NavBar;
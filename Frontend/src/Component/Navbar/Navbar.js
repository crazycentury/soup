import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@mui/material/styles";
import { Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';


const Navbar = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const {position} = props

  return (
    <Box >
      <AppBar position={position}
      sx={{
        backgroundColor: 'white', 
        color:primaryColor, 
        height: '70px',
        width:'100%',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}>
        <Toolbar sx={{display: 'flex',
        flexDirection: 'row',
        }}>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={()=> navigate('/')}
          >
          <Box
          component='img' 
          src='/logosoup.png'
          width='53px'
          height='50px'
          sx={{ 
            ml: '60px',
            mt: '7px'
            }}/>
          </IconButton>
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            gap: '40px',
            mr: '50px',
            mt: '7px',
            justifyContent: 'flex-end'
          }}>
            <Button 
              color="inherit"
              sx={{
                width: '175px',
                height: '40px',
                border: '1px solid #5B4947',
                borderRadius: '8px',
              }}
              onClick={() => navigate('/login')}>
                Login
                </Button>
            <Button 
              variant="contained"
              color="secondary"
              sx={{
                width: '175px',
                height: '40px',
                borderRadius: '8px',
                color: primaryColor
              }}
              onClick={() => navigate('/register')}>
                Register
                </Button>
          </Box>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;

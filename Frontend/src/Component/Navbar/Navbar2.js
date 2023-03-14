import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import useAuth from "../../hook/useAuth";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';





const LogoLogout = () =>{
  const theme = useTheme();
  const {logout} = useAuth();
  const navigate = useNavigate();
  const fontFamily = theme.typography.poppins.fontFamily

  const keluar = () =>{
    logout();
    navigate('/');
  };

    return(
      <Button
        onClick={keluar}
        sx={{ 
        my: 2, 
        display: 'block', 
        color: 'black',
        }} >
          <LogoutIcon color='primary' sx={{display: { xs: 'none', md: 'flex' }, alignContent:'center'}}/>
          <Typography color='primary' 
          sx={{display: { xs: 'flex', md: 'none' }, 
          fontFamily: fontFamily,
          textAlign: 'left'}}>
            log out
          </Typography>
      </Button>   
    )
};

const ButtonCart = () =>{
  const navigate = useNavigate();
  return(
    <Button
      // key={page}
      onClick={()=> navigate('/checkout')}
      sx={{ 
      my: 2, 
      display: 'block', 
      color: 'black',
      alignContent:'center', }}

      >
        <ShoppingCart color='primary' sx={{display: { xs: 'none', md: 'flex' }}}/>
        <Typography color='primary' 
          sx={{display: { xs: 'flex', md: 'none' }, 
          
          }}>
            Cart
          </Typography>
    </Button>   
  )
};

const User = () =>{
  return(
    <Button
      // key={page}
      // onClick={handleCloseNavMenu}
      sx={{ 
      my: 2, 
      display: 'block', 
      color: 'black',
      alignContent:'center', }}
      >
        <IconButton >
          <PersonIcon color='secondary' />
        </IconButton>
    </Button>   
  )
};

const ButtonInvoice = () =>{
  const navigate = useNavigate()
  return(
    <Button
      // key={page}
      onClick={() => navigate('/invoice')}
      sx={{ 
      my: 2, 
      display: 'block', 
      color: 'black',
      alignContent:'center', }}
      >
        <Typography fontWeight={500} fontSize='16px' color='primary'>
          Invoice
        </Typography>
    </Button>   
  )
};

const ButtonMyClass = () =>{
  const navigate = useNavigate();
  return(
    <Button
      // key={page}
      onClick={() => navigate('/myclass')}
      sx={{ 
      my: 2, 
      display: 'block', 
      color: 'black',
      alignContent:'center', }}
      >
        <Typography fontWeight={500} fontSize='16px' color='primary'>
          My Class
        </Typography>
    </Button>   
  )
}


const pages = [<ButtonCart/>, <ButtonMyClass/>, <ButtonInvoice/>, <LogoLogout/>];

const NavbarLogin = (props) => {
  const {position} = props

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position={position}
    sx={{
        backgroundColor: 'white',
        zIndex: (theme) => theme.zIndex.drawer + 1,
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
          component='img' 
          src='/logosoup.png'
          width='53px'
          height='50px'
          onClick={()=> navigate('/') }
          sx={{ 
            // flexGrow: 1, 
            display: { xs: 'none', md: 'flex' }, 
            ml: '60px'
            }}
          />

          <Box
          component='img' 
          src='/logosoup.png'
          width='53px'
          height='50px'
          onClick={()=> navigate('/') }
          sx={{ 
            // flexGrow: 1, 
            display: { xs: 'flex', md: 'none' },mr: 1,
            }}
            />
            
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            SOUP
          </Typography>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{
                color: 'black'
              }}/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>


          {/* display on web */}
          <Box sx={{ 
            // flexGrow: 0, 
            display: { xs: 'none', md: 'flex' },
            ml: '800px',
            alignContent: 'center',
            gap:'10px',
            }}>
              <ButtonCart/>
              <ButtonMyClass/>
              <ButtonInvoice/>
              <Typography 
              variant='h5' 
              color='black'
              sx={{
              alignItem:'center',
              marginTop:'20px',
              marginRight:'20px',
              marginLeft:'20px'
              }}>
                |
              </Typography>
              <User/>
              <LogoLogout/>
          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavbarLogin;
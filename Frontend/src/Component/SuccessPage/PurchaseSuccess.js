import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from "@mui/material/styles";
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const PurchaseSuccess = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;
  return (
    <div>
      <Helmet>
        <title>SOUP | Purchase Success</title>
      </Helmet>
        <Box
        component='img' 
        src='./logosoup.png'
        width='53px'
        height='50px'
        mt='20px'
        ml='50px'
        textAlign='left'
        onClick={()=> navigate('/')}
        />
        <Box
        sx={{
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        mt: '122px'
        }}>
          <Box
          component='img'
          src = './success.png'
          width = '250px'
          height = '250px'
          mb='40px'  
          />
          <Typography color='primary' fontWeight={500} fontSize="24px">
          Purchase Successfully
          </Typography>
          <Typography color='grey2' fontWeight={400} fontSize="16px">
          Horay!! Let’s cook and become a professional cheff
          </Typography>

          <Box
          display="flex"
          flexDirection="row"
          marginTop="40px"
          sx={{
            gap:'24px',
            mb:'100px'
          }}
          >
            <Button
            sx={{
              
              width: '182px',
              height: '50px',
              border: '1px solid #5B4947',
              borderRadius: '6px',
              gap: '8px'
            }}
            onClick={()=> navigate('/')}
            >
              <HomeIcon color='primary'/>
              Back to Home
            </Button>

            <Button
            variant="contained"
            color="secondary"
            sx={{
              width: '182px',
              height: '50px',
              borderRadius: '6px',
              gap: '8px',
              color: primaryColor
            }}
            onClick={()=> navigate('/invoice')}
            >
              <ArrowForwardIcon color="primary"/>
              Open Invoice
            </Button>
          </Box>
       
    </Box>

    </div>
    
  )
};

export default PurchaseSuccess;

import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import { useTheme } from "@mui/material/styles";
import { Helmet } from 'react-helmet';

const EmailConfirmSuccess = () => {
    const [message, setMessage] = useState("");
    const { token } = useParams();

    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;

    const url = process.env.REACT_APP_SOUP_API_BASE_URL_ACTIVATION;
    useEffect(() => {
        axios.get(url + token)
            .then((res) => {
                if (res.status === 200) {
                    setMessage("Activation success")
                    console.log("Activation success")
                }
            })
            .catch((err) => {
                console.log(err);
                console.log(err?.response?.data, err?.response?.data)
                setMessage("Activation failed: " + err?.response?.data)
            })
    }, []);

  return (
    <div>
        <Helmet>
            <title>SOUP | Email Confirm Success</title>
        </Helmet>
        <Box
        component='img' 
        src='/logosoup.png'
        width='53px'
        height='50px'
        mt='20px'
        ml='50px'
        textAlign='left'
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
        src = '/success.png'
        width = '250px'
        height = '250px'
        mb='40px'  
        />
        <Typography color='primary' fontWeight={500} fontSize="24px">
            Email Confirmation Success
        </Typography>
        <Typography color='grey2' fontWeight={400} fontSize="16px">
        Congratulations! your email has already used.
        </Typography>
        <Button
        component={Link}
        variant="contained"
        color="secondary"
        to="/login"
        sx={{
            width: '133px',
            height: '50px',
            borderRadius: '6px',
            marginTop: '40px',
            color: primaryColor
        }}>
            Login Here
        </Button>
    </Box>

    </div>
    
  )
};

export default EmailConfirmSuccess

import {React, useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from 'react-router-dom';
import { newPassword } from '../../api/auth';
import { Alert, AlertTitle } from '@mui/material';
import { Helmet } from 'react-helmet';

const NewPass = () => {
    const theme = useTheme();
    const {token} = useParams()
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [alertMsg, setAlertMsg] = useState(null);
    const primaryColor = theme.palette.primary.main;
    const gray1 = theme.palette.gray1.main;
    const gray2 = theme.palette.gray2.main;
    const navigate = useNavigate();

    const AlertErorrMessage = (props)=>{
      return(
        <Alert severity={props.theme}>
        <AlertTitle>{props.title}</AlertTitle>
        {props.pesan} — <strong>check it out!</strong>
      </Alert>
      );
    };

    const isValidAlphanumeric = (text = "") => {
      if (!text) return false; // empty validation

      let regex = new RegExp("^[a-z0-9]+$");
      return regex.test(text) ? false : true;
    };

    const handlePasswordChange = (value) => {
      setPassword(value);
    };

    const handleConfirmPassword = (value) => {
      setPassword2(value);
    };
  
    const buttonStyle = {
      width: "140px",
      borderRadius: "8px",
      color: primaryColor,
      textTransform: "none",
    };

    const validateInput = () => {
      if (!isValidAlphanumeric(password) || password.length < 8) {
          var message = "Password must be more than 8 combinations of uppercase, lowercase and numbers";
          return message;
      }
      if (password !== password2){
        return "Password do not match";
      }
      return "";
    };

    const handleSubmit = () => {

      const errorInput = validateInput();
      if (errorInput) {
        setAlertMsg(<AlertErorrMessage pesan={errorInput} theme="error" title="ERROR"/>)
        return;
      }

      newPassword(token, password)
      .then(()=> {
          navigate('/login')
      })
      .catch((err) => {
          console.log(err);
      })

      console.log(token,password);
    };


    
  
    return (
      <Stack
        spacing={5}
        sx={{
          width: "616px",
          margin: "0 auto",
          marginTop: "96px",
          textAlign: "left",
        }}
      >
        <Helmet>
          <title>SOUP | Reset Password</title>
        </Helmet>
        <Stack spacing="60px">
            <Typography variant="h5" component="h1" sx={{ color: gray1 }}>
              Create Password
            </Typography>
          <Stack spacing='24px'>
            <TextField type="password" label="New Password" onChange={(e) => handlePasswordChange(e.target.value)}/>
            <TextField type="password" label="Confirm New Password"onChange={(e) => handleConfirmPassword(e.target.value)}/>
          </Stack>
          
        </Stack>
        <Stack direction="row" spacing={3} sx={{ alignSelf: "flex-end" }}>
          <Button 
          variant="outlined" color="primary" sx={buttonStyle}
          onClick={() => navigate('/login')}>
            Cancel
          </Button>
          <Button
          variant="contained" color="secondary" sx={buttonStyle}
          onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Stack>
    );
  };

export default NewPass;

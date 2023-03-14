import React, { useState } from 'react';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert, AlertTitle, CircularProgress } from '@mui/material';
import CustomLink from '../CustomLink/CustomLink';
import { Helmet } from 'react-helmet';

const Registerpage = () => {
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;
    const gray2 = theme.palette.gray2.main;
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [alertMsg, setAlertMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleNameChange = (value) => {
      setName(value);
    };
    const handleEmailChange = (value) => {
      setEmail(value);
    };
    const handlePasswordChange = (value) => {
      setPassword(value);
    };
    const handleConfirmPassword = (value) => {
      setPassword2(value);
    };

    const isValidEmail = (email = "") => {
      if (!email) return false; // empty validation

      return String(email)
          .toLowerCase()
          .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const isValidAlphanumeric = (text = "") => {
      if (!text) return false; // empty validation

      let regex = new RegExp("^[a-z0-9]+$");
      return regex.test(text) ? false : true;
    };

    const AlertErorrMessage = (props)=>{
      return(
        <Alert severity={props.theme}>
        <AlertTitle>{props.title}</AlertTitle>
        {props.pesan} — <strong>check it out!</strong>
      </Alert>
      );
    };


    const validateInput = () => {
      if (!name) {
          return "Name field is empty"
      }
      if (!isValidEmail(email)) {
          return "Email not valid"
      }
      if (!isValidAlphanumeric(password) || password.length < 8) {
          var message = "Password must be more than 8 combinations of uppercase, lowercase and numbers";
          return message;
      }
      if (password !== password2){
        return "Password do not match";
      }
      return "";
    };

    const handleSave = () => {
      const url = process.env.REACT_APP_SOUP_API_BASE_URL_REGISTRATION;
      const data = {
        email : email,
        name : name,
        password : password
      };

       // validation
      const errorInput = validateInput();
      if (errorInput) {
        setAlertMsg(<AlertErorrMessage pesan={errorInput} theme="error" title="ERROR"/>)
        return;
      }

    setLoading(true);
    axios({
      method: "post",
      url: url,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response, data) {
        //handle success
        console.log(response, data);
        setAlertMsg(
        <AlertErorrMessage 
        pesan="REGISTER SUCCESS, PLEASE CHECK YOUR EMAIL FOR VERIFICATION"
        theme="success"
        title="SUCCESS"
        />)
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        const errormsg = 'REGISTER FAILED: ' + response
        setAlertMsg(
        <AlertErorrMessage 
        pesan={errormsg} 
        theme="error"
        title="ERROR"/>)
      })
      .finally(() => setLoading(false))
  };
  
    return (
      <Stack
        spacing="60px"
        sx={{ width: "616px", margin: "0 auto", marginTop: "60px" }}
      >
        <Helmet>
          <title>SOUP | Registration</title>
        </Helmet>
        <Stack spacing={5} sx={{ textAlign: "left" }}>
          <Stack spacing={2}>
            <Typography
              variant="h5"
              component="h1"
              sx={{ color: primaryColor, fontWeight: "500" }}
            >
              Are you ready become a professional cheff?
            </Typography>
            <Typography paragraph={true} sx={{ color: gray2 }}>
              Please register first
            </Typography>
            

            {
              loading ? <CircularProgress sx={{color: "red", marginLeft: "48%", marginTop: "3%", justify:"center"}}/> : alertMsg
            }
          </Stack>
          <Stack spacing={3}>
            <TextField id="name" type="text" label="Name" onChange={(e) => handleNameChange(e.target.value)} />
            <TextField id="email" type="email" label="Email" onChange={(e) => handleEmailChange(e.target.value)}  />
            <TextField id="password" type="password" label="Password" onChange={(e) => handlePasswordChange(e.target.value)}  />
            <TextField id="password" type="password" label="Confirm Password" onChange={(e) => handleConfirmPassword(e.target.value)} />
          </Stack>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              width: "140px",
              alignSelf: "flex-end",
              borderRadius: "8px",
              color: primaryColor,
              textTransform: "none",
            }}
            onClick={() => handleSave()}
            // onClick={() => navigate('/emailconfirmsuccess')}
          >
            Sign Up
          </Button>
        </Stack>
        <Typography paragraph={true} sx={{paddingBottom:'50px', textAlign:'center'}}>
          have account?{" "}
          {/* <a href="#" style={{ textDecoration: "none" }} onClick={() => navigate('/login')}>
            Login here
          </a> */}
          <CustomLink to="/login">Login here</CustomLink>
        </Typography>
      </Stack>
    );
  };

export default Registerpage

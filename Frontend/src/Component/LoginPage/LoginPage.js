import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";

import CustomLink from "../CustomLink/CustomLink";

import { useTheme } from "@mui/material/styles";
import { useNavigate, Navigate } from "react-router-dom";

import useAuth from "../../hook/useAuth";

import { login } from "../../api/auth";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const gray2 = theme.palette.gray2.main;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMsg, setAlertMsg] = useState(null);

  const { user, storeLoginData } = useAuth();

  const validateForm = () => {
    if (!email) return "Please enter your email address";
    if (!password) return "Please enter your password";

    return null;
  };

  const rolePage = (role) => {
    if(role === "admin"){
      navigate("/admin/user");
    }
    else{
      navigate("/");
    }
  };

  const tryLogin = () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setAlertMsg(<Alert severity="error">{errorMsg}</Alert>);
      return;
    }

    login(email, password)
      .then((res) => {
        storeLoginData(res.data);
        rolePage(res.data.user_data.role_name);
      })
      .catch((err) => {
        const errorMsg = err?.response?.data || "Unknown error occured";
        setAlertMsg(<Alert severity="error">{errorMsg}</Alert>);
      });
  };

  // Remove the alert whenever any input value changes
  useEffect(() => {
    setAlertMsg(null);
  }, [email, password]);

  // Redirect authenticated user back to the previous page
  if (user) {
    return <Navigate to={-1} replace />;
  }

  return (
    <Container maxWidth="616px" sx={{ maxWidth: "616px", mt: "60px" }}>
      <Helmet>
        <title>SOUP | Login</title>
      </Helmet>
      <Stack component="form" spacing={5} mb="60px" sx={{ textAlign: "left" }}>
        <Stack spacing={2}>
          <Typography
            variant="h5"
            component="h1"
            sx={{ color: primaryColor, fontWeight: "500" }}
          >
            Welcome Back! Cheff
          </Typography>
          <Typography paragraph={true} sx={{ color: gray2 }}>
            Please login first
          </Typography>
        </Stack>
        <Stack spacing={3}>
          {alertMsg}
          <TextField
            required
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography paragraph={true} sx={{ color: gray2 }}>
            Forgot Password? <CustomLink to="/resetpasswordemail">Click Here</CustomLink>
          </Typography>
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
          onClick={tryLogin}
        >
          Login
        </Button>
      </Stack>
      <Typography
        paragraph={true}
        sx={{
          textAlign: "center",
        }}
      >
        Dont have account? <CustomLink to="/register">Sign Up here</CustomLink>
      </Typography>
    </Container>
  );
};

export default LoginPage;

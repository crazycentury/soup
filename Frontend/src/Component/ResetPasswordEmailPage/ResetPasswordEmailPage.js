import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";

import AlertDialog from "../AlertDialog/AlertDialog";

import { askResetPassword } from "../../api/auth";
import { Helmet } from "react-helmet";

const ResetPasswordEmailPage = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const gray1 = theme.palette.gray1.main;
  const gray2 = theme.palette.gray2.main;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [formAlert, setFormAlert] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const validateForm = () => {
    if (!email) return "Please enter your email address";

    return null;
  };

  const closeAlert = () => {
    setOpenAlert(false);
  };

  const sendEmail = () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setFormAlert(<Alert severity="error">{errorMsg}</Alert>);
      return;
    }

    setIsSendingEmail(true);
    askResetPassword(email)
      .then(() => {
        setAlertMsg("Email has sent, please check your email");
        setAlertType("success");
        setOpenAlert(true);
      })
      .catch((err) => {
        const errorMsg = err?.response?.data;

        if (errorMsg === "Email not registered") {
          setAlertMsg(errorMsg);
          setAlertType("error");
          setOpenAlert(true);
          return;
        }

        setFormAlert(<Alert severity="error">{errorMsg}</Alert>);
      })
      .finally(() => setIsSendingEmail(false));
  };

  useEffect(() => {
    setFormAlert(null);
  }, [email]);

  const buttonStyle = {
    width: "140px",
    borderRadius: "8px",
    color: primaryColor,
    textTransform: "none",
  };

  return (
    <Container
      component="form"
      maxWidth="616px"
      sx={{ maxWidth: "616px", mt: 12, textAlign: "left" }}
    >
      <Helmet>
        <title>SOUP | Reset Password</title>
      </Helmet>
      <Stack spacing="60px" mb={5}>
        <Stack spacing={2}>
          <Typography variant="h5" component="h1" sx={{ color: gray1 }}>
            Reset Password
          </Typography>
          <Typography paragraph={true} sx={{ color: gray2 }}>
            Send OTP code to your email address
          </Typography>
        </Stack>
        <Stack spacing={3}>
          {formAlert}
          <TextField
            required
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={3} sx={{ justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          color="primary"
          sx={buttonStyle}
          onClick={() => navigate("/login")}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={isSendingEmail}
          sx={buttonStyle}
          onClick={sendEmail}
        >
          Confirm
        </Button>
      </Stack>

      <AlertDialog
        open={openAlert}
        handleClose={closeAlert}
        severity={alertType}
        message={alertMsg}
      />
    </Container>
  );
};

export default ResetPasswordEmailPage;

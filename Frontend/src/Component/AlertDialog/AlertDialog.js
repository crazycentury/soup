import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const AlertIcon = (props) => {
  const { severity, fontSize } = props;

  switch (severity) {
    case "success":
      return (
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: fontSize }} />
      );
    case "error":
      return <ErrorOutlineIcon color="error" sx={{ fontSize: fontSize }} />;
    default:
      return null;
  }
};

const AlertDialog = (props) => {
  const { open, handleClose, severity, message } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      sx={{ textAlign: "center" }}
    >
      <DialogContent sx={{ padding: {sx:'20px' ,md: "32px"} }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: {sx:'20px' ,md: "32px"},
          }}
        >
          <AlertIcon severity={severity} fontSize="7rem" />
        </Box>

        <Typography variant="h6">{message}</Typography>
      </DialogContent>

      <DialogActions
        sx={{ justifyContent: "center", padding: {sx:'20px' ,md: "32px"}, paddingTop: "0" }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClose}
          sx={{ flex: "auto" }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;

import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const UserFormDialog = (props) => {
  const { open, user, title, buttonText, onChange, onClose, onSubmit, alert } =
    props;

  const submit = () => {
    onSubmit(user);
  };

  const changeUserProp = (key, value) => {
    const newUser = { ...user };
    newUser[key] = value;
    onChange(newUser);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          {alert}

          <FormControl>
            <FormLabel>Role</FormLabel>
            <RadioGroup
              row
              value={user.fk_role_id}
              onChange={(e) => changeUserProp("fk_role_id", e.target.value)}
            >
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Basic User"
              />
              <FormControlLabel value={1} control={<Radio />} label="Admin" />
            </RadioGroup>
          </FormControl>

          <TextField
            required
            type="text"
            label="Name"
            value={user.name}
            onChange={(e) => changeUserProp("name", e.target.value)}
          />
          <TextField
            required
            type="email"
            label="Email"
            value={user.email}
            onChange={(e) => changeUserProp("email", e.target.value)}
          />
          <TextField
            required
            type="password"
            label="Password"
            value={user.password}
            onChange={(e) => changeUserProp("password", e.target.value)}
          />
          <TextField
            required
            type="password"
            label="Confirm Password"
            value={user.confirm_password}
            onChange={(e) => changeUserProp("confirm_password", e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="secondary" onClick={submit}>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormDialog;

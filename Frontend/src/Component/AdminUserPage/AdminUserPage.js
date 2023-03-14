import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";

import AlertDialog from "../AlertDialog/AlertDialog";
import BaseAdminView from "../BaseAdminView/BaseAdminView";
import DataTable from "../DataTable/DataTable";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import UserFormDialog from "./UserFormDialog";

import {
  getAllUsers,
  setUserActiveStatus,
  addUser,
  editUser,
} from "../../api/admin";
import { Helmet } from "react-helmet";

const tableHeaders = ["Name", "Email", "Role", "Status", "Active"];

function getEmptyUserForm() {
  return {
    fk_role_id: 2,
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };
}

function ActionButton(props) {
  const { children, onClick } = props;

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      sx={{ width: "100%" }}
    >
      {children}
    </Button>
  );
}

const AdminUserPage = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [formAlert, setFormAlert] = useState(null);
  const [alertData, setAlertData] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const [confirmData, setConfirmData] = useState({
    open: false,
    message: "",
  });
  const [addUserFormData, setAddUserFormData] = useState({
    open: false,
    user: getEmptyUserForm(),
  });
  const [editUserFormData, setEditUserFormData] = useState({
    open: false,
    user: {},
  });

  const loadUsers = () => {
    setLoading(true);
    getAllUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch(handleRequestError)
      .finally(() => setLoading(false));
  };

  const submitNewUser = (user) => {
    const formErrMsg = validateUserForm(user);
    if (formErrMsg) {
      displayFormErrorAlert(formErrMsg);
      return;
    }

    addUser(user.fk_role_id, user.name, user.email, user.password)
      .then(() => {
        closeAddUserForm();
        loadUsers();
      })
      .catch((err) => {
        const errMsg = err?.response?.data;
        displayFormErrorAlert(errMsg);
      });
  };

  const submitEditUser = (user) => {
    const formErrMsg = validateUserForm(user);
    if (formErrMsg) {
      displayFormErrorAlert(formErrMsg);
      return;
    }

    editUser(
      user.user_id,
      user.fk_role_id,
      user.name,
      user.email,
      user.password
    )
      .then(() => {
        closeEditUserForm();
        loadUsers();
      })
      .catch((err) => {
        const errMsg = err?.response?.data;
        displayFormErrorAlert(errMsg);
      });
  };

  const handleRequestError = (err) => {
    const errMsg = err?.response?.data;
    setAlertData({ open: true, severity: "error", message: errMsg });
  };

  const validateUserForm = (user) => {
    if (
      ![
        user.fk_role_id,
        user.name,
        user.email,
        user.password,
        user.confirm_password,
      ].every((v) => v)
    ) {
      return "All required fields must be filled";
    }
    if (user.password !== user.confirm_password) {
      return "Password and Confirm Password don't match";
    }

    return null;
  };

  const displayFormErrorAlert = (message) => {
    setFormAlert(<Alert severity="error">{message}</Alert>);
  };

  const confirmSetActive = (id) => {
    setUserId(id);
    setConfirmData({
      open: true,
      message: "Are you sure to change status for this user?",
    });
  };

  const toggleUserStatus = () => {
    const user = users.find((u) => u.user_id === userId);

    setLoading(true);
    setUserActiveStatus(userId, !user.active)
      .then(loadUsers)
      .catch(handleRequestError);

    setUserId(null);
    closeConfirm();
  };

  const changeAddUserForm = (user) => {
    setAddUserFormData({ ...addUserFormData, user });
    setFormAlert(null);
  };

  const changeEditUserForm = (user) => {
    setEditUserFormData({ ...editUserFormData, user });
    setFormAlert(null);
  };

  const openAddUserForm = () => {
    setAddUserFormData({ ...addUserFormData, open: true });
  };

  const openEditUserForm = (userIndex) => {
    const user = users[userIndex];
    setEditUserFormData({ user, open: true });
  };

  const closeAlert = () => {
    setAlertData({ ...alertData, open: false });
  };

  const closeConfirm = () => {
    setConfirmData({ ...confirmData, open: false });
  };

  const closeAddUserForm = () => {
    setAddUserFormData({ user: getEmptyUserForm(), open: false });
    setFormAlert(null);
  };

  const closeEditUserForm = () => {
    setEditUserFormData({ user: {}, open: false });
    setFormAlert(null);
  };

  useEffect(loadUsers, []);

  return (
    <BaseAdminView>
      {loading ? <LinearProgress /> : null}
      <Helmet>
        <title>SOUP | Admin</title>
      </Helmet>
      <DataTable
        headers={tableHeaders}
        rows={users.map((user, index) => [
          user.name,
          user.email,
          user.role_name,

          <ActionButton onClick={() => confirmSetActive(user.user_id)}>
            {user.active ? "Active" : "Inactive"}
          </ActionButton>,
          <Stack direction="row" spacing={2}>
            <ActionButton onClick={openAddUserForm}>Add</ActionButton>
            <ActionButton onClick={() => openEditUserForm(index)}>
              Edit
            </ActionButton>
          </Stack>,
        ])}
      />

      <AlertDialog
        open={alertData.open}
        handleClose={closeAlert}
        severity={alertData.severity}
        message={alertData.message}
      />
      <ConfirmDialog
        open={confirmData.open}
        message={confirmData.message}
        onClose={closeConfirm}
        onCancel={closeConfirm}
        onConfirm={toggleUserStatus}
      />

      <UserFormDialog
        title="Add User"
        buttonText="Add"
        open={addUserFormData.open}
        user={addUserFormData.user}
        onChange={changeAddUserForm}
        onClose={closeAddUserForm}
        onSubmit={submitNewUser}
        alert={formAlert}
      />
      <UserFormDialog
        title="Edit User"
        buttonText="Edit"
        open={editUserFormData.open}
        user={editUserFormData.user}
        onChange={changeEditUserForm}
        onClose={closeEditUserForm}
        onSubmit={submitEditUser}
        alert={formAlert}
      />
    </BaseAdminView>
  );
};

export default AdminUserPage;

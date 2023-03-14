import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

import PaymentIcon from "@mui/icons-material/Payment";
import PaymentsIcon from "@mui/icons-material/Payments";
import PersonIcon from "@mui/icons-material/Person";

import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../../hook/useAuth";

import Sidebar from "./Sidebar";

const sidebarItems = [
  {
    text: "Invoice",
    icon: <PaymentsIcon />,
    path: "/invoice",
    child_pattern: /^\/detailinvoice\/\d+$/,
    roles: ["user", "admin"],
  },
  {
    text: "Payment Method",
    icon: <PaymentIcon />,
    path: "/admin/payment-method",
    roles: ["admin"],
  },
  {
    text: "User Page",
    icon: <PersonIcon />,
    path: "/admin/user",
    roles: ["admin"],
  },
];

function isAuthorized(user, path) {
  const sidebarItem = sidebarItems.find(
    (item) => item.path === path || path.match(item.child_pattern)
  );
  return user && sidebarItem.roles.some((role) => role === user.role_name);
}

const BaseAdminView = (props) => {
  const location = useLocation();
  const { user, isValidatingToken } = useAuth();

  const { children } = props;

  const [sidebarList, setSidebarList] = useState([]);

  useEffect(() => {
    const authorizedMenu = sidebarItems.filter((item) =>
      isAuthorized(user, item.path)
    );
    setSidebarList(authorizedMenu);
  }, [user]);

  if (!isValidatingToken && !isAuthorized(user, location.pathname)) {
    return <Navigate to={"/"} />;
  }

  return (
    <Grid container mt={12}>
      <Grid item xs={2}>
        <Sidebar items={sidebarList} isAuthorized={isAuthorized} />
      </Grid>
      <Grid item xs={10}>
        {children}
      </Grid>
    </Grid>
  );
};

export default BaseAdminView;

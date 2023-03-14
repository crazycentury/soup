import React, { useEffect, useState } from "react";

import LinearProgress from "@mui/material/LinearProgress";

import AlertDialog from "../AlertDialog/AlertDialog";
import BaseAdminView from "../BaseAdminView/BaseAdminView";
import AdminInvoiceTable from "./AdminInvoiceTable";
import UserInvoiceTable from "./UserInvoiceTable";

import { getAllUserInvoices, getUserInvoices } from "../../api/invoice";
import useAuth from "../../hook/useAuth";
import { Helmet } from "react-helmet";

const InvoicePage = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [table, setTable] = useState(null);
  const [alertData, setAlertData] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const closeAlert = () => {
    setAlertData({ open: false, severity: "", message: "" });
  };

  useEffect(() => {
    if (!user) return;

    const apiFunc =
      user.role_name === "admin" ? getAllUserInvoices : getUserInvoices;

    setLoading(true);
    apiFunc()
      .then((res) => {
        setInvoices(res.data);
      })
      .catch((err) => {
        const errMsg = err?.response?.data;
        setAlertData({ open: true, severity: "error", message: errMsg });
      })
      .finally(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    if (!user) return;

    switch (user.role_name) {
      case "admin":
        setTable(<AdminInvoiceTable invoices={invoices} />);
        break;
      case "user":
        setTable(<UserInvoiceTable invoices={invoices} />);
        break;
    }
  }, [invoices]);

  return (
    <BaseAdminView>
      <Helmet>
        <title>SOUP | Invoice</title>
      </Helmet>
      {loading ? <LinearProgress /> : null}
      {table}
      <AlertDialog
        open={alertData.open}
        severity={alertData.severity}
        message={alertData.message}
        handleClose={closeAlert}
      />
    </BaseAdminView>
  );
};

export default InvoicePage;

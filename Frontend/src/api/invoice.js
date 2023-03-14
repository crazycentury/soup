import axios from "axios";

import { getBearerToken } from "./auth";

const invoiceAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/invoice/`,
});

function setAuthHeader() {
  invoiceAxios.defaults.headers.common["Authorization"] = getBearerToken();
}

function getUserInvoices() {
  setAuthHeader();
  return invoiceAxios.get("/userinvoices");
}

function getAllUserInvoices() {
  setAuthHeader();
  return invoiceAxios.get("/alluserinvoices");
}

function getDetailInvoice(invoice_id) {
  setAuthHeader();
  return invoiceAxios.get("/detailinvoice", {
    params: { invoice_id },
  });
}

function getMyClass() {
  setAuthHeader();
  return invoiceAxios.get("/myclass");
}

export { getUserInvoices, getDetailInvoice, getMyClass, getAllUserInvoices };

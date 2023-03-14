import axios from "axios";

import { getBearerToken } from "./auth";

const adminAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/admin/`,
});

const paymentMethodAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/PaymentMethod/`,
});

function setAuthHeader() {
  adminAxios.defaults.headers.common["Authorization"] = getBearerToken();
}

function setAuthHeaderPaymentMethod() {
  paymentMethodAxios.defaults.headers.common["Authorization"] = getBearerToken();
}

function getAllUsers() {
  setAuthHeader();
  return adminAxios.get("/users");
}

function setUserActiveStatus(user_id, active) {
  setAuthHeader();
  return adminAxios.patch("/setuseractivestatus", { user_id, active });
}

function addUser(fk_role_id, name, email, password) {
  setAuthHeader();
  return adminAxios.post("/adduser", { fk_role_id, name, email, password });
}

function editUser(user_id, fk_role_id, name, email, password) {
  setAuthHeader();
  return adminAxios.patch("/edituser", {
    user_id,
    fk_role_id,
    name,
    email,
    password,
  });
}

function addPaymentMethod(name, image){
  setAuthHeaderPaymentMethod();
  return paymentMethodAxios.post("/add", {name, image})
};

function getAllPaymentMethod(){
  return paymentMethodAxios.get("/PaymentMethod")
};

function editPaymentMethod(payment_method_id, name, image, active) {
  setAuthHeaderPaymentMethod();
  return paymentMethodAxios.patch("/EditPaymentMethod", {
    payment_method_id,
    name,
    image,
    active,
  });
}

function setPaymentMethodStatus(payment_method_id, active) {
  setAuthHeaderPaymentMethod();
  return paymentMethodAxios.patch("/SetPaymentMethodStatus", { payment_method_id, active });
}


export { 
  getAllUsers, 
  setUserActiveStatus, 
  addUser, 
  editUser, 
  addPaymentMethod, 
  getAllPaymentMethod,
  editPaymentMethod,
  setPaymentMethodStatus };

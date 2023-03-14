import axios from 'axios'

import { getBearerToken } from './auth';

const CART_KEY = "cart";

const paymentAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/payment/`
})

function setAuthHeader() {
  paymentAxios.defaults.headers.common["Authorization"] = getBearerToken();
}

function payItems(fk_payment_method_id, items) {
  setAuthHeader()
  return paymentAxios.post("/pay", {fk_payment_method_id, items})
}

function getCartItems() {
  const cartJson = localStorage.getItem(CART_KEY);

  if (!cartJson) {
    localStorage.setItem(CART_KEY, JSON.stringify([]));
    return [];
  }

  return JSON.parse(cartJson);
}

function addCartItem(courseId, dateString) {
  const cartItems = getCartItems();
  const itemExist = cartItems.some(
    (item) => item.id === courseId && item.date === dateString
  );

  if (itemExist)
    throw "Course with the same schedule already exist in cart. Please select another schedule";

  const cartItem = {
    id: courseId,
    date: dateString,
  };
  cartItems.push(cartItem);

  const cartJson = JSON.stringify(cartItems);
  localStorage.setItem(CART_KEY, cartJson);
}

export { payItems, addCartItem, getCartItems, CART_KEY};

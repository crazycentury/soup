import axios from "axios";

const soupAxios = axios.create({
  baseURL: process.env.REACT_APP_SOUP_API_BASE_URL,
});

function getListMenuClass(categoryId) {
  return soupAxios.get("/listmenuclass", {
    params: {
      categoryId,
    },
  });
}

function getDetailClass(courseId) {
  return soupAxios.get("/detailclass", {
    params: {
      courseId,
    },
  });
}

function getLandingPage() {
  return soupAxios.get("/landingpage");
}

function getCartData(listcourseid) {
  return soupAxios.post("/checkout", {listcourseid});
};



export { getListMenuClass, getDetailClass, getLandingPage, getCartData };

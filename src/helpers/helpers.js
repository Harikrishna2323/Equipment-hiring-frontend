import cookie from "js-cookie";

//set-cookie
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 5,
    });
  }
};

//remove cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 5,
    });
  }
};

//get cookie from stored token
export const getCookie = (key, value) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

// set in local storage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove from local storage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// authenticate user by passing data to cookie and localstorage
export const authenticate = (res, next) => {
  console.log("Authenticate helper on signin response", res);
  setCookie("token", res.data.token);
  setLocalStorage("user", res.data.user);
  next();
};
//access user info from localstorage
export const isAuth = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

//remove all
export const logout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
};

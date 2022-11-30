import { API } from "../backend";

export const signup = user => {
  return fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


export const signin = user => {
  return fetch(`${API}/auth/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    delete data.password;
    localStorage.setItem("user", JSON.stringify(data));
    next();
  }
};

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    window.location.reload();
  }
};

export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};

export const upgradeToAdminAPI = user => {
  return fetch(`${API}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then( response => {
      if(response.status == 200) {
        return response.json();
      }
      return false;
    })
    .catch(err => console.log(err));
};

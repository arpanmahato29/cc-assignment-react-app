import { API } from "../backend";


export const getProducts = () => {
  return fetch(`${API}/products`, { method: "GET" })
    .then(response => {
      if(response.status == 200) {
        return response.json();
      } else if(response.status == 404){
        return {
          "errorCode" : 400,
          "error" : "No products found"
        }
      }
      
    })
    .catch(err => console.log(err));
};

export const createCategory = (user, category) => {
  const payload = {
    "user": user,
    "category": category
  }
  console.log(payload);
  return fetch(`${API}/categories`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  })
    .then(response => {
      if(response.status == 201) {
        return true;
      }
      return false;
    })
    .catch(err => console.log(err));
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then(response => {
      if(response.status === 200) {
        return response.json();
      }
      return false;
    })
    .catch(err => console.log(err));
};


export const createProduct = (user, product) => {
  const payload = {
    user,
    product
  }
  return fetch(`${API}/products`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  })
    .then(response => {
      if(response.status == 201){
        return true;
      }
      return false;
    })
    .catch(err => console.log(err));
};

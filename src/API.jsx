const API_URL = "https://fakestoreapi.com/";

export async function getProducts(setR) {
  console.log("Getting Products");
  try {
    const response = await fetch(API_URL + "products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    setR(res);
  } catch (err) {
    console.error(err);
  }
}

export async function getProduct(id, setR) {
  console.log("Get Product: ", id);
  try {
    const response = await fetch(API_URL + `products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    setR(res);
  } catch (err) {
    console.error(err);
  }
}

export async function registerAPI(userObject, tokenR) {
  console.log("Registering user: ", userObject);
  try {
    const response = await fetch(API_URL + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    });
    const res = await response.json();
    if (res.message == "Registration successful") {
      tokenR(res.token);
      console.log("Register Success");
    } else {
      alert(res.message);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function loginAPI(loginObject, tokenR) {
  console.log("Login: ", loginObject);
  try {
    const response = await fetch(API_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginObject),
    });
    const res = await response.json();
    tokenR(res.token);
    console.log(res);
  } catch (err) {
    console.error(err);
    alert("Invalid Username and/or Password!")
  }
}
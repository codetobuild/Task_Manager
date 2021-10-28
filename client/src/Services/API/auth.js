import axios from "axios";

export const userLogin = async (formData) => {
  try {
    const { data } = await axios.post("/api/auth/login", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const userRegistration = async (formData) => {
  try {
    const { data } = await axios.post("/api/auth/register", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (err) {
    console.log({ err });
  }
};

export const checkIsLoggedIn = async () => {
  try {
    const { data } = await axios.get("/api/auth/isLoggedIn");
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const userLogout = async () => {
  try {
    const { data } = await axios.get("/api/auth/logout");
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const userUpdate = async (formData) => {
  try {
    const { data } = await axios.post("/api/auth/user/edit", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

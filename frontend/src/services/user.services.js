const URL = import.meta.env.VITE_BACKEND_URL;

export const userSignup = async (data) => {
  return await fetch(`${URL}/api/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const userLogin = async (data) => {
  return await fetch(`${URL}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const userDetails = async () => {
  return await fetch(`${URL}/api/user/userdetails`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};

export const updateUser = async (data) => {
  return await fetch(`${URL}/api/user/updateuser`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

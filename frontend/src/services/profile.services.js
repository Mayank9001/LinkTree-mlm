const URL = import.meta.env.VITE_BACKEND_URL;

export const setUserDetails = async (data) => {
  return await fetch(`${URL}/api/profile/setdetails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

export const getProfile = async () => {
  return await fetch(`${URL}/api/profile/getprofile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};

export const setDesign = async (data) => {
  return await fetch(`${URL}/api/profile/setdesign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

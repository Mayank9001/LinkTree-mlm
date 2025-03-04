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

export const setProfile = async (data) => {
  return await fetch(`${URL}/api/profile/setprofile`, {
    method: "POST",
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: data,
  });
};

export const visitProfile = async (data) => {
  return await fetch(`${URL}/api/profile/visitprofile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getGlobalProfile = async (username) => {
  return await fetch(`${URL}/api/profile/getprofile/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAnalytics = async () => {
  return await fetch(`${URL}/api/profile/getanalytics`, {
    metthod: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};

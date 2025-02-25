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

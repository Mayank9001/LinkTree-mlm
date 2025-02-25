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

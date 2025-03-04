const URL = import.meta.env.VITE_BACKEND_URL;

export const visitLogs = async (id) => {
  return await fetch(`${URL}/api/visit/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

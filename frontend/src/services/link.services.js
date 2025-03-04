const URL = import.meta.env.VITE_BACKEND_URL;

export const createLink = async (data) => {
  return await fetch(`${URL}/api/link/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

export const getLinks = async () => {
  return await fetch(`${URL}/api/link/getlinks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};

export const getSingleLink = async (id) => {
  return await fetch(`${URL}/api/link/getlink/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};

export const editLink = async (id, data) => {
  return await fetch(`${URL}/api/link/editlink/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

export const deleteLink = async (id) => {
  return await fetch(`${URL}/api/link/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};

export const setShow = async (id, data) => {
  return await fetch(`${URL}/api/link/setshow/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

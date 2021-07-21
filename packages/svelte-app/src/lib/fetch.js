const baseURL = "http://localhost:3001/api";

export const fetchApi = async (resource, method = "GET", data) => {
  return await fetch(`${baseURL}/${resource}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });
};

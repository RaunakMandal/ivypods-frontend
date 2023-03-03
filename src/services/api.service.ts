const post = (url: string, params: any) => {
  return fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params.body),
  }).then((response) => response.json());
};

const get = (url: string, params: any) => {
  return fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${params.token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

const put = (url: string, params: any) => {
  return fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${params.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params.body),
  }).then((response) => response.json());
};

const delete_ = (url: string, params: any) => {
  return fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${params.token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const ApiService = {
  post,
  get,
  put,
  delete: delete_,
};

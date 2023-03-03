const post = (url: string, params: any) => {
    return fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
    .then((response) => response.json())
};

const get = (url: string, params: any) => {
    return fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${params.token}`,
        },
    })
    .then((response) => response.json())
};

export const ApiService = {
    post, get
};
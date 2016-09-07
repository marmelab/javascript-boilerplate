/* globals API_URL */
const getOptions = jwt => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    };

    if (jwt) {
        headers.Authorization = jwt;
    }

    return {
        headers,
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        credentials: 'include',
    };
};

const handleResponse = response => {
    if (!response.ok) {
        return response.text().then(result => Promise.reject(new Error(result)));
    }

    return response.json();
};

const handleError = error => ({ error });

export default path => (jwt, id) =>
    fetch(`${API_URL}/${path}${id ? `/${id}` : ''}`, getOptions(jwt))
    .then(handleResponse)
    .then(json => ({ result: json }))
    .catch(handleError);

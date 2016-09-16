/* globals API_URL */
import fetch from 'isomorphic-fetch';

const getOptions = (method, { jwt, id, body }) => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    };

    if (jwt) {
        headers.Authorization = jwt;
    }

    let finalMethod = method;

    if (id && body && method === 'GET') {
        finalMethod = 'PUT';
    }

    if (!id && body && method === 'GET') {
        finalMethod = 'POST';
    }

    return {
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        credentials: 'include',
        headers,
        method: finalMethod,
        body: body ? JSON.stringify(body) : undefined,
    };
};

const handleResponse = response => {
    if (!response.ok) {
        return response.text().then(result => Promise.reject(new Error(result)));
    }

    return response.json();
};

const handleError = error => ({ error });

export const customFetch = fetchImpl => (path, method = 'GET') => (options = {}) => {
    const url = `${API_URL}/${path}${options.id ? `/${options.id}` : ''}`;
    const finalOptions = getOptions(method, options);

    return fetchImpl(url, finalOptions)
        .then(handleResponse)
        .then(json => ({ result: json }))
        .catch(handleError);
};

export default customFetch(fetch);

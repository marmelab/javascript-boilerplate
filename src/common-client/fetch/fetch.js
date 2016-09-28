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

/**
 * Factory for fetch requests. Must be supplied the fetch implementation.
 * This method is meant for tests but can be used instead of the default export
 * if a custom fetch implementation is needed.
 */
export const customFetch = fetchImpl => (path, method = 'GET') => (options = {}) => {
    const url = `${API_URL}/${path}${options.id ? `/${options.id}` : ''}`;
    const finalOptions = getOptions(method, options);

    return fetchImpl(url, finalOptions)
        .then(handleResponse)
        .then(json => ({ result: json }))
        .catch(handleError);
};

/**
 * Simple wrapper around fetch for common uses.
 *
 * @example <caption>fetch for an unauthenticated GET request</caption>
 * import fetch from 'common-client/fetch';
 *
 * // Will request 'API_URL/products'
 * fetch('products')();
 *
 * @example <caption>fetch for an authenticated GET request</caption>
 * import fetch from 'common-client/fetch';
 *
 * // Will request 'API_URL/orders/foo' with the correct jwt headers
 * fetch('orders')({ jwt: localstore.get('jwt'), id: 'foo' });
 *
 * @example <caption>fetch for an authenticated PATCH request</caption>
 * import fetch from 'common-client/fetch';
 *
 * // Will request 'API_URL/orders/foo' with the correct jwt headers
 * fetch('orders', 'PATCH')({ jwt: localstore.get('jwt'), id: 'foo', body: { status: 'pending' } });
 */
export default customFetch(fetch);

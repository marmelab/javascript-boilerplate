import fetch from 'isomorphic-fetch';

export default store => next => action => {
    next(action);
    if (!action.request) {
        return;
    }
    next({
        ...action,
        type: `${action.type}_PENDING`,
    });

    const { request, onSuccess, onError } = action;

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': window.sessionStorage.getItem('token'),
            'Content-Type': 'application/json; charset=utf-8',
        },
        method: 'GET',
        ...request.config,
    };

    let resp;
    fetch(request.url, config)
    .then(response => {
        if (response.status >= 200 && response.status < 300) {
            resp = response;
            return response.json();
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    })
    .then(json => {
        next({
            ...action,
            response: json,
            headers: resp.headers,
            type: `${action.type}_SUCCESS`,
            request: false,
        });
        if (onSuccess) {
            store.dispatch(onSuccess);
        }
    })
    .catch(error => {
        setTimeout(() => store.dispatch({
            ...action,
            error,
            type: `${action.type}_ERROR`,
            request: false,
        }), 5000); // retry 5 seconds later
        if (onError) {
            store.dispatch(onError);
        }
    });
};

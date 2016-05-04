export default (config, fetch) => fetch(`${config.apiUrl}${config.endpoint}`, { headers: { origin: config.apiUrl } }).then(response => { // eslint-disable-line max-len
    if (response.status !== 200) {
        return false;
    }

    return true;
});

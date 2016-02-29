export default (config, fetch) => fetch(config.apiUrl).then(response => {
    if (response.status !== 200) {
        return false;
    }

    return true;
});

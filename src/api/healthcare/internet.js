export default (config, fetch) => fetch(config.internetUrl).then((response) => {
    if (response.status !== 200) {
        return false;
    }

    return true;
});

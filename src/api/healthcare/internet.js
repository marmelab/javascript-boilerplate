import buildCheckResult from './buildCheckResult';

// config.apps.api.healthcare.internetAccessUrl
export default (config, fetch) => fetch(config.internetUrl).then(response => {
    if (response.status !== 200) {
        return buildCheckResult(false, response.statusText);
    }

    return buildCheckResult();
});

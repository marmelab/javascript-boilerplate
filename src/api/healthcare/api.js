export default ({ apiUrl, endPoint }, fetch) =>
    fetch(`${apiUrl}${endPoint}`, {
        headers: { origin: apiUrl },
    })
    .then(response => response.status === 200);

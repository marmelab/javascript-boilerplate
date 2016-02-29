export default (valid = true, message = 'OK') => ({
    valid,
    message: valid ? message : `KO - ${message}`,
});

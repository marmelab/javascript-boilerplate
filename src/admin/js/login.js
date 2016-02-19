/* globals ADMIN_API_URL */
function redirect() {
    window.location = '/admin';
}

// check for user already logged in
if (window.localStorage.getItem('token')) {
    redirect();
}

function showError() {
    document.getElementById('loginError').style.display = 'block';
    document.getElementById('submitButton').disabled = false;
}

document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault(); // stop form from submitting

    const req = new XMLHttpRequest();
    req.withCredentials = true;
    req.open('POST', `${ADMIN_API_URL}authenticate`, true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.onload = () => {
        // store token and redirect
        let json = {};
        try {
            json = JSON.parse(req.responseText);
        } catch (error) {
            return showError();
        }

        if (!json.id || !json.email || !json.token) {
            return showError();
        }

        window.localStorage.setItem('id', json.id);
        window.localStorage.setItem('email', json.email);
        window.localStorage.setItem('token', json.token);
        window.localStorage.setItem('expires', json.expires);
        redirect();
    };
    req.onerror = showError;
    req.send(JSON.stringify({
        email: document.getElementById('inputEmail').value,
        password: document.getElementById('inputPassword').value,
    }));
});

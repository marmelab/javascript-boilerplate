function redirect() {
    window.location = '/admin';
}

// check for user already logged in
if (window.sessionStorage.getItem('token')) {
    redirect();
}

function showError() {
    document.getElementById('loginError').style.display = 'block';
    document.getElementById('submitButton').disabled = false;
}

document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault(); // stop form from submitting

    const req = new XMLHttpRequest();
    req.open('POST', `${ADMIN_API_URL}authenticate`, true); // eslint-disable-line no-undef
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

        window.sessionStorage.setItem('id', json.id);
        window.sessionStorage.setItem('email', json.email);
        window.sessionStorage.setItem('token', json.token);
        redirect();
    };
    req.onerror = showError;
    req.send(JSON.stringify({
        email: document.getElementById('inputEmail').value,
        password: document.getElementById('inputPassword').value,
    }));
});

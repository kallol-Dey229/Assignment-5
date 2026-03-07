document.getElementById('signin-btn')
    .addEventListener('click', function () {
        const nameInput = document.getElementById('username-input');
        const Uname = nameInput.value;

        const passwordInput = document.getElementById('password-input');
        const password = passwordInput.value;


        if (Uname ==='admin' && password === 'admin123') {
            alert('Login successful');

            window.location.assign('./home.html');
        }


         else{
            alert('login failed');
            return;
        }
    });
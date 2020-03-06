function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: 'http://localhost:3000/users/google_login',
        method: 'post',
        data: {
            gtoken: id_token
        },
        success: (data) => {
            console.log(data)
            localStorage.setItem('token', data.token)
            showMain()
        },
        error: (err) => {
            console.log(err)
        }
    })
}

function signOut() {
    localStorage.removeItem('token')
    $('#login-page').show()
    $('#register-page').hide()
    $('#main-page').hide()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
   
}
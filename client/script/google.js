function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: 'http://localhost:4000/users/google_login',
        method: 'post',
        data: {
            gtoken: id_token
        },
        success: (data) => {
            // console.log(data)
            localStorage.setItem('token', data.token)
            $("#login-page").hide(200)
            $("#register-page").hide(200)
            getStocks()
            $("#stocks").show(450)
            $(".navbar").hide()
            $(".logout").show()
        },
        error: (err) => {
            console.log(err)
        }
    })
}

function signOut() {
    localStorage.removeItem('token')
    $('#login-page').show(450)
    $('#register-page').hide()
    $('#stocks').hide()
    $('#edit-page').hide()
    $("#login-form")[0].reset()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
   
}
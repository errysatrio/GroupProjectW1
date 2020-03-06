$('#edit-form').on('click', () => {
    $('#edit-name').val(data.name)
    $('#edit-username').val(data.username)
    $('#edit-email').val(data.email)
    $('#edit-password').val(data.password)
    $('#rahasia').val(data.id)
})

$('#login-form').on('click',()=>{
    if(localStorage.token){
        showMain()
    }else {
        showLogin()
    }
})

$('#register-form').on('submit', (e) => {
    register()
})
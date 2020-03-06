$("#btn-sign-in").on("click", () => {
    $("#login-page").show(450)
    $("#register-page").hide(200)
})
$("#btn-register").on("click", () => {
    $("#register-page").show(450)
    $("#login-page").hide(200)
})
$('#edit-form').on('click', () => {
    $('#edit-name').val(data.name)
    $('#edit-username').val(data.username)
    $('#edit-email').val(data.email)
    $('#edit-password').val(data.password)
    $('#rahasia').val(data.id)
})

$('#login-form').on('submit',(event)=>{
    event.preventDefault();
    login()
})

$('#register-form').on('submit', (event) => {
    event.preventDefault
    register()
})

$('#btn-logout').on('click', () => {
    signOut()
})

$('#btn-your-stocks').on('click',()=>{
    getUserStocks()
    $("#userStocks").show(300)
})
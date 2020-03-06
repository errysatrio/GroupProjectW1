// getStocks()

function getStocks() {
    $.ajax({
        url: "http://localhost:4000/stocks",
        method: "get",
        success: function (data) {
            let dataShow = []
            for (let i = 0; i < data.length; i++) {
                if (data[i].changes[1] === '+') {
                    dataShow.push(data[i])
                }
            }
            for (let i = 0; i < data.length; i++) {
                if (data[i].changes[1] === '0') {
                    dataShow.push(data[i])
                }
            }
            for (let i = 0; i < data.length; i++) {
                if (data[i].changes[1] === '-') {
                    dataShow.push(data[i])
                }
            }
            dataShow.forEach((element) => {
                $("#stocks").append(`<div class="container">
                            <div class="content" style="width: 50%">
                                <h3>${element.name}</h3>
                                <div class="symbol">
                                    <span>${element.symbol}</span><br>
                                </div>
                                <div class="price">
                                    <span>Rp${element.price}</span><br>
                                </div>
                                <span style="color: ${element.changes[1] === '+' ? 'green' : element.changes[1] === '-' ? 'red' : 'black'} ">${element.changes}</span><br>
                            </div>
                            <div class="action" style="width: 50%">
                                <button>Buy</button>
                            <div>
                        </div>`)
            })
        }
    })
}

function register(){
    $('#name-register').val(),
    $('#username-register').val(),
    $('#email-register').val(),
    $('#password-register').val(),)
    event.preventDefault()
    $.ajax({
        url:'http://localhost:4000/users/register',
        method:'post',
        data:{
            name:$('#name-register').val(),
            username:$('#username-register').val(),
            email:$('#email-register').val(),
            password:$('#password-register').val(),
        },
        success:(data)=>{
            console.log('sukses menambah data', data)
            localStorage.setItem('token',token)
        },
        error:(err)=> console.log(err)
    })
}

function login(){
    event.preventDefault();
    $.ajax({
        url: 'http://localhost:4000/users/login',
        method: 'post',
        data: {
            'username': $('#username-login').val(),
            'password': $('#password-login').val()
        },
        success: (data) => {
            localStorage.setItem('token', data)
            getData()
            // $("#main-page").show()
            // $('#login-page').hide()
        },
        error:(err)=>{
            console.log(err)
        }
    });
}

function getOne(){
    $.ajax({
        url: 'http://localhost:4000/users/' + id,
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        success: (data) => {
            return data
        },
        error: (err) => console.log(err)
    })
}

function update(){
    let id = $('#rahasia').val()
    $.ajax({
        url: "http://localhost:4000/todos/" + id,
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: {
            "title": $('#edit-title').val(),
            "description": $('#edit-description').val(),
            "status": $('#edit-status').val(),
            "due_date": $('#edit-due_date').val()
        },
        success: (data) => {
            event.preventDefault()
            showMain()
        },
        error: (err) => {
            console.log(err)
        }

    })
}

function buy(){}

function showRegister(){
    $('#add-page').hide()
    $('#edit-page').hide()
    $('#login-page').hide()
    $('#register-page').show()
}
function showAdd(){
    $('#add-page').show()
    $('#edit-page').hide()
    $('#login-page').hide()
    $('#register-page').hide()
}
function showEdit(){
    $('#add-page').hide()
    $('#edit-page').show()
    $('#login-page').hide()
    $('#register-page').hide()
}
function showLogin(){
    $('#add-page').hide()
    $('#edit-page').hide()
    $('#login-page').show()
    $('#register-page').hide()
}


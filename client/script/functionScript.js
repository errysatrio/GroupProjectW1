// getStocks()

function getStocks() {
    $.ajax({
        url: "http://localhost:4000/stocks",
        method: "get",
        headers: {token: localStorage.token},
        success: function (data) {
            console.log(data)
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
                                <span style="color: ${element.changes[1] === '+' ? 'lightgreen' : element.changes[1] === '-' ? 'pink' : 'black'} ">${element.changes}</span><br>
                            </div>
                            <div class="action" style="width: 50%">
                                <button onclick="buy(${element.id}, 1)">Buy</button>
                            <div>
                        </div>`)
            })
        }
    })
}

function register(){
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
            localStorage.setItem('token', data.token)
        },
        error:(err)=> console.log(err)
    })
}

function login(){;
    $.ajax({
        url: 'http://localhost:4000/users/login',
        method: 'post',
        data: {
            'username': $('#username-login').val(),
            'password': $('#password-login').val()
        },
        success: (data) => {
            console.log(data)
            localStorage.setItem('token', data)
            $("#login-page").hide(200)
            $("#register-page").hide(200)
            getStocks()
            $("#stocks").show(450)
            $(".navbar").hide()
            $(".logout").show()
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

function buy(id, amount){
    console.log('masuk buy')
    $.ajax({
        url: 'http://localhost:4000/users/stocks',
        method: 'post',
        headers: {'token': localStorage.token},
        data: {
            id, amount
        },
        success: function(){
            getUserStocks()
        }
    })
}

function getUserStocks(){
    $("#userStocks .container").remove()
    $.ajax({
        url: "http://localhost:4000/users/stocks",
        method: "get",
        headers: {token: localStorage.token},
        success: function(data){
            console.log(data)
            data.forEach((element) =>{
                $("#userStocks").append(`
            <div class="container">
                <div class="content" style="width: 50%">
                    <h3>${element.Company.name}</h3>
                    <div class="amount">
                        <span>${element.amount}</span><br>
                    </div>
                </div>
                <div class="action">
                    <button onclick="deleteUserStock(${element.id})" style="float:right; background-color: red; color:red">Delete</button>
                </div>
            </div>`)
            })
            $("#userStocks").show(300)
        }
    })
}
function deleteUserStock(id){
    $.ajax({
        method:'delete',
        url: `http://localhost:4000/users/stocks/${id}`,
        headers: {token: localStorage.token},
        success: (data)=>{
            getUserStocks()
        }
    })
}

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


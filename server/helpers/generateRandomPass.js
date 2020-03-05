function generatePass(){
    let char='abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let pass = ''
    for(let i=0;i<10;i++){
        let random = Math.floor(Math.random()*62)
        pass += char[random]
    }
    return pass
}

module.exports = generatePass
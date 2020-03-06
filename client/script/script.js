getStocks()

function getStocks() {
    $.ajax({
        url: "http://localhost:3000/stocks",
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
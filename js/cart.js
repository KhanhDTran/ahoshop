const rowItem = document.getElementById('row-cart-item')
const cartTable = document.getElementById('cart-table')
const cartMess = document.getElementById('cart-mess')
const payment = document.getElementById('payment')
const paymentInfor = document.getElementById('payment-infor')

updateTotal()


let account = JSON.parse(localStorage.getItem('account'))
if (account === null ) {
    paymentInfor.innerHTML = `
    <h4>Đăng nhập để thanh toán</h4>
    `
} 
if (isLogined === "false" || isLogined === null) {
    payment.innerHTML = `
    <h4 class="text-center">Bạn cần đăng nhập để thanh toán đơn hàng</h4>
    <div class="d-grid gap-2 col-3 mx-auto">
         <button onclick="window.location.href='login.html'"
          type="button" class="btn btn-outline-success">
            Đăng nhập
         </button>
    </div>
    `
} else {
    if (account['address'] === "" || account['address'] === null) {
        paymentInfor.innerHTML = `
        <h3>Tài khoản của bạn chưa có địa chỉ giao hàng.</h2>
        <button onclick="window.location.href='account.html'"
        type="button" class="btn btn-outline-info">Nhập địa chỉ</button> 
      
        `
    } else {
        paymentInfor.innerHTML = `
            <p>Giao tới: <strong>${account['name']}</strong>, điện thoại <strong>${account['phone']}</strong> </p> 
            <p>Địa chỉ nhận hàng: <strong> ${account['address']}</strong></p>
          </div>
     
        `
    }
}

if (getTotalItems() > 0) {
    paymentInfor.innerHTML += `
    <div class="d-grid gap-2 col-4 mx-auto">
            <button  onclick="confirmPayment()"
            type="button" class="btn btn-outline-danger">Xác nhận thanh toán</button>`
}

let listItems = JSON.parse(localStorage.getItem('listItems'))
if (listItems !== null) {
    for (let i = 0; i < listItems.length; i++){
        price = formatvnd(listItems[i]['price'].toString())
        let itemTotal = formatvnd((listItems[i]['price'] * listItems[i]['quantity']).toString())
        rowItem.innerHTML += `
            <tr>
                <td>${listItems[i]['name']}</td>
                <td>${price}</td>
                <td>
                <i class="fa-solid fa-minus" id="minus"></i>
                <span > ${listItems[i].quantity}</span>
                 <i class="fa-solid fa-plus" id="plus"></i>
                 </td>
                <td style="text-align: right; ">${itemTotal}</td>
                <td><i class="fa-solid fa-trash-can" id="delete-item"></i></td>
            </tr>
        `
    }
} 


if (getTotalPrice() == 0) {
    cartMess.innerHTML ="Giỏ hàng của bạn đang rỗng, hãy chọn sản phẩm vào thềm vào giỏ"
}

let minusElements = document.querySelectorAll('#minus')
for (let i = 0; i < minusElements.length; i++) { 
    minusElements[i].addEventListener('click', () => {
        minusQuant(minusElements[i].parentElement.parentElement)
    })

}


let addElements = document.querySelectorAll('#plus')
for (let i = 0; i < addElements.length; i++) { 
    addElements[i].addEventListener('click', () => {
        addQuant(addElements[i].parentElement.parentElement)
    })

}

let deleteItemRows = document.querySelectorAll('#delete-item')
for (let i = 0; i < deleteItemRows.length; i++){
    deleteItemRows[i].addEventListener('click', () => {
        if (confirm("Bạn có chắc sẽ xóa sản phẩm này không?")) {
            deleteRow(deleteItemRows[i].parentElement.parentElement)
        }
    })
}


function confirmPayment() {
    if (confirm("Bạn có xác nhận thanh toán đơn hàng này ko?")) {
        let order = []
        let ordered = JSON.parse(localStorage.getItem('ordered'))
      
        if (ordered === null) {
            order.push(listItems)
        } else {
            order = ordered
            order.push(listItems)
        }
        listItems = []
        localStorage.setItem('listItems', JSON.stringify(listItems))
        localStorage.setItem('ordered', JSON.stringify(order))
        alert("Thanh toán đơn hàng thành công. Xin các ơn quý khách!")
        location.reload();
    }
}

function minusQuant(element) {
    let name = element.firstElementChild.innerHTML
    for (let i = 0; i < listItems.length; i++) { 
        if (listItems[i]['name'] === name) {
            if (listItems[i].quantity >  1) {
                listItems[i]['quantity'] -= 1
                element.children[2].children[1].innerHTML = listItems[i]['quantity']
                element.children[3].innerHTML = formatvnd((listItems[i]['quantity'] * listItems[i]['price']).toString()) 
            } 
        } 
    }
    localStorage.setItem('listItems', JSON.stringify(listItems))
    updateTotal()
}

function addQuant(element) {
    let name = element.firstElementChild.innerHTML
    for (let i = 0; i < listItems.length; i++) { 
        if (listItems[i]['name'] === name) {
            listItems[i]['quantity'] += 1
            element.children[2].children[1].innerHTML = listItems[i]['quantity']
            element.children[3].innerHTML = formatvnd((listItems[i]['quantity'] * listItems[i]['price']).toString()) 
        } 
    }
    localStorage.setItem('listItems', JSON.stringify(listItems))
    updateTotal()
}

function deleteRow(row) {
    let name = row.firstElementChild.innerHTML
    let x = []
    for (let i = 0; i < listItems.length; i++) { 
        if (listItems[i]['name'] !== name) {
            x.push(listItems[i])
        } 
    }
    localStorage.setItem('listItems', JSON.stringify(x))
    location.reload();
}

function getTotalPrice() {
    if (localStorage.getItem('listItems') !== null) {
        let listItems = JSON.parse(localStorage.getItem('listItems'))
        let totalPrice = 0
        for (let i = 0; i < listItems.length; i++) { 
            totalPrice += listItems[i]['quantity'] * listItems[i]['price']
        }   
        return formatvnd(totalPrice.toString())
    } else {
        return 0
    }
}

function formatvnd(money) {
    if (parseInt(money, 10) < 1000000) {
        money = money.slice(0, money.length-3) +  "." 
        + money.slice(money.length - 3, money.length) 
    }
    
    if (parseInt(money, 10) >= 1000000) {
        money = money.slice(0, money.length-6) +  "."
         +money.slice(money.length - 6, money.length - 3) + "."
        + money.slice(money.length - 3, money.length) 
    }
    return money
}

function updateTotal() {
    document.getElementById('totalPrice').innerHTML = getTotalPrice() + "đ"
    let totalItems = getTotalItems()
    document.getElementById('totalItems').innerHTML = totalItems
    cart.setAttribute('value', totalItems) 

}

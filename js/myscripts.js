let isLogined = localStorage.getItem('isLogined')
let login = document.getElementById('login-link')
let logout = document.getElementById('logout-action')
let accountElemnt = document.getElementById('account')
let cart = document.getElementById('cart-items')


cart.setAttribute('value', getTotalItems()) 

logout.addEventListener('click', () => {
    localStorage.setItem('isLogined', "false")
    location.reload();
})

if (isLogined === "true") {
    login.innerHTML = ""
}
else {
    login.innerHTML = "Đăng nhập"
    accountElemnt.innerHTML=""
}


function getTotalItems() {
    if (localStorage.getItem('listItems') !== null) {
        let listItems = JSON.parse(localStorage.getItem('listItems'))
        let totalItems = 0
        for (let i = 0; i < listItems.length; i++) { 
            totalItems += listItems[i]['quantity']
           
        }
        return totalItems
    } else {
        return 0
    }

}
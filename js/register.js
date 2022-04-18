const name = document.getElementById('name')
const email = document.getElementById('email')
const password = document.getElementById('password')
const repassword = document.getElementById('re-password')
const register = document.getElementById('register-form')
const errorElement = document.getElementById('error-message')

let account = localStorage.getItem('account')

if (account === null) {
    account = {"email": ""}
} else {
    account = JSON.parse(account)
}

register.addEventListener('submit', (e) => {
    
    let messages = []

    if (email.value === account['email']) {
        messages.push("Email này đã được đăng kí")
    }
    if (password.value.length <= 6) {
        messages.push("Mật khẩu phải dài hơn 6 kí tự")
    }
    if (password.value.length >= 20 ) {
        messages.push("Mật khẩu phải ít hơn 20 kí tự")
    }
    if (password.value !== repassword.value ) {
        messages.push("Mật khẩu không khớp")
    }
    if (messages.length > 0) {
        e.preventDefault()
        errorElement.innerText = messages[0]     
    }
    if (messages.length == 0) {
        let account = {
            "name": name.value,
            "email": email.value,
            "password": password.value,
            "birth": "",
            "phone": "",
            "address": "",
            "city": "",
        }
        localStorage.setItem("account", JSON.stringify(account))
        alert("Tạo tài khoản thành công")
    }
})



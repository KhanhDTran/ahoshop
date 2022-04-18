const email = document.getElementById('email')
const password = document.getElementById('password')
const login = document.getElementById('login-form')
const errorElement = document.getElementById('error-message')

let account = localStorage.getItem('account')

if (account === null) {
    account = {"email": ""}
} else {
    account = JSON.parse(account)
}

login.addEventListener('submit', (e) => {
    let messages = []
    if (email.value !== account.email ||
        password.value !== account.password) {
        messages.push("Email hoặc mật khẩu không đúng")
    }
    if (messages.length > 0) {
        e.preventDefault()
        errorElement.innerText = messages[0]     
    }
    localStorage.setItem('isLogined', "true")
})
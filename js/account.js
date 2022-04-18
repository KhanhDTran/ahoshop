let inputName = document.getElementById('inputName')
let inputBirth = document.getElementById('inputBirth')
let inputPhone = document.getElementById('inputPhone')
let inputEmail = document.getElementById('inputEmail')
let inputAddress = document.getElementById('inputAddress')
let inputCity = document.getElementById('inputCity')
const mainAccount = document.getElementById('main-account')
let account = JSON.parse(localStorage.getItem('account'))


if (isLogined === "false") {
    mainAccount.innerHTML = `<h1 class=text-center> Xin hãy đăng nhập để xem thông tin</h1>`
}

passInfor()

function passInfor() {
    
    inputName.setAttribute('value',  account['name']) 
    inputEmail.setAttribute('value',  account['email'])
    inputBirth.setAttribute('value',  account['birth']) 
    if (account['phone'] !== "") {
        inputPhone.setAttribute('value',  account['phone'])
    }
    inputAddress.setAttribute('value',  account['address'])
    inputCity.setAttribute('value', account['city'])       

}

function saveInfor() {
   
   
    account['name'] = inputName.value
    account['email'] = inputEmail.value
    account['birth'] = inputBirth.value
    account['phone'] = inputPhone.value
    account['address'] = inputAddress.value
    account['city'] = inputCity.value
    localStorage.setItem('account', JSON.stringify(account))
    alert("Lưu thông tin thành công")
}
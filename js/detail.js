
let detail = localStorage.getItem('detail-product')
detail = JSON.parse(detail)
const productImg = document.getElementById('product-img').src = detail['image']
const productName = document.getElementById('product-name').innerHTML =  detail['name']
const productCategory = document.getElementById('product-category').innerHTML =detail['category']
const productPrice = document.getElementById('product-price').innerHTML = detail['price']
const addButton = document.getElementById('add-button')
let quant = document.getElementById('number')

let price = detail['price'].replace('.', '')
price = price.replace('.', '')
price = parseInt( price.replace('đ', ''), 10)

addButton.addEventListener('click', () => {
    addItemToList()
    cart.setAttribute('value', getTotalItems()) 
    
})

function addItemToList() {
    let item = {
        "name": productName,
        "category": productCategory,
        "price": price,
        "image": productImg,
        "quantity": 1
    }
    let listItems = JSON.parse(localStorage.getItem('listItems'))
    if (listItems === null) {
        listItems = []
    }
  
    if (listItems.length != 0) {
        for (let i = 0; i < listItems.length; i++){
            if (productName === listItems[i]['name']) {
                listItems[i]['quantity'] = parseInt(listItems[i]['quantity'], 10) + 1
                break
            } else {
                if (i == listItems.length - 1) {
                    item['quantity'] = 0
                    listItems.push(item)
                }
            }
        }
    } else {
        listItems.push(item)
    }
    
    localStorage.setItem('listItems', JSON.stringify(listItems))
   
}

const relatedRow = document.getElementById('related-row')
const otherRow = document.getElementById('other-row')
let relatedCards = localStorage.getItem('relatedCards')
relatedCards = JSON.parse(relatedCards)
let otherCards = localStorage.getItem('otherCards')
otherCards = JSON.parse(otherCards)

for (let i = 0; i <= 7; i++) { 
    let card = relatedCards[i]

    if (card !== undefined) {
        relatedRow.innerHTML += `
        <div class="col">
            <div class="card" id="product-card" >
                <img src="${card['image']}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-name">${card['name']}</h5>
                <p class="card-category">${card['category']}</p>
                <p class="card-price">${card['price']}</p>
                </div>
            </div>
        </div>
        `
    }
}
if (otherCards.length == 0) {
    document.getElementById('other-title').innerHTML=""
}

for (let i = 0; i <= 7; i++) { 
    let otherCard = otherCards[i]
    if (otherCard !== undefined) {
        otherRow.innerHTML += `
        <div class="col">
            <div class="card" id="product-card" >
                <img src="${otherCard['image']}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-name">${otherCard['name']}</h5>
                <p class="card-category">${otherCard['category']}</p>
                <p class="card-price">${otherCard['price']}</p>
                </div>
            </div>
        </div>
        `
    }
}



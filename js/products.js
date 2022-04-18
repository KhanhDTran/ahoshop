let cards = document.querySelectorAll('#product-card')
let relatedCategory = ""

for (let i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', () => {
        let image = cards[i].firstElementChild
        let card_body = cards[i].lastElementChild
        let details = card_body.children
        let detailProduct = {
            "name": details[0].innerHTML,
            "category": details[1].innerHTML,
            "price": details[2].innerHTML,
            "image": image.getAttribute("src")
        }
        relatedCategory = details[1].innerHTML
        setCards(relatedCategory)
        localStorage.setItem('detail-product', JSON.stringify(detailProduct))
        window.location.href = 'detail.html'
    })
}

function setCards(relatedCategory) {
    let relatedCards = []
    let otherCards = []
    for (let i = 0; i < cards.length; i++) { 
        if (cards[i].lastElementChild.children[1].innerHTML === relatedCategory) {
            let card = {
                "name": cards[i].lastElementChild.children[0].innerHTML,
                "category": cards[i].lastElementChild.children[1].innerHTML,
                "price": cards[i].lastElementChild.children[2].innerHTML,
                "image":  cards[i].firstElementChild.getAttribute("src")
            }
            relatedCards.push(card)
        }
        else {
            let card = {
                "name": cards[i].lastElementChild.children[0].innerHTML,
                "category": cards[i].lastElementChild.children[1].innerHTML,
                "price": cards[i].lastElementChild.children[2].innerHTML,
                "image":  cards[i].firstElementChild.getAttribute("src")
            }
            otherCards.push(card)
        }
    }
    localStorage.setItem('relatedCards', JSON.stringify(relatedCards))
    localStorage.setItem('otherCards', JSON.stringify(otherCards))

}


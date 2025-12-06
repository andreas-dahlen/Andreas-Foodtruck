import { cart } from "./saveAndApi/saveAndAppend.js"

function domCart(itemId) {
    const item = cart.orderList.find(i => i.id === itemId)
    if (!item) return

    // Define type containers
    const containerMap = {
        wonton: document.querySelector('.cart-wonton-dom'),
        dip: document.querySelector('.cart-dip-dom'),
        drink: document.querySelector('.cart-drink-dom')
    }
    const container = containerMap[item.type]
    if (!container) return

    // Check if the item is already in the DOM
    let evaluate = container.querySelector(`.cart-boxes[data-id="${itemId}"]`)
    if (evaluate) {
        evaluate.querySelector('.amount-of-type').textContent = `${item.quantity} Stycken`
        return
    }

    // Create cart box
    const cartBox = document.createElement('div')
    cartBox.classList.add('cart-boxes')
    cartBox.dataset.id = item.id

    const title = document.createElement('div')
    title.classList.add('cart-title-style')

    const name = document.createElement('h2')
    name.textContent = item.name.toUpperCase()

    const span = document.createElement('span')
    span.classList.add('dots')

    const price = document.createElement('h2')
    price.textContent = item.price + ' SEK'

    title.append(name, span, price)

    const moreOrLess = document.createElement('div')
    moreOrLess.classList.add('more-or-less')

    const more = document.createElement('button')
    more.classList.add('more-button')

    const p = document.createElement('p')
    p.classList.add('amount-of-type')
    p.textContent = `${item.quantity} Stycken`

    const less = document.createElement('button')
    less.classList.add('less-button')

    moreOrLess.append(more, p, less)
    cartBox.append(title, moreOrLess)

    container.appendChild(cartBox)
}

export { domCart }
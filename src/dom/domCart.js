import { appState } from "../state/appState.js"
import { errorMessage } from "../state/errorMessage.js"

/** !CART! Puts an item in the DOM tree*/
function generateCartDom(item) {

    const containerMap = {
        wonton: document.querySelector('.cart-wonton-dom'),
        dip: document.querySelector('.cart-dip-dom'),
        drink: document.querySelector('.cart-drink-dom')
    }
    const container = containerMap[item.type]
    if (!container) {
        errorMessage('itemNotFound')
        return
    }

    const cartBox = document.createElement('div')
    cartBox.classList.add('cart-boxes')
    cartBox.dataset.id = item.id

    const title = document.createElement('div')
    title.classList.add('cart-title-style')

    const name = document.createElement('h2')
    let displayName = item.name.toUpperCase()
    name.textContent = displayName

    const span = document.createElement('span')
    span.classList.add('dots')

    const price = document.createElement('h2')
    price.classList.add('item-price')
    price.textContent = `${item.price * item.quantity} SEK`

    title.append(name, span, price)

    const controls = document.createElement('div')
    controls.classList.add('more-less-remove')

    const moreOrLess = document.createElement('div')
    moreOrLess.classList.add('more-or-less')

    const more = document.createElement('button')
    more.classList.add('more-button')
    more.textContent = '+'
    more.dataset.id = item.id

    const quantity = document.createElement('p')
    quantity.classList.add('amount-of-type')
    quantity.textContent = `${item.quantity} styck`

    const less = document.createElement('button')
    less.classList.add('less-button')
    less.textContent = '-'
    less.dataset.id = item.id

    moreOrLess.append(more, quantity, less)

    const removeCartButton = document.createElement('button')
    removeCartButton.classList.add('remove-cart-button')
    removeCartButton.dataset.id = item.id
    
    const image = document.createElement('img')
    image.src ='./assets/images/trash.svg'
    image.alt ='trashcan'
    removeCartButton.appendChild(image)

    controls.append(moreOrLess, removeCartButton)
    cartBox.append(title, controls)
    container.appendChild(cartBox)
}

/** !CART! Removes an entier item from the DOM tree */
function removeCartItemDom(itemId) {

    const placement = document.querySelector(`.cart-boxes[data-id="${itemId}"]`)
    if (placement) {
        placement.remove()
        syncCartDom()
    }
}

/** !CART! Removes ALL items from the DOM tree */
function resetCartDom() {
    document.querySelectorAll('.cart-boxes').forEach(box => box.remove())
    syncCartDom()
}

/** !CART! Updates cart DOM: Price, qunatity total */
function syncCartDom(item) {
    const costTotal = document.querySelector('.cost-cart')
    costTotal.textContent = `${appState.orderInfo.totalPrice} SEK`
    
    if (!item) return
    
    const placement = document.querySelector(`.cart-boxes[data-id="${item.id}"]`)
    if (!placement) {
        errorMessage('default')   
        return
    }
    const quantity = placement.querySelector('.amount-of-type')
    if (item.quantity === 1) {quantity.textContent = `${item.quantity} styck`}
    else {quantity.textContent = `${item.quantity} stycken`}
    
    const totalPriceOfType = placement.querySelector('.item-price')
    totalPriceOfType.textContent = `${item.quantity * item.price} SEK`
}

/** !CART! Main entry point for cart DOM */
function updateCartDom(itemId) {
    const item = appState.orderList.find(i => i.id === itemId)
    
    if (!item) {
        const placement = document.querySelector(`.cart-boxes[data-id="${itemId}"]`)
        if (placement) placement.remove()
        syncCartDom()
        return
    }
    const placement = document.querySelector(`.cart-boxes[data-id="${item.id}"]`)
    if (!placement) {
        generateCartDom(item)
    }
    syncCartDom(item)
}
export {
    updateCartDom,
    resetCartDom,
    removeCartItemDom
}
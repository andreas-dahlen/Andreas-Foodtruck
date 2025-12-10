import { appState } from "../state/appState.js"

/** !CART! Puts an item in the DOM tree*/
function generateCartDom(itemId) {
    const item = appState.orderList.find(i => i.id === itemId)
    if (!item) return
    
    const containerMap = {
        wonton: document.querySelector('.cart-wonton-dom'),
        dip: document.querySelector('.cart-dip-dom'),
        drink: document.querySelector('.cart-drink-dom')
    }
    const container = containerMap[item.type]
    if (!container) return
    
    let evaluate = container.querySelector(`.cart-boxes[data-id="${itemId}"]`)
    if (evaluate) {
        evaluate.querySelector('.amount-of-type').textContent = `${item.quantity} Stycken`
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
    price.textContent = item.price + ' SEK'
    
    title.append(name, span, price)
    
    const moreOrLessOrRemove = document.createElement('div')
    moreOrLessOrRemove.classList.add('more-less-remove')
    
    const moreOrLess = document.createElement('div')
    moreOrLess.classList.add('more-or-less')
    
    const more = document.createElement('button')
    more.classList.add('more-button')
    more.textContent = '+'
    more.dataset.id = item.id
    
    const p = document.createElement('p')
    p.classList.add('amount-of-type')
    p.textContent = `${item.quantity} Stycken`
    
    const less = document.createElement('button')
    less.classList.add('less-button')
    less.textContent = '-'
    less.dataset.id = item.id
    
    moreOrLess.append(more, p, less)
    
    const removeCartButton = document.createElement('button')
    removeCartButton.classList.add('remove-cart-button')
    removeCartButton.dataset.id = item.id
    removeCartButton.textContent = 'X'
    
    moreOrLessOrRemove.append(moreOrLess, removeCartButton)
    cartBox.append(title, moreOrLessOrRemove)
    container.appendChild(cartBox)
}

/** !CART! Reduces the quantity of an item by one, in the DOM tree */
function decreaseCartItemDom (itemId) {
    const item = appState.orderList.find(i => i.id === itemId)
    
    const placement = document.querySelector(`.cart-boxes[data-id="${itemId}"]`)
    if (!placement) return
    
    if (!item) {
        placement.remove()
        return
    }
    
    const quantity = placement.querySelector(`.amount-of-type`)
    quantity.textContent = `${item.quantity} Stycken`
}

/** !CART! Removes an entier item from the DOM tree */
function removeCartItemDom (itemId) {
    
    const placement = document.querySelector(`.cart-boxes[data-id="${itemId}"]`)
    if (!placement) return
    placement.remove()
}

/** !CART! Removes ALL items from the DOM tree */
function resetCartDom() {
    const placement = document.querySelectorAll('.cart-boxes')
    if (!placement) return
    placement.forEach(box => box.remove())
}

/** !CART! updates the total price in the DOM tree */
function updateTotalPriceCartDom() {
    const costElement = document.querySelector('.cost-cart')
    costElement.textContent = `${appState.orderInfo.totalPrice} SEK`
}

export { 
    generateCartDom, 
    updateTotalPriceCartDom, 
    resetCartDom, 
    decreaseCartItemDom, 
    removeCartItemDom }
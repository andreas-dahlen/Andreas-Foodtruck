import { cart } from "../logic/state.js"

function generateCartDom(itemId) {
    const item = cart.orderList.find(i => i.id === itemId)
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

function updatePriceDom() {
    const costElement = document.querySelectorAll('.cost')
    costElement.forEach(element => {
        element.textContent = `${cart.orderInfo.totalPrice} SEK`
    })
}

function decreaseCartItemDom (itemId) {
    const item = cart.orderList.find(i => i.id === itemId)
    
    const placement = document.querySelector(`.cart-boxes[data-id="${itemId}"]`)
    if (!placement) return
    
    if (!item) {
        placement.remove()
        return
    }
    
    const quantity = placement.querySelector(`.amount-of-type`)
    quantity.textContent = `${item.quantity} Stycken`
}

function removeCartItemTypeDom (itemId) {
    // const item = cart.orderList.find(i => i.id === itemId)
    
    const placement = document.querySelector(`.cart-boxes[data-id="${itemId}"]`)
    if (!placement) return
    placement.remove()
}

function resetCartDom() {
    const placement = document.querySelectorAll('.cart-boxes')
    placement.forEach(box => box.remove())
}



export { generateCartDom, updatePriceDom, resetCartDom, decreaseCartItemDom, removeCartItemTypeDom }
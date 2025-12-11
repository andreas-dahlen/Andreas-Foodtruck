import { appState } from "../state/appState"

function generateReceiptItemDom(itemId) {
    const item = appState.receiptInfo.items.find(i => i.id === itemId)
    if (!item) return

    const containerMap = {
        wonton: document.querySelector('.receipt-wonton-dom'),
        dip: document.querySelector('.receipt-dip-dom'),
        drink: document.querySelector('.receipt-drink-dom')
    }
    const container = containerMap[item.type]
    if (!container) return

    let receiptItemDom = container.querySelector(`.receipt-boxes[data-id="${itemId}"]`)
    if (receiptItemDom) {
    
        if (item.quantity === 1) {
            receiptItemDom.querySelector('.receipt-amount-of-type').textContent = `${item.quantity} Styck`
            
        } else {
            receiptItemDom.querySelector('.receipt-amount-of-type').textContent = `${item.quantity} Stycken`
        } return
    }

    const receiptBox = document.createElement('div')
    receiptBox.classList.add('receipt-boxes')
    receiptBox.dataset.id = item.id

    const title = document.createElement('div')
    title.classList.add('receipt-title-style')

    const name = document.createElement('h2')
    let displayName = item.name.toUpeerCase()
    name.textContent = displayName

    const span = document.createElement('span')
    span.classList.add('dots')

    const price =document.createElement('h2')
    price.textContent = item.price + ' SEK'

    title.append(name, span, price)

    const quantity = document.createElement('p')
    p.classList.add('amount-of-type')
    p.textContent = `${item.quantity} Styck`

}

function generateReceiptDom() {
    return
}

// const cartBox = document.createElement('div')
//     cartBox.classList.add('cart-boxes')
//     cartBox.dataset.id = item.id

//     const title = document.createElement('div')
//     title.classList.add('cart-title-style')

//     const name = document.createElement('h2')
//     let displayName = item.name.toUpperCase()
//     name.textContent = displayName

//     const span = document.createElement('span')
//     span.classList.add('dots')

//     const price = document.createElement('h2')
//     price.textContent = item.price + ' SEK'

//     title.append(name, span, price)

//     const moreOrLessOrRemove = document.createElement('div')
//     moreOrLessOrRemove.classList.add('more-less-remove')

//     const moreOrLess = document.createElement('div')
//     moreOrLess.classList.add('more-or-less')

//     const more = document.createElement('button')
//     more.classList.add('more-button')
//     more.textContent = '+'
//     more.dataset.id = item.id

//     const p = document.createElement('p')
//     p.classList.add('amount-of-type')
//     p.textContent = `${item.quantity} Styck`

//     const less = document.createElement('button')
//     less.classList.add('less-button')
//     less.textContent = '-'
//     less.dataset.id = item.id

//     moreOrLess.append(more, p, less)

//     const removeCartButton = document.createElement('button')
//     removeCartButton.classList.add('remove-cart-button')
//     removeCartButton.dataset.id = item.id
//     removeCartButton.textContent = 'X'

//     moreOrLessOrRemove.append(moreOrLess, removeCartButton)
//     cartBox.append(title, moreOrLessOrRemove)
//     container.appendChild(cartBox)
// }
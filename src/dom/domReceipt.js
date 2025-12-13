import { appState } from "../state/appState.js"
import { errorMessage } from "../state/errorMessage.js"

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

    const receiptBox = document.createElement('div')
    receiptBox.classList.add('receipt-boxes')
    receiptBox.dataset.id = item.id

    const title = document.createElement('div')
    title.classList.add('receipt-title-style')

    const name = document.createElement('h2')
    let displayName = item.name.toUpperCase()
    name.textContent = displayName

    const span = document.createElement('span')
    span.classList.add('dots')

    const price = document.createElement('h2')
    price.textContent = item.price + ' SEK'

    title.append(name, span, price)

    const quantity = document.createElement('p')
    quantity.classList.add('receipt-amount-of-type')

    if (item.quantity === 1) {
        quantity.textContent = `${item.quantity} styck`
    } else {
        quantity.textContent = `${item.quantity} stycken`
    }

    receiptBox.append(title, quantity)
    container.appendChild(receiptBox)

}

function updateReceiptDom() {

    const items = appState.receiptInfo.items

    if (!items || items.length === 0) {
        errorMessage('menuOrReceiptEmpty')
        return
    }
    items.forEach(item => generateReceiptItemDom(item.id))
}

function resetReceiptDom() {
    document.querySelectorAll('.receipt-boxes').forEach(box => box.remove())
}
export { updateReceiptDom, resetReceiptDom}
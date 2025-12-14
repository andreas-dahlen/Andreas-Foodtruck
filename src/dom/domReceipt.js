import { appState } from "../state/appState.js"
import { errorMessage } from "../state/errorMessage.js"

/** !RECEIPT! Puts an item in the DOM tree*/
function generateReceiptItemDom(itemId) {
    const item = appState.receiptInfo.items.find(i => i.id === itemId)
    if (!item) return

    const containerMap = {
        wonton: document.querySelector('.receipt-wonton-dom'),
        dip: document.querySelector('.receipt-dip-dom'),
        drink: document.querySelector('.receipt-drink-dom')
    }

    const container = containerMap[item.type]
    if (!container) {
        errorMessage('itemNotFound')
        return
    }

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
    price.classList.add('receipt-item-price')
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

/** !RECEIPT! Removes ALL items from the DOM tree */
function resetReceiptDom() {
    document.querySelectorAll('.receipt-boxes').forEach(box => box.remove())
}

/** !RECEIPT! Main entry point for receipt DOM */
function updateReceiptDom() {

    const orderNumber = document.querySelector('.receipt-header > p')
    orderNumber.textContent = `#${appState.receiptInfo.receiptId}`

    const totalReceipt = document.querySelector('.cost-receipt')
    totalReceipt.textContent = `${appState.receiptInfo.orderValue} SEK`

    const items = appState.receiptInfo.items

    if (!items || items.length === 0) {
        errorMessage('menuOrReceiptEmpty')
        return
    }
    items.forEach(item => generateReceiptItemDom(item.id))
}

export { updateReceiptDom, resetReceiptDom}
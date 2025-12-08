import { showErrorMessage } from "../displayLogic.js"
import { cart } from "./saveAndAppend.js"

const api = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/'

async function sendOrder() {
    try {
        // if (!cart.orderList.length) return console.warn('Cart is empty!')

        const apiOrderList = cart.orderList.flatMap(item => Array(item.quantity).fill(item.id))

        const response = await fetch(`${api}/${cart.tenantName}/orders`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'x-zocom': cart.key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: apiOrderList
            })
        })
        const data = await response.json()
        cart.orderId = data.order.id
        cart.timestamp = data.order.timestamp
        cart.eta = data.order.eta
        console.log(data)
        //TODO: remove console log
    } catch (error) {
        console.error('ordering error: ', error.message)
        showErrorMessage('order')
    }
}

async function getReceipt() {
    try {
        const response = await fetch(`${api}/receipts/${cart.orderId}`, {
            headers: {
                'accept': 'application/json',
                'x-zocom': cart.key,
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error('receipt error: ', error.message)
        showErrorMessage('receipt')
    }
}

export { sendOrder, getReceipt }
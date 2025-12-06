import { cart } from "./saveAndAppend.js"

const api = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/'

async function sendOrder() {
    try {
        if (!cart.orderList.length) return console.warn('Cart is empty!')

        const apiOrderList = cart.orderList.flatMap(item => Array(item.quantity).fill(item.id))

        console.log(apiOrderList)
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
        console.log('order success! current object looks like this now: ', cart)
        cart.orderId = data.order.id
        cart.timestamp = data.order.timestamp
        cart.eta = data.order.eta
    } catch (error) {
        console.error('ordering error: ', error.message)
    }
}

export { sendOrder }
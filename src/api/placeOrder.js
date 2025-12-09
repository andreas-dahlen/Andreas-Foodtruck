import { showErrorMessage } from "../logic/errorLogic.js"
import { cart } from "../logic/state.js"

async function sendOrder() {
    try {
        // if (!cart.orderList.length) return console.warn('Cart is empty!')

        const apiOrderList = cart.orderList.flatMap(item => Array(item.quantity).fill(item.id))

        const response = await fetch(`${cart.api}/${cart.tenantName}/orders`, {
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

export { sendOrder }
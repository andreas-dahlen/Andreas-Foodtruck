import { cart } from '../logic/state.js'

async function getReceipt() {
    try {
        const response = await fetch(`${cart.api}/receipts/${cart.orderId}`, {
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

export { getReceipt }
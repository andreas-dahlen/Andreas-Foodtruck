import { appState } from '../state/appState.js'
import { errorMessage } from '../state/errorMessage.js'

async function getReceipt() {
    try {
        const response = await fetch(`${appState.api}receipts/${appState.orderInfo.orderId}`, {
            headers: {
                'accept': 'application/json',
                'x-zocom': appState.key,
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        appState.receiptInfo.receiptId = data.receipt.id
        appState.receiptInfo.items = data.receipt.items
        appState.receiptInfo.orderValue = data.receipt.orderValue

    } catch (error) {
        console.error('receipt error: ', error.message)
        errorMessage('receipt')
    }
}

export { getReceipt }
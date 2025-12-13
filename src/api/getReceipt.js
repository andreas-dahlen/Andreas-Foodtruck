import { appState } from '../state/appState.js'

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

        console.log(appState)
        //TODO remove console.log

    } catch (error) {
        console.error('receipt error: ', error.message)
        showErrorMessage('receipt')
    }
}

export { getReceipt }
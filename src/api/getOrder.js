import { showErrorMessage } from "../state/errorMessage.js"
import { appState } from "../state/appState.js"

async function getOrder() {
    try {
        // if (!appState.orderList.length) return console.warn('appState is empty!') don't think i need this tbf

        //TODO: analyze this... flatMap or should i just use a list of objects...
        const apiOrderList = appState.orderList.flatMap(item => Array(item.quantity).fill(item.id))

        const response = await fetch(`${appState.api}${appState.tenantName}/orders`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'x-zocom': appState.key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: apiOrderList
            })
        })

        const data = await response.json()
        appState.orderInfo.orderId = data.order.id
        appState.orderInfo.timestamp = data.order.timestamp
        appState.orderInfo.eta = data.order.eta
        console.log(data)
        //TODO: remove console log
    } catch (error) {
        console.error('ordering error: ', error.message)
        showErrorMessage('order')
    }
}

export { getOrder }
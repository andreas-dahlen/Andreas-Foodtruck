import { errorMessage } from "../state/errorMessage.js"
import { appState } from "../state/appState.js"

async function getOrder() {
    try {
        const apiOrderList = [];
        appState.orderList.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
                apiOrderList.push(item.id);
            }
        });

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

    } catch (error) {
        console.error('ordering error: ', error.message)
        errorMessage('order')
    }
}

export { getOrder }
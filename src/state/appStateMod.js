import { appState } from "./appState.js"
import { errorMessage } from "./errorMessage.js"


/** !STATE! resets order and receipt information */
function resetAppState() {
  appState.orderList = [];

  appState.orderInfo = {
    orderId: '',
    timestamp: '',
    eta: '',
    totalPrice: ''
  };

  appState.receiptInfo = {
    orderId: '',
    items: []
  };
}

/** !STATE! adds an item to the order list */
function addItemToOrderList(itemId) {
    let item = ''
    Object.values(appState.menuItems).forEach(category => {
        const found = category.find(i => i.id === itemId)
        if (found) item = found
    })
    if (!item) {
        console.warn('Item not found:', itemId)
        errorMessage('itemNotFound')
        return
    }

    const existing = appState.orderList.find(i => i.id === itemId)
    if (existing) {
        existing.quantity += 1
    } else {
        appState.orderList.push({
            id: item.id,
            type: item.type,
            name: item.name,
            price: item.price,
            quantity: 1
        })
    }
    appState.orderInfo.totalPrice = appState.orderList.reduce((sum, i) => sum + i.price * i.quantity, 0)
}

/** !STATE! removes singular item quantity from order list*/
function reduceOrderItemQuantity(itemId) {
    const item = appState.orderList.find(i => i.id === itemId)
    if (!item) return
    item.quantity--
    if (item.quantity <= 0) {
        appState.orderList = appState.orderList.filter(i => i.id !== itemId)
    }
    appState.orderInfo.totalPrice = appState.orderList.reduce((sum, i) => sum + (i.price * i.quantity), 0)
}

/** !STATE! removes entier item type from order list*/
function removeItemFromOrderList(itemId) {
    appState.orderList = appState.orderList.filter(i => i.id !== itemId)

    appState.orderInfo.totalPrice = appState.orderList.reduce(
        (sum, i) => sum + (i.price * i.quantity), 
        0
    )
}

export {resetAppState, addItemToOrderList, reduceOrderItemQuantity, removeItemFromOrderList }
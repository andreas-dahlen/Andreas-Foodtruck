import { showErrorMessage } from "../displayLogic.js"

const cart = {
    key: '',
    tenantID: '',
    tenantName: '',
    menuItems: {},
    orderList: [],
    orderId: '',
    timestamp: '',
    eta: '',
    totalPrice: ''
}

function addItemToCart(itemId) {
    let item = ''
    Object.values(cart.menuItems).forEach(category => {
        const found = category.find(i => i.id === itemId)
        if (found) item = found
    })
    if (!item) {
        console.warn('Item not found:', itemId)
        showErrorMessage('itemNotFound')
        return
    }

    const existing = cart.orderList.find(i => i.id === itemId)
    if (existing) {
        existing.quantity += 1
    } else {
        cart.orderList.push({
            id: item.id,
            type: item.type,
            name: item.name,
            price: item.price,
            quantity: 1
        })
    }
    cart.totalPrice = cart.orderList.reduce((sum, i) => sum + i.price * i.quantity, 0)
}

function removeItemFromCart(itemId) {
    const item = cart.orderList.find(i => i.id === itemId)
    if (!item) return
    item.quantity--
    if (item.quantity <= 0) {
        cart.orderList = cart.orderList.filter(i => i.id !== itemId)
    }
    cart.totalPrice = cart.orderList.reduce((sum, i) => sum + (i.price * i.quantity), 0)
}

function removeWholeItemFromCart(itemId) {
    cart.orderList = cart.orderList.filter(i => i.id !== itemId)

    cart.totalPrice = cart.orderList.reduce(
        (sum, i) => sum + (i.price * i.quantity), 
        0
    )
}

export { cart, addItemToCart, removeItemFromCart, removeWholeItemFromCart }
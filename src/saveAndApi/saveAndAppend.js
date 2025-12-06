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

// const cart = {
    // key: '',            // API key
    // tenantID: '',       // tenant info
    // tenantName: '',     // tenant info
    // menuItems: [],      // array of full items user added {id, name, price}
    // orderList: [],      // array of item IDs (for API)
    // orderId: '',        // returned after POST
    // timestamp: '',      // when order was sent
    // eta: '',            // estimated time from API
    // cartPrice: 0        // sum of item prices
// }

function addItemToCart(itemId) {
    let item = ''
    Object.values(cart.menuItems).forEach(category => {
        const found = category.find(i => i.id === itemId)
        if (found) item = found
    })
    if (!item) return console.warn('Item not found:', itemId)

    const existing = cart.orderList.find(i => i.id === itemId)
    if (existing) {
        existing.quantity += 1
    } else {
        cart.orderList.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        })
    }

    cart.totalPrice = cart.orderList.reduce((sum, i) => sum + i.price * i.quantity, 0)
}

export { cart, addItemToCart }
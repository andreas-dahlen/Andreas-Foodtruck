const cart = {
    api: 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/',
    key: '',
    tenantID: '',
    tenantName: '',
    menuItems: {},
    orderList: [],
    orderId: '',
    timestamp: '',
    eta: '',
    totalPrice: '',

    //this should replace orderId, timestamp, eta and totalPrice
    orderInfo: {},
    receiptInfo: {
        orderId: '',
        items: []
    }
}

//TODO: could create a saveorderId but probably not

export { cart }
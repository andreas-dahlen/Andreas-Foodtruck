const appState = {
    api: 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/',
    key: '',
    tenantID: '',
    tenantName: '',
    menuItems: {},
    orderList: [],
    orderInfo: {
        orderId: '',
        timestamp: '',
        eta: '',
        totalPrice: 0
        },
    receiptInfo: {
        receiptId: '',
        items: [],
        orderValue: ''
    }
}

export { appState }
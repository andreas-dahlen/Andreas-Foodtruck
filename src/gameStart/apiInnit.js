import { cart } from "../saveFile.js";

const api = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/'

async function getApiKey() {
    try {
        const response = await fetch(`${api}/keys`, {
            method: 'POST',
        });
        const data = await response.json()
        cart.key = data.key
        
    } catch (error) {
        console.error('no key found', error.message)
    }
}

async function getApiTenant() {
    try {
        const response = await fetch(`${api}/tenants`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'x-zocom': cart.key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `test-${Date.now()}`
            })
        })
        const data = await response.json()
        cart.tenantName = data.name
        cart.tenantID = data.id
    } catch (error) {
        console.error('tenant error: ', error.message)
    }
}

async function getApiMenuItems() {
    try {
        const response = await fetch(`${api}/menu`, {
            headers: {
                'x-zocom': cart.key,
                'accept': 'application/json'
            }
        })

        const data = await response.json()
        menuSort(data.items)
    } catch (error) {
        console.error('failed to catch menu items:', error.message)
    }
}

function menuSort(data) {
    cart.wontons = data.filter(item => item.type === "wonton")
    cart.drinks = data.filter(item => item.type === "drink")
    cart.dips = data.filter(item => item.type === "dip")
}

async function initApi() {
    try {
        await getApiKey();
        await getApiMenuItems()
        await getApiTenant();

    } catch (error) {
        console.error('API initialization failed', error.message)
    }
}

export { initApi }
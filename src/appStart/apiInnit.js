import { showErrorMessage } from "../displayLogic.js";
import { cart } from "../saveAndApi/saveAndAppend.js";

const api = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/'

async function getApiKey() {
    try {
        const response = await fetch(`${api}/keys`, {
            method: 'POST',
        });
        const data = await response.json()
        cart.key = data.key
    } catch (error) {
        showErrorMessage('key')
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
        showErrorMessage('tenant')
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
        showErrorMessage('menu')
        console.error('failed to catch menu items:', error.message)
    }
}

function cleanItemName(item) {
    // fix specific names
    if (item.name === 'Sweet n Sour') item.name = 'Sweet & Sour';
    if (item.name === 'Wonton Standard') item.name = 'Wonton Std';
    return item;
}

function menuSort(data) {

    cart.menuItems = {
        wontons: data.filter(item => item.type === "wonton"),
        dips: data.filter(item => item.type === "dip").map(cleanItemName),
        drinks: data.filter(item => item.type === "drink").map(cleanItemName)
    }

    const dipOrder = [6, 9, 7, 10, 11, 8];
    cart.menuItems.dips.sort((a, b) => {
            const aIndex = dipOrder.indexOf(a.id);
            const bIndex = dipOrder.indexOf(b.id);
            return (aIndex === -1 ? Infinity : aIndex) - (bIndex === -1 ? Infinity : bIndex);
        });

    const drinkOrder = [13, 14, 15, 12, 17, 16];
    cart.menuItems.drinks.sort((a, b) => {
            const aIndex = drinkOrder.indexOf(a.id);
            const bIndex = drinkOrder.indexOf(b.id);
            return (aIndex === -1 ? Infinity : aIndex) - (bIndex === -1 ? Infinity : bIndex);
        });
}

async function initApi() {
    try {
        await getApiKey();
        await getApiMenuItems()
        await getApiTenant();

    } catch (error) {
        console.error('API initialization failed', error.message)
        showErrorMessage('API')
    }
}

export { initApi }
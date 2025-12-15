import { errorMessage } from "../state/errorMessage.js";
import { appState } from "../state/appState.js";

async function getApiKey() {
    try {
        const response = await fetch(`${appState.api}keys`, {
            method: 'POST',
        });
        const data = await response.json()
        appState.key = data.key
    } catch (error) {
        errorMessage('key')
        console.error('no key found', error.message)
    }
}

async function getApiTenant() {
    try {
        const response = await fetch(`${appState.api}tenants`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'x-zocom': appState.key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `test-${Date.now()}`
            })
        })
        const data = await response.json()
        appState.tenantName = data.name
        appState.tenantID = data.id
    } catch (error) {
        errorMessage('tenant')
        console.error('tenant error: ', error.message)
    }
}

async function getApiMenu() {
    try {
        const response = await fetch(`${appState.api}menu`, {
            headers: {
                'x-zocom': appState.key,
                'accept': 'application/json'
            }
        })

        const data = await response.json()
        menuSort(data.items)
    } catch (error) {
        errorMessage('menu')
        console.error('failed to catch menu items:', error.message)
    }
}

function menuSort(data) {
    appState.menuItems = {
        wontons: data.filter(item => item.type === "wonton"),
        dips: data.filter(item => item.type === "dip").map(cleanItemName),
        drinks: data.filter(item => item.type === "drink").map(cleanItemName)
    }
    
    const dipOrder = [6, 9, 7, 10, 11, 8];
    appState.menuItems.dips.sort(sorterHelper(dipOrder))
    
    const drinkOrder = [13, 14, 15, 12, 17, 16];
    appState.menuItems.drinks.sort(sorterHelper(drinkOrder))
}

function sorterHelper(itemOrder) {
    return (a, b) => {
        const aIndex = itemOrder.indexOf(a.id);
        const bIndex = itemOrder.indexOf(b.id);
        
        if (aIndex === -1 && bIndex === -1) return 0;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        
        return aIndex - bIndex;
    }
}

function cleanItemName(item) {
    // fix specific names
    if (item.name === 'Sweet n Sour') item.name = 'Sweet & Sour';
    if (item.name === 'Wonton Standard') item.name = 'Wonton Std';
    return item;
}

async function initApi() {
    try {
        await getApiKey()
        await getApiMenu()
        await getApiTenant()

    } catch (error) {
        console.error('API initialization failed', error.message)
        errorMessage('API')
    }
}

export { initApi }
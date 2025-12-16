import { appState } from "../state/appState.js";
import {
    resetAppState,
    addItemToOrderList,
    reduceOrderItemQuantity,
    removeItemFromOrderList
} from "../state/appStateMod.js";
import { errorMessage } from "../state/errorMessage.js";
import { showSection, showLoadingSection } from "./transitions.js";

import { getOrder } from "../api/getOrder.js";
import { getReceipt } from "../api/getReceipt.js";

import {updateCartDom, removeCartItemDom, resetCartDom} from "../dom/domCart.js";
import { updateCartCounterDom } from "../dom/domMenu.js";
import { etaTimerDom, orderIdDom } from "../dom/domWaiting.js";
import { updateReceiptDom, resetReceiptDom } from "../dom/domReceipt.js";

/** !BUTTON! adds an eventListener 'click' in cart section to go to menu section */
function toggleMenuButton() {
    const button = document.querySelector('.to-menu')
    button.addEventListener('click', () => {
        showSection('menu')
    })
}

/** !BUTTON! adds eventListeners 'click' in waiting and cart section to go to menu section - resets app to entry values */
function startNewOrderButtons() {
    const buttons = document.querySelectorAll('.new-order')
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            showLoadingSection()
            etaTimerDom('reset')
            resetAppState()
            resetCartDom()
            resetReceiptDom()
            showSection('menu')
            updateCartCounterDom()
        })
    })
}

/** !BUTTON! Adds an eventListener 'click' in menu to go to cart section */
function toggleCartButton() {
    const button = document.querySelector('.cart-button')
    button.addEventListener('click', () => {
        if (appState.orderList.length === 0) {
            errorMessage('empty')
            return
        }
        showSection('cart')
    })
}

/** !BUTTON! adds eventListener 'click' in menu that adds and updates appState and display*/
function menuButtonsAction() {
    const menuItems = document.querySelectorAll('.menu-dom .food-boxes')
    const drinkItems = document.querySelectorAll('.drink-dom button')
    const sauceItems = document.querySelectorAll('.sauce-dom button')
    
    const allItems = [...menuItems, ...drinkItems, ...sauceItems]
    
    allItems.forEach(item => {
        if (!item) return
        
        item.addEventListener('click', () => {
            const itemId = Number(item.dataset.id)
            addItemToOrderList(itemId)
            updateCartDom(itemId)
            updateCartCounterDom()
        })
    })
}
// This is a clean version with only one event listener for each menu type.
// function menuButtonsAction() {
//     const targets = ['.menu-dom', '.drink-dom', '.sauce-dom']

//     targets.forEach(domPlace => {
//         const container = document.querySelector(domPlace)
//         if (!container) return

//         container.addEventListener('click', (event) => {
//             const item = event.target.closest('[data-id]')
//             if (!item) return

//             const itemId = Number(item.dataset.id)
//             addItemToOrderList(itemId)
//             updateCartDom(itemId)
//             updateCartCounterDom()

//         })
//     })
// }

/** !BUTTON! adds eventListeners 'click' in cart that adds and updates appState and display +, -, X*/
function cartButtonsAction() {
    const cartDom = document.querySelector('.cart-dom')
    if (!cartDom) return
    
    cartDom.addEventListener('click', (e) => {
        const button = e.target
        if (!button.dataset.id) return
        
        const itemId = Number(button.dataset.id)
        
        if(button.classList.contains('more-button')) {
            addItemToOrderList(itemId)
            updateCartDom(itemId)
        }
        else if (button.classList.contains('less-button')) {
            reduceOrderItemQuantity(itemId)
            updateCartDom(itemId)
            }
        else if (button.classList.contains('remove-cart-button')) {
            removeItemFromOrderList(itemId)
            removeCartItemDom(itemId)
        }
        if (appState.orderList.length === 0) showSection('menu')
        updateCartCounterDom()
    })
}

/** !BUTTON! adds eventListener 'click' to go to waiting section and fetches order and updates appState */
function orderButtonAction() {
    const button = document.querySelector('#takeMoney')
    button.addEventListener('click', async () => {
        showLoadingSection()
        button.disabled = true
        
        try {
            await getOrder()
            etaTimerDom('start')
            orderIdDom()
            showSection('waiting')
        } catch (error) {
            errorMessage('order')
            showSection('cart')
        } finally {
            button.disabled = false
        }
    })
}

/** !BUTTON! adds eventListener 'click' to go to receipt section and fetches receipt and updates appState */
function receiptButtonAction() {
    const button = document.querySelector('.open-receipt')
    button.addEventListener('click', async () => {
        showLoadingSection()
        button.disabled = true

        try {
            etaTimerDom('reset')
            await getReceipt()
            updateReceiptDom()
            showSection('receipt')
        } catch (error) {
            errorMessage('receipt')
            showSection('waiting')
        } finally {
            button.disabled = false
        }
    })
}

/** !BUTTON! Manual removing of error message */
function errorExit() {
    const overlay = document.querySelector('.global-error-message')
    overlay.addEventListener('click', () => {
    overlay.classList.remove('visible');
     })

     document.addEventListener('keydown', esc => {
        if (esc.key === 'Escape') 
            overlay.classList.remove('visible')
     })
}

export {
    toggleMenuButton,
    startNewOrderButtons,
    toggleCartButton,
    menuButtonsAction,
    cartButtonsAction,
    orderButtonAction,
    receiptButtonAction,
    errorExit
}
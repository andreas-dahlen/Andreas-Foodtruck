import { appState } from "../state/appState.js";
import {
    resetAppState,
    addItemToOrderList,
    reduceOrderItemQuantity,
    removeItemFromOrderList
} from "../state/appStateMod.js";
import { errorMessage } from "../state/errorMessage.js";
import { showSection } from "./transitions.js";

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
            resetAppState()
            resetCartDom()
            resetReceiptDom()
            showSection('menu')
            updateCartCounterDom()
        })
    })
}

/** Adds an eventListener 'click' in menu to go to cart section */
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

/** adds eventListeners 'click' in menu that adds and updates appState and display*/
function menuButtonsAction() {
    const targets = ['.menu-dom', '.drink-dom', '.sauce-dom']

    targets.forEach(domPlace => {
        const container = document.querySelector(domPlace)
        if (!container) return

        container.addEventListener('click', (e) => {
            const box = e.target.closest('[data-id]')
            if (!box) return

            const itemId = Number(box.dataset.id)
            addItemToOrderList(itemId)
            updateCartDom(itemId)
            updateCartCounterDom()

        })
    })
}

/** adds eventListeners 'click' in cart that adds and updates appState and display +, -, X*/
function cartButtonsAction() {
    const cartDom = document.querySelector('.cart-dom')
    if (!cartDom) return

    cartDom.addEventListener('click', (e) => {
        const more = e.target.closest('.more-button')
        const less = e.target.closest('.less-button')
        const remove = e.target.closest('.remove-cart-button')

        if (more) {
            const itemId = Number(e.target.dataset.id)
            if (!itemId) return
            addItemToOrderList(itemId)
            updateCartDom(itemId)
        }
        else if (less) {
            const itemId = Number(e.target.dataset.id)
            if (!itemId) return
            reduceOrderItemQuantity(itemId)
            updateCartDom(itemId)
            if (appState.orderList.length === 0) {
                showSection('menu')
            }
        }
        else if (remove) {
            const itemId = Number(e.target.dataset.id)
            if (!itemId) return
            removeItemFromOrderList(itemId)
            removeCartItemDom(itemId)
            if (appState.orderList.length === 0) {
                showSection('menu')
            }
        }
        updateCartCounterDom()
    })
}

/** adds eventListener 'click' to go to waiting section and fetches order and updates appState */
function orderButtonAction() {
    const button = document.querySelector('#takeMoney')
    button.addEventListener('click', async () => {
        showSection('loading')
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

/** adds eventListener 'click' to go to receipt section and fetches receipt and updates appState */
function receiptButtonAction() {
    const button = document.querySelector('.open-receipt')
    button.addEventListener('click', async () => {
        showSection('loading')
        button.disabled = true

        try {
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
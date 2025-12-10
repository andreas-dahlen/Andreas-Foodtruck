import { appState } from "../state/appState.js";
import {
    resetAppState,
    addItemToOrderList,
    reduceOrderItemQuantity,
    removeItemFromOrderList
} from "../state/appStateMod.js";
import { showErrorMessage } from "../state/errorMessage.js";
import { showSection } from "./transitions.js";

import { getOrder } from "../api/getOrder.js";
import { getReceipt } from "../api/getReceipt.js";

import {
    decreaseCartItemDom,
    generateCartDom,
    removeCartItemDom,
    resetCartDom,
    updateTotalPriceCartDom
} from "../dom/domCart.js";
import { updateCartCounterDom } from "../dom/domMenu.js";
import { etaTimerDom, orderIdDom } from "../dom/domWaiting.js";

/** !BUTTON! adds click in cart section to go to menu section */
function toggleMenuButton() {
    const button = document.querySelector('.to-menu')
    button.addEventListener('click', () => {
        showSection('menu')
    })
}

/** !BUTTON! adds click in waiting and  section to go to menu section */
function startNewOrderButtons() {
    const buttons = document.querySelectorAll('.new-order')
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            resetAppState()
            resetCartDom()
            showSection('menu')
            updateCartCounterDom()
        })
    })
}

/**
 * Adds event listeners to all buttons that show the cart view.
 */
function toggleCartButton() {
    const button = document.querySelector('.cart-button')
    button.addEventListener('click', () => {
        if (appState.orderList.length === 0) {
            showErrorMessage('empty')
            return
        }
        showSection('cart')
    })
}
//TODO: rename functions, make some javadoc comments, change remove button color, make cart button to go back to menu, vagnen är tom?, bug med vagnen reset, DEL, varningsTextMedelande när vagnen är tom /**, 
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
            generateCartDom(itemId)
            updateTotalPriceCartDom()
            updateCartCounterDom()

        })
    })
}

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
            generateCartDom(itemId)
        }
        else if (less) {
            const itemId = Number(e.target.dataset.id)
            if (!itemId) return
            reduceOrderItemQuantity(itemId)
            decreaseCartItemDom(itemId)
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

        updateTotalPriceCartDom()
        updateCartCounterDom()
    })
}

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
            showErrorMessage('order')
            showSection('cart')
        } finally {
            button.disabled = false
        }
    })
}

function receiptButtonAction() {
    const button = document.querySelector('.open-receipt')
    button.addEventListener('click', async () => {
        showSection('loading')
        button.disabled = true

        try {
            await getReceipt()
            showSection('receipt')
        } catch (error) {
            showErrorMessage('receipt')
            showSection('waiting')
        } finally {
            button.disabled = false
        }
    })
}

export {
    toggleMenuButton,
    startNewOrderButtons,
    toggleCartButton,
    menuButtonsAction,
    cartButtonsAction,
    orderButtonAction,
    receiptButtonAction
}
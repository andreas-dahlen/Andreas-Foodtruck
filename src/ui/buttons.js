import { showSection } from "./transitions.js";
import { showErrorMessage } from "../logic/errorLogic.js";
import { cart } from "../logic/state.js";
    
import{ 
    resetCart, 
    addItemToCart, 
    removeItemFromCart, 
    removeWholeItemFromCart } from "../logic/stateLogic.js";
import { getOrder} from "../api/placeOrder.js";
import { getReceipt } from "../api/getReceipt.js";
import { decreaseCartItemDom, 
    generateCartDom, 
    removeCartItemTypeDom, 
    resetCartDom, 
    updatePriceDom} from "../dom/domCart.js";
import { domCartCounter } from "../dom/domMenu.js"
import { domEtaTimer, domOrderNumber } from "../dom/domWaiting.js";


function toggleMenuButtons() {
    const buttons = document.querySelectorAll('.to-menu')
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            showSection('menu')
        })
    })
}

function toggleNewOrderButtons() {
    const buttons = document.querySelectorAll('.new-order')
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            resetCart()
            resetCartDom()
            showSection('menu')
            domCartCounter()
        })
    })
}

/**
 * Adds event listeners to all buttons that show the cart view.
 */
function toggleCartButtons() {
    const buttons = document.querySelectorAll('.cart-button')
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (cart.orderList.length === 0) {
                showErrorMessage('empty')
                return
            }
            showSection('cart')
        })
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
            addItemToCart(itemId)
            generateCartDom(itemId)
            updatePriceDom()
            domCartCounter()
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
            addItemToCart(itemId)
            generateCartDom(itemId)
        }
        else if (less) {
            const itemId = Number(e.target.dataset.id)
            if (!itemId) return
            removeItemFromCart(itemId)
            decreaseCartItemDom(itemId)
            if (cart.orderList.length === 0) {
                showSection('menu')
            }
        }
        else if (remove) {
            const itemId = Number(e.target.dataset.id)
            if (!itemId) return
            removeWholeItemFromCart(itemId)
            removeCartItemTypeDom(itemId)
            if (cart.orderList.length === 0) {
                showSection('menu')
            }
        }

        updatePriceDom()
        domCartCounter()
    })
}

function orderButtonAction() {
    const button = document.querySelector('#takeMoney')
    button.addEventListener('click', async () => {
        showSection('loading')
        button.disabled = true

        try {
            await getOrder()
            domEtaTimer('start')
            domOrderNumber()
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
    toggleMenuButtons,
    toggleNewOrderButtons,
    toggleCartButtons,
    menuButtonsAction,
    cartButtonsAction,
    orderButtonAction,
    receiptButtonAction
}
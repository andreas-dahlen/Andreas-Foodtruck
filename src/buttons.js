import { showSection, showErrorMessage } from "./displayLogic.js";
import { cart, addItemToCart, removeItemFromCart, removeWholeItemFromCart } from "./saveAndApi/saveAndAppend.js";
import { sendOrder } from "./saveAndApi/orderAndRecipt.js";
import { domCart, domPrice, removeDomCart, removeWholeDomCart } from "./domCart.js";
import { cartCounter } from "./appStart/domMenu.js"


function showMenuButtons() {
    const buttons = document.querySelectorAll('.to-menu')
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            showSection('menu')
        })
    })
}

function showCartButtons() {
    const buttons = document.querySelectorAll('.to-cart')
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

function menuItemButtons() {
    const targets = ['.menu-dom', '.drink-dom', '.sauce-dom']

    targets.forEach(domPlace => {
        const container = document.querySelector(domPlace)
        if (!container) return

        container.addEventListener('click', (e) => {
            const box = e.target.closest('[data-id]')
            if (!box) return

            const itemId = Number(box.dataset.id)
            addItemToCart(itemId)
            domCart(itemId)
            domPrice()
            cartCounter()

        })
    })
}

function cartButtons() {
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
            domCart(itemId)
        }
        else if (less) {
            const itemId = Number(e.target.dataset.id)
            if (!itemId) return
            removeItemFromCart(itemId)
            removeDomCart(itemId)
            if (cart.orderList.length === 0) {
                showSection('menu')
            }
        }
        else if (remove) {
            const itemId = Number(e.target.dataset.id)
            if (!itemId) return
            removeWholeItemFromCart(itemId)
            removeWholeDomCart(itemId)
            if (cart.orderList.length === 0) {
                showSection('menu')
            }
        }

        domPrice()
        cartCounter()
    })
}

function orderButton() {
    const button = document.querySelector('#takeMoney')
    button.addEventListener('click', () => {
        sendOrder()
    })
}

export {
    menuItemButtons,
    showCartButtons,
    orderButton,
    showMenuButtons,
    cartButtons
}
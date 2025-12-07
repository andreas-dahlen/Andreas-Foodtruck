import { showSection, showErrorMessage } from "./displayLogic.js";
import { cart, addItemToCart, removeItemFromCart } from "./saveAndApi/saveAndAppend.js";
import { sendOrder } from "./saveAndApi/orderAndRecipt.js";
import { domCart, domPrice, removeDomCart } from "./domCart.js";
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
            if (e.target.classList.contains('less-button')) return
            if (e.target.classList.contains('more-button')) return
            const el = e.target.closest('[data-id]')
            if (!el) return

            const itemId = Number(el.dataset.id)
            addItemToCart(itemId)
            domCart(itemId)
            domPrice()
            cartCounter()

        })
    })
}

function cartPlusButtons() {
    document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('more-button')) return

        const itemId = Number(e.target.dataset.id)
        addItemToCart(itemId)
        domCart(itemId)
        domPrice()
        cartCounter()
    })
}

function cartMinusButtons() {
    document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('less-button')) return

        const itemId = Number(e.target.dataset.id)
        removeItemFromCart(itemId)
        removeDomCart(itemId)
        domPrice()
        cartCounter()

        if (cart.orderList.length === 0) {
            showSection('menu')
        }
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
    cartMinusButtons,
    cartPlusButtons
}
import { showSection } from "./displayLogic.js";
import { addItemToCart } from "./saveAndApi/saveAndAppend.js";
import { sendOrder } from "./saveAndApi/orderAndRecipt.js";
import { domCart } from "./domCart.js";

function testButton() {
    let pos = 0;
    const test = document.querySelectorAll('.test-button-delete-me')

    test.forEach(item => {
        item.addEventListener('click', () => {
            console.log('click')
            if (pos === 0) {
                showSection('menu')
            } else if (pos === 1) {
                showSection('cart')
            } else if (pos === 2) {
                showSection('waiting')
            } else {
                showSection('receipt')
            }

            if (pos === 3) {
                pos = 0
            } else {
                pos++
            }
        })
    })
}

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
            showSection('cart')
        })
    })
}

function menuItemButtons() {
    document.addEventListener('click', (e) => {
        const el = e.target.closest('[data-id]')
        if (!el) return

        const itemId = Number(el.dataset.id)

        addItemToCart(itemId)
        domCart(itemId)

    })
}

function orderButton() {
    const button = document.querySelector('#takeMoney')
    button.addEventListener('click', () => {
        sendOrder()
    })
}


export {
    testButton,
    menuItemButtons,
    showCartButtons,
    orderButton,
    showMenuButtons
}
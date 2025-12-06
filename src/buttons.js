import { showSection } from "./displayLogic.js";
import { addItemToCart } from "./saveAndApi/saveAndAppend.js";
import { sendOrder } from "./saveAndApi/orderAndRecipt.js";

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

function menuItemButtons() {
    document.addEventListener('click', (e) => {
        const el = e.target.closest('[data-id]')
        if (!el) return

        addItemToCart(Number(el.dataset.id))
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
    orderButton
}
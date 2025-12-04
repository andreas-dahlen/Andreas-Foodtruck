import {hideAllSections, showSection } from "./displayLogic.js";

function testButton () {
     let pos = 0;
    document.querySelector('.test-button-delete-me').addEventListener('click', () => {
        if (pos === 0) {
            hideAllSections()
        } else if (pos === 1) {
            showSection('cart')
        } else if (pos === 2) {
            showSection('waiting')
        }  else {
            showSection('receipt')
        }
        if (pos === 3) {
            pos = 0
        } else pos++
    })
}

export { testButton }
import { showSection } from "./displayLogic.js";

function testButton () {
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
        }  else {
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

export { testButton }
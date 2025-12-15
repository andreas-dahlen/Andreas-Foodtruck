import { showErrorSection } from "../ui/transitions.js"

/** !ERROR! decides what error to display. Then it calls to show the error section */
function errorMessage(type) {
    const msgPlacement = document.querySelector('.error-text')
    const messages = {
        empty: 'Din korg är tom\nlägg till varor',
        key: 'Anslutningsfel\nförsök igen senare',
        tenant: 'Verifieringsfel\nförsök igen senare',
        menu: 'Laddningsfel\nförsök igen senare',
        API: 'Serverfel\nförsök igen senare',
        menuOrReceiptEmpty: 'Laddningsfel\nförsök igen senare',
        order: 'Beställningsfel\nförsök igen senare',
        itemNotFound: 'Artikel saknas\nförsök igen senare',
        receipt: 'Kvittofel\nförsök igen senare',
        default: 'Något gick fel\nförsök igen senare'
    }

    const output = messages[type] || messages.default
    msgPlacement.textContent = output

    showErrorSection()
}

export { errorMessage }
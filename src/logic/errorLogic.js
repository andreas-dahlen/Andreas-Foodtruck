function showErrorMessage(type) {
    const placement = document.querySelectorAll('.global-error-message')
    const messages = {
        empty: 'Din korg är tom\nlägg till varor',
        key: 'Anslutningsfel\nförsök igen senare',
        tenant: 'Verifieringsfel\nförsök igen senare', //inloggningsfel kontofel if its implemented
        menu: 'Laddningsfel\nförsök igen senare',
        API: 'Serverfel\nförsök igen senare',
        menuEmpty: 'Laddningsfel\nförsök igen senare',
        order: 'Beställningsfel\nförsök igen senare',
        itemNotFound: 'Artikel saknas\nförsök igen senare',
        receipt: 'Kvittofel\nförsök igen senare',
        default: 'Något gick fel\nförsök igen senare'
    }

    const output = messages[type] || messages.default

    placement.forEach(place => {
        place.textContent = output
        place.classList.remove('hidden')

        setTimeout(() => place.classList.add('hidden'), 2500)
    })
}

export { showErrorMessage }
const sections = {
    menu: document.querySelector('#menu'),
    cart: document.querySelector('#cart'),
    waiting: document.querySelector('#waiting'),
    receipt: document.querySelector('#receipt'),
    loading: document.querySelector('#loading')
}


function hideAllSections() {
    Object.values(sections).forEach(element => {
        element.classList.add('display-remove')
    });
}

function showSection(input) {
    hideAllSections()

    sections[input].classList.remove('display-remove')
}

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

export { showSection, showErrorMessage }

// 'Din korg är tom – lägg till varor',
// 'Anslutningsfel – försök igen senare',
// 'Verifieringsfel – försök igen senare',
// 'Laddningsfel – försök igen senare',
// 'Serverfel – försök igen senare',
// 'Laddningsfel – försök igen senare',
// 'Beställningsfel – försök igen senare',
// 'Artikel saknas – försök igen senare',
// 'Något gick fel – försök igen senare'
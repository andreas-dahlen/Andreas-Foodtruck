const sections = {
    menu: document.querySelector('#menu'),
    cart: document.querySelector('#cart'),
    waiting: document.querySelector('#waiting'),
    receipt: document.querySelector('#receipt')
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
        empty: 'Kundvagnen är tom',
        key: 'Nyckel-fel vid kontakt med servern',
        tenant: 'Kunde inte identifiera användare',
        menu: 'Menyn kunde inte laddas',
        API: 'Serverfel-försök igen',
        menuEmpty: 'Kunde inte hämta menyn',
        order: 'Beställningen misslyckades',
        itemNotFound: 'Menyartikel saknas',
        default: 'Något gick fel'
    }

    const output = messages[type] || messages.default

    placement.forEach(place => {
        place.textContent = output
        place.classList.remove('hidden')

        setTimeout(() => place.classList.add('hidden'), 2500)
    })
}

export { showSection, showErrorMessage }
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

    const section = sections[input]
    if (!section) return

    sections[input].classList.remove('display-remove')

    clearVisible()
}

function showErrorSection() {
    const placement = document.querySelector('.global-error-message')
    placement.classList.add('visible');

        clearTimeout(window._errorTimeout);

    window._errorTimeout = setTimeout(() => {
        placement.classList.remove('visible');
    }, 4000);
}

function clearVisible() {
    const visible = document.querySelector('.loading-style')
    visible.classList.remove('visible')
}

function showLoadingSection() {
    const placement = document.querySelector('.loading-style')
          placement.classList.add('visible')
}

export { showSection, showErrorSection, showLoadingSection }
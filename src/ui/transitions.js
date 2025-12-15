const sections = {
    menu: document.querySelector('#menu'),
    cart: document.querySelector('#cart'),
    waiting: document.querySelector('#waiting'),
    receipt: document.querySelector('#receipt')
}

/** !TRANSITIONS! Hides all sections. Only called from showSection() */
function hideAllSections() {
    Object.values(sections).forEach(element => {
        element.classList.add('display-remove')
    });
}

/** !TRANSITIONS! Hides all sections. then displays one section and removes loading screen */
function showSection(input) {
    hideAllSections()

    const section = sections[input]
    if (!section) return

    sections[input].classList.remove('display-remove')

    const visible = document.querySelector('.loading-style')
    visible.classList.remove('visible')
}

/** !TRANSITIONS! shows error section with a timer */
function showErrorSection() {
    const placement = document.querySelector('.global-error-message')
    placement.classList.add('visible');

        clearTimeout(window._errorTimeout);

    window._errorTimeout = setTimeout(() => {
        placement.classList.remove('visible');
    }, 4000);
}

/** !TRANSITIONS! shows loadingSection until another section is shown */
function showLoadingSection() {
    const placement = document.querySelector('.loading-style')
          placement.classList.add('visible')
}

export { showSection, showErrorSection, showLoadingSection }
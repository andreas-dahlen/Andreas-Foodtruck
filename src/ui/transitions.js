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

function showErrorSection() {
    const placement = document.querySelector('.global-error-message')
    placement.classList.add('visible');

        clearTimeout(window._errorTimeout);

    window._errorTimeout = setTimeout(() => {
        placement.classList.remove('visible');
    }, 4000);
}

export { showSection, showErrorSection }
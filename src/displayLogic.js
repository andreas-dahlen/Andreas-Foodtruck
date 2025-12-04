const sections = {
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

export { showSection, hideAllSections}
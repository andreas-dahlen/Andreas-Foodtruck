import { cart } from '../saveAndApi/saveAndAppend.js'
            
function makeWonton(item) {
    const foodBox = document.createElement('div')
    foodBox.classList.add('food-boxes')
    foodBox.dataset.id = item.id

    const title = document.createElement('div')
    title.classList.add('menu-title-style')

    const name = document.createElement('h2')
    name.textContent = item.name.toUpperCase()

    const span = document.createElement('span')
    span.classList.add('dots')

    const price = document.createElement('h2')
    price.textContent = item.price + ' SEK'

    title.append(name, span, price)

    const ingredients = document.createElement('p')
    ingredients.classList.add('ingredients')
    ingredients.textContent = item.ingredients.join(', ')

    foodBox.append(title, ingredients)

    document.querySelector('.menu-dom').appendChild(foodBox)
}

function makeDipAndDrink(item, target) {
    const box = document.createElement('div')
    box.dataset.id = item.id
    const p = document.createElement('p')
    p.textContent = item.name === "Wonton Standard" ? "Wonton std" : item.name;

    box.appendChild(p)
    document.querySelector(target).appendChild(box)
}

function domMenu() {

    if (!cart.menuItems) return

    cart.menuItems.wontons.forEach(makeWonton)

    cart.menuItems.dips.forEach(item => makeDipAndDrink(item, '.sauce-dom'))

    cart.menuItems.drinks.forEach(item => makeDipAndDrink(item, '.drink-dom'))
}

export { domMenu }
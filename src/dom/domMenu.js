import { showErrorMessage } from '../logic/errorLogic.js'
import { cart } from '../logic/state.js'

function generateWontonDom(item) {
    const foodBox = document.createElement('button')
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

function generateDipAndDrink(item, target) {
    const button = document.createElement('button')
    button.dataset.id = item.id
    button.textContent = item.name;

    document.querySelector(target).appendChild(button)
}

function generateMenuDom() {

    if (!cart.menuItems) {
        showErrorMessage('menuEmpty')
        return
    }

    cart.menuItems.wontons.forEach(generateWontonDom)

    cart.menuItems.dips.forEach(item => generateDipAndDrink(item, '.sauce-dom'))

    cart.menuItems.drinks.forEach(item => generateDipAndDrink(item, '.drink-dom'))
}

//TODO: THIS IS NOT A BUTTON... MOVE TO CARTDOM
function domCartCounter() {
    const totalQuantity = cart.orderList.reduce((sum, item) => sum + item.quantity, 0)
    document.querySelector('.amount-in-cart').textContent = totalQuantity
}

export { generateMenuDom, domCartCounter }
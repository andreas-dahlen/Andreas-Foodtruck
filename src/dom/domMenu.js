import { showErrorMessage } from '../state/errorMessage.js'
import { appState } from '../state/appState.js'

/** !MENU! Puts a wonton in the DOM tree*/
function generateWonton(item) {
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

/** !MENU! Puts a dip or drink in the DOM tree*/
function generateDipAndDrink(item, target) {
    const button = document.createElement('button')
    button.dataset.id = item.id
    button.textContent = item.name;

    document.querySelector(target).appendChild(button)
}

/** !MENU! Populates the whole DOM tree*/
function generateMenuDom() {

    if (!appState.menuItems) {
        showErrorMessage('menuOrReceiptEmpty')
        return
    }

    appState.menuItems.wontons.forEach(generateWonton)

    appState.menuItems.dips.forEach(item => generateDipAndDrink(item, '.sauce-dom'))

    appState.menuItems.drinks.forEach(item => generateDipAndDrink(item, '.drink-dom'))
}

/** !MENU!  */
function updateCartCounterDom() {
    const totalQuantity = appState.orderList.reduce((sum, item) => sum + item.quantity, 0)
    document.querySelector('.amount-in-cart').textContent = totalQuantity
}

export { generateMenuDom, updateCartCounterDom }
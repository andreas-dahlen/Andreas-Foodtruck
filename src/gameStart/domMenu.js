import { cart } from '../saveFile.js'
            
                // <!-- create div elements here that will look like:-->
                // <!-- <div class="food-boxes">
                //     <div class="menu-title-style">
                //         <h2>class not needed..?</h2>
                //         <p class="spacer"></p>
                //         <h2 class="food-price"></h2>
                //     </div>
                //     <p class="ingredients"></p>
                // </div> -->

function makeWonton(item) {

    const foodBox = document.createElement('div')
    foodBox.classList.add('food-boxes')

    const title = document.createElement('div')
    title.classList.add('menu-title-style')

    const name = document.createElement('h2')
    name.textContent = item.name
    const spacer = document.createElement('p')
    spacer.textContent = '...........'
    const price = document.createElement('h2')
    price.textContent = item.price

    title.append(name, spacer, price)

    const ingredients = document.createElement('p')
    ingredients.classList.add('ingredients')
    ingredients.textContent = item.ingredients.join(', ')

    foodBox.append(title, ingredients)

    document.querySelector('#menuDom').appendChild(foodBox)
}

function makeDipAndDrink() {

}

function domMenu() {
        cart.wontons.forEach(makeWonton)

        cart.drinks.forEach(makeDipAndDrink)
}

export { domMenu }
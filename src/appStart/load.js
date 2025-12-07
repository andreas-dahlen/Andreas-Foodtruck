import { menuItemButtons, orderButton, showCartButtons, showMenuButtons, cartMinusButtons, cartPlusButtons} from "../buttons.js";
import { initApi } from "./apiInnit.js";
import { domMenu } from './domMenu.js';
import { showSection } from "../displayLogic.js";

async function initLoad() {
    //show loading
    await initApi()
    domMenu()
    showSection('menu')
    menuItemButtons()
    showCartButtons()
    showMenuButtons()
    orderButton()
    cartMinusButtons()
    cartPlusButtons()
}

export { initLoad }
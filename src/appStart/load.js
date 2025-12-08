import {
    orderButton,
    showCartButtons,
    showMenuButtons,
    cartButtons,
    menuItemButtons,
    showMenuNewOrderButtons,
    receiptButton
} from "../buttons.js";
import { initApi } from "./apiInnit.js";
import { domMenu } from './domMenu.js';
import { showSection } from "../displayLogic.js";

async function initLoad() {
    //show loading
    await initApi()
    domMenu()
    showSection('menu')

    menuItemButtons()
    cartButtons()

    showCartButtons()

    showMenuButtons()
    orderButton()

    showMenuNewOrderButtons()

    receiptButton()
}

export { initLoad }
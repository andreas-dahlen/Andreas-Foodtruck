import { menuItemButtons, orderButton, showCartButtons} from "../buttons.js";
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
    orderButton()
}

export { initLoad }
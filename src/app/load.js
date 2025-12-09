import { 
    menuItemButtons,
    cartButtons,
    showCartButtons,
    showMenuButtons,
    orderButton,
    showMenuNewOrderButtons,
    receiptButton
} from "../ui/buttons.js";
import { initApi } from "../api/apiInnit.js";
import { domMenu } from '../dom/domMenu.js';
import { showSection } from "../ui/transitions.js";

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
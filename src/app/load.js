import { 
    toggleMenuButtons,
    toggleNewOrderButtons,
    toggleCartButtons,
    menuButtonsAction,
    cartButtonsAction,
    orderButtonAction,
    receiptButtonAction
} from "../ui/buttons.js";
import { initApi } from "../api/apiInnit.js";
import { generateMenuDom } from '../dom/domMenu.js';
import { showSection } from "../ui/transitions.js";

async function initLoad() {
    showSection('loading')
    await initApi()
    generateMenuDom()
    showSection('menu')

    toggleMenuButtons(),
    toggleNewOrderButtons(),
    toggleCartButtons(),

    menuButtonsAction(),
    cartButtonsAction(),
    orderButtonAction(),
    receiptButtonAction()
}

export { initLoad }
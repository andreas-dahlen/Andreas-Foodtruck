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
import { domMenu } from '../dom/domMenu.js';
import { showSection } from "../ui/transitions.js";

async function initLoad() {
    showSection('loading')
    await initApi()
    domMenu()
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
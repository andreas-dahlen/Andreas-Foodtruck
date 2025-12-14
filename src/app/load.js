import { 
    toggleMenuButton,
    startNewOrderButtons,
    toggleCartButton,
    menuButtonsAction,
    cartButtonsAction,
    orderButtonAction,
    receiptButtonAction,
    errorExit
} from "../ui/buttons.js";
import { initApi } from "../api/apiInnit.js";
import { generateMenuDom } from '../dom/domMenu.js';
import { showSection, showLoadingSection } from "../ui/transitions.js";

async function initLoad() {
    showLoadingSection()
    await initApi()
    generateMenuDom()
    showSection('menu')

    toggleMenuButton(),
    startNewOrderButtons(),
    toggleCartButton(),

    menuButtonsAction(),
    cartButtonsAction(),
    orderButtonAction(),
    receiptButtonAction(),
    errorExit()
}

export { initLoad }
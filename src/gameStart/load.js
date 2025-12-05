import { initApi } from "./apiInnit.js";
import { domMenu } from './domMenu.js'

async function initLoad() {
    await initApi()
    domMenu()
}

export {initLoad}
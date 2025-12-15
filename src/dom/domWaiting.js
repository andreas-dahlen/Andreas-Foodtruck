import { appState } from "../state/appState.js";

let timerInterval = null
let etaSec = 0

/** !WAITING! shows duration left until the food is ready in the dom tree*/
function etaTimerDom(action = 'start') {
    const timerDisplay = document.querySelector('.progress h2')
    const textDisplay = document.querySelector('.progress h1')

    if (action == 'start') {
        const etaRaw = Date.parse(appState.orderInfo.eta) - Date.parse(appState.orderInfo.timestamp)
        etaSec = Math.floor(etaRaw / 1000)

        if (timerInterval) clearInterval(timerInterval)

        timerDisplay.classList.remove('pulse');

        timerInterval = setInterval(() => {
            if (etaSec <= 0) {
                clearInterval(timerInterval)
                timerDisplay.textContent = 'KLAR!'
                timerDisplay.classList.add('pulse')
                textDisplay.textContent = 'DINA WONTONS ÄR FÄRDIGA!'
                return
            }

            if (etaSec >= 120) {
                const minutes = Math.floor(etaSec / 60);
                timerDisplay.textContent = `ETA ${minutes} MIN`
            } else if (etaSec >= 60) {
                const minutes = Math.floor(etaSec / 60);
                const seconds = etaSec % 60;
                timerDisplay.textContent = `ETA ${minutes}:${seconds.toString().padStart(2, '0')} MIN`
            } else {
                timerDisplay.textContent = `ETA ${etaSec} SEC`
            }
            etaSec--
        }, 1000)
    }

    else if (action === 'reset') {
        clearInterval(timerInterval)
        timerInterval = null
        textDisplay.textContent = 'DINA WONTONS TILLAGAS!'
        timerDisplay.classList.remove('pulse');
    }
}

/** !WAITING! shows the order ID in the dom tree*/
function orderIdDom() {
    const orderNumber = document.querySelector('.progress p')
    orderNumber.textContent = `#${appState.orderInfo.orderId}`
}

export { etaTimerDom, orderIdDom }
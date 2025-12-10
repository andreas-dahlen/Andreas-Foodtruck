import { cart } from "../logic/state.js";

let timerInterval = null
let etaSec = 0

function domEtaTimer(action = 'start') {
    const timerDisplay = document.querySelector('.progress h2')
    const textDisplay = document.querySelector('.progress h1')

    if (action == 'start') {
        const etaRaw = Date.parse(cart.orderInfo.eta) - Date.parse(cart.orderInfo.timestamp)
        etaSec = Math.floor(etaRaw / 1000)

        if (timerInterval) clearInterval(timerInterval)

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
    }
}

function domOrderNumber() {
    const orderNumber = document.querySelector('.progress p')
    orderNumber.textContent = `#${cart.orderInfo.orderId}`
    // const receiptNumber = document.querySelector('.receipt-header p')
    // receiptNumber.textContent = `#${cart.receiptInfo.receiptId}`
}

export { domEtaTimer, domOrderNumber }
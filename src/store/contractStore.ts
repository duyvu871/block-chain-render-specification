import { createStore } from "redux";

const contractData = () => {
    return {
        type: 'CONTRACT_DATA',
    }
}

const showPopup = () => {
    return {
        type: 'POPUP_SHOW',
    }
}


export {contractData, showPopup};
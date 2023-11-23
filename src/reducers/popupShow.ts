import { IReducer, IReducerAction } from "@/types/reducer";

const popupReducer = (state: boolean = false, action: IReducerAction): boolean => {
    switch (action.type) {
        case 'POPUP_SHOW':
            return action.payload as boolean;
        default:
            return state;
    }

    // if (action.type === 'POPUP_SHOW') {
    //     return action.payload as boolean;
    // } else {
    //     return state;
    // }
}

export default popupReducer;
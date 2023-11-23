import { IReducer, IReducerAction } from "@/types/reducer";

const popupReducer = (data: boolean): IReducerAction => {
   return {
        type: 'POPUP_SHOW',
        payload: data
   }
}

export default popupReducer;
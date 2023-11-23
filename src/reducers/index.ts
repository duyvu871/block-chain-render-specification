import { combineReducers } from "redux";

import contractDataPusher from "@/reducers/contract";
import popupReducer from "@/reducers/popupShow";

const rootReducer = combineReducers({
    // contractDataPusher,
    popupReducer
});

export default rootReducer;
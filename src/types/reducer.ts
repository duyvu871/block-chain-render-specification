export interface IReducer {
    state: any;
    action: {
        type: string;
        payload: any;
    };
}

export interface IReducerAction {
    type: string;
    payload: any;
}
export interface IReducerFunction {
    (state: any, action: any): any;
}

export interface IReducerMap {
    [key: string]: IReducerFunction;
}

export interface IReducerMapObject {
    [key: string]: IReducer;
}

export interface IReducerMapArray {
    [key: string]: IReducer[];
}





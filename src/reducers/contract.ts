import { contractState, contractAction } from '@src/types/contract';

const contractDataPusher = (state: contractState, action: contractAction): contractState => {
    console.log(action);

    switch (action.type) {
        case 'CONTRACT_DATA':
            return {
                ...state,
                contract: action.payload
            }
        default:
            return state;
    }

    // if (action.type === 'CONTRACT_DATA') {
    //     return {
    //         ...state,
    //         contract: action.payload
    //     }
    // } else {
    //     return state;
    // }
    //
    // return state;
}

export default contractDataPusher;
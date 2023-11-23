
import {contractState, contractAction, contractData} from '@src/types/contract';

const contractDataPusher = (data: contractData): contractAction  => {
    return {
        type: 'CONTRACT_DATA',
        payload: data
    }
}

export default contractDataPusher;

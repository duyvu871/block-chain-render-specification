export interface EventFilter {
    address?: string;
    topics?: Array<string | Array<string> | null>;
}

export interface Filter extends EventFilter {
    fromBlock?: any,
    toBlock?: any,
}

export interface FilterByBlockHash extends EventFilter {
    blockHash?: string;
}
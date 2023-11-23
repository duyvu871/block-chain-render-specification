type contractState = {
    contract: contractData | null;
    loading: boolean;
    error: string | null;
};
type contractData = {
    id?: string;
    name?: string;
    description?: string;
    contractAddress?: string;
    contractABI?: string;
    contractBytecode?: string;
    contractOwner?: string;
    contractCreationDate?: string;
    contractLastUpdateDate?: string;
    contractStatus?: string;
    contractType?: string;
    contractVersion?: string;
    contractCompiler?: string;
    contractLicense?: string;
    contractMethods?: contractMethod[];
    contractEvents?: contractEvent[];
    contractVariables?: contractVariable[];
};

type contractMethod = {
    id: string;
    name: string;
    description: string;
    methodType: string;
    methodVisibility: string;
    methodStateMutability: string;
    methodPayable: boolean;
    methodConstant: boolean;
    methodInputs: contractMethodInput[];
    methodOutputs: contractMethodOutput[];
};

type contractMethodInput = {
    id: string;
    name: string;
    type: string;
    indexed: boolean;
};

type contractMethodOutput = {
    id: string;
    name: string;
    type: string;
};

type contractEvent = {
    id: string;
    name: string;
    description: string;
    eventInputs: contractEventInput[];
};

type contractEventInput = {
    id: string;
    name: string;
    type: string;
    indexed: boolean;
};

type contractVariable = {
    id: string;
    name: string;
    description: string;
    type: string;
    constant: boolean;
    value: string;
};

// Path: src/types/contract.ts

type contractAction = {
    type: string;
    payload: any;
};

export type {
    contractState,
    contractData,
    contractMethod,
    contractMethodInput,
    contractMethodOutput,
    contractEvent,
    contractEventInput,
    contractVariable,
    contractAction,
}
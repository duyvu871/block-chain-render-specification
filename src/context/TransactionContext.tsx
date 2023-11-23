"use client";

import React, {createContext, useEffect, useState} from "react";
import {ethers, providers} from "ethers";
import {abi} from "@/ultis/Transactions.json";


interface IFormData {
    addressTo: string,
    amount: string,
    keyword: string,
    message: string
}

interface ITransactionContext {
    transactions: any[];
    address: string;
    sendTransaction: () => void;
    connectWallet: () => void;
    checkIfWalletIsConnected: () => void;
    handleChange: (e: any, name:string) => void;
    setAddress: (address: string) => void;
    isClient: boolean;
}

export const TransactionContext = createContext<ITransactionContext>({
    transactions: [],
    address: "",
    sendTransaction: () => {},
    connectWallet: () => {},
    checkIfWalletIsConnected: () => {},
    handleChange: (e: any, name:string) => {},
    setAddress: (address: string) => {},
    isClient: false,
});


const {ethereum} = window;

const createEthereumContract = (address: string): ethers.Contract => {
    const provider = new providers.Web3Provider(ethereum as any);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(address, abi, signer);

    return transactionContract;
}

// const createEthereumContractToken = (): ethers.Contract => {
//     const provider = new providers.Web3Provider(ethereum as any);
//     const signer = provider.getSigner();
//     const transactionContract = new ethers.Contract(contractAddressToken, contractABI, signer);
//
//     return transactionContract;
// }

const notify = (message: string) => {
    if (window.Notification) {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
        new Notification(message);
    }
}

const buyToken = async (address: string, tokens: string) => {
    const contract = createEthereumContract(address);
    const options = {value: ethers.utils.parseEther(tokens)}
    await contract.buyToken(address, options);
}

const stakeToken = async (address: string, tokens: string) => {
    const contract = createEthereumContract(address);

    await contract.stakeToken(tokens);
}

const unStakeToken = async (address: string, tokens: string) => {
    const contract = createEthereumContract(address);

    await contract.unstakeToken(tokens);
}

export const TransactionProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [isClient, setIsClient] = useState<boolean>(false);


    const [transactions, setTransactions] = useState<any[]>([]);
    const [formData, setFormData] = useState<IFormData>({ addressTo: "", amount: "", keyword: "", message: "" });
    const [currentAccount, setCurrentAccount] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [transactionCount, setTransactionCount] = useState<number>(0);
    const [address, setAddress] = useState<string>("");
    const handleChange = (field: string, value:string) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const handleConnectWallet = async () => {
        if (ethereum) {
            try {
                const accounts = await ethereum.request({ method: "eth_requestAccounts" });
                const account = accounts[0];
                setCurrentAccount(account);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const checkIfWalletIsConnected = async () => {
        if (ethereum) {
            try {
                const accounts = await ethereum.request({ method: "eth_accounts" });
                if (accounts.length !== 0) {
                    const account = accounts[0];
                    setCurrentAccount(account);
                } else {
                    console.log("No authorized account found");
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Please install MetaMask");
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            const account = accounts[0];
            setCurrentAccount(account);

            window.location.reload();
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const sendTransaction = async () => {
        try {
            if (ethereum) {
                const {addressTo, amount, keyword, message} = formData;
                // create a new contract
                const transactionContract = createEthereumContract(address);
                // create options for the transaction
                const options = {
                    value: ethers.utils.parseEther(amount),
                    from: currentAccount,
                    to: addressTo,
                    gasLimit: 21000,
                }
                // send transaction
                await ethereum.request({
                    method: "eth_sendTransaction",
                    params: [options],
                });
                // hash of the transaction
                const transactionHash = await transactionContract.sendTransaction(addressTo, amount, keyword, message);
                // wait for the transaction to finish
                setIsLoading(true);
                console.log(`Loading - ${transactionHash.hash}`);
                await transactionHash.wait();
                console.log(`Success - ${transactionHash.hash}`);
                setIsLoading(false);

                const transactionCount = await transactionContract.getTransactionCount();
                // count the number of transactions
                setTransactionCount(transactionCount.toNumber());
                window.location.reload();

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        setIsClient(true);
    }, [transactionCount]);

    return (
       <TransactionContext.Provider
           value={{
                transactions,
                address,
                sendTransaction,
                connectWallet,
                checkIfWalletIsConnected,
                handleChange,
                setAddress,
                isClient,
           }}
       >
              {children}
       </TransactionContext.Provider>
    );
};
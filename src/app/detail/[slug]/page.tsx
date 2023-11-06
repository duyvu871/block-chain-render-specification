"use client";

import React, {useEffect, useLayoutEffect, useState} from 'react';
import Head from "next/head";
import { Wallet, CurrentCost, History } from "@/app/detail/[slug]/components";
import {tw} from "@/ultis/tailwind-ultis";
import {CryptoProvider} from "@/context/CryptoContext";
import axios, {AxiosResponse} from "axios";
type DeviceType = "mobile" | "tablet" | "desktop";

interface Transaction {
    balance: undefined | string;
    buyPrice: undefined | string;
    sellPrice: undefined | string;
    timeStamp: number | string;
    value: number | string;
    from: string;
}

interface Response {
    walletBalance: string,
    // buyPrice: buyPrice,
    // sellPrice: sellPrice,
    sellTransaction: Transaction[],
};

export default function Page({
    params,
}: {
    params: {  slug: string; }
}) {
    const [device, setDevice] = useState<DeviceType>("desktop");
    const [transaction, setTransaction] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState<string>("0")
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setDevice("mobile");
            } else if (window.innerWidth < 1024) {
                setDevice("tablet");
            } else {
                setDevice("desktop");
            }
        }
        handleResize();
    }, []);

    const getTransactions = async () => {
        const response: AxiosResponse = await axios.get(`/api/detail?address=${params.slug}&page=1&perPage=50`);
        const responseConvert: Response = response.data;
        setTransaction(responseConvert.sellTransaction.map(transaction => {
            return {
                from: transaction?.from || "",
                balance: responseConvert.walletBalance,
                buyPrice: transaction?.buyPrice || "10000",
                sellPrice: transaction?.sellPrice || "1000",
                timeStamp: transaction?.timeStamp || new Date().getTime(),
                value: transaction?.value || "1000",
            }
        }));
        setBalance(responseConvert.walletBalance);
        // console.log("sellTransaction", responseConvert.sellTransaction);
        // console.log("walletBalance", responseConvert.walletBalance);
        // console.log("response", responseConvert);
    }

    useEffect(() => {

        getTransactions();
    }, []);
    return (
        <React.Fragment>

                <Head>
                    <title>{`Wallet from ${params.slug}`}</title>
                    <meta name="description" content="Wallet page"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <main>
                    <div className={tw(
                        "h-full w-full mt-6",
                        (
                            device === "mobile" ? "flex flex-col items-center justify-center " :
                                device === "tablet" ? "flex flex-col items-center justify-center" :
                                    device === "desktop" ? "flex flex-col items-center justify-center " : ""
                        )
                    )}>
                        <div className={"flex flex-row items-start justify-start w-full "}>
                            <Wallet
                                walletRemain={balance || 1}
                                cryptoType={"USDT"}
                                className={" max-w-[300px]"}/>
                            <CryptoProvider>
                                <CurrentCost
                                    currentCost={1000}
                                    cryptoType={"USDT"}
                                    className={"grid-in-cost mr-4 w-fit"}
                                    market={{
                                        marketCap: 1000,
                                        volume: 1000,
                                        supply: 1000,
                                        currencyType: "USD",
                                        sentiment: {
                                            positive: 1.5,
                                            negative: 2.6,
                                        }
                                    }}
                                />
                            </CryptoProvider>
                        </div>
                        <History transactions={transaction} className={"w-full px-10"}/>
                    </div>

                </main>
        </React.Fragment>
    )
}
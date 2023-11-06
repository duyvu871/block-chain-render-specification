"use client";

import {createContext, ReactNode, useLayoutEffect, useState} from 'react';

export const CryptoContext = createContext({
    cryptoData: {},
    searchData: [],
    getSearchResult: (query: string) => {},
    setCoinSearch: (coinid: string) => {},
    setSearchData: (data: any) => {},
    currency: "",
    setCurrency: (currency: string) => {},
    sortBy: "",
    setSortBy: (sortBy: string) => {},
    page: 1,
    setPage: (page: number) => {},
    totalPages: 250,
    resetFunction: () => {},
    setPerPage: (perPage: number) => {},
    perPage: 10,
    getCoinData: (coinid: string) => {},
    coinData: {},
    setCoinData: (data: any) => {},
    error: { data: "", coinData: "", search: "" }
});

export const CryptoProvider = ({children}: { children: ReactNode }) => {
    const [cryptoData, setCryptoData] = useState<any>([]);
    const [searchData, setSearchData] = useState<any>([]);
    const [coinData, setCoinData] = useState<{}>("");

    const [coinSearch, setCoinSearch] = useState<any>("Etherium");

    const [currency, setCurrency] = useState<string>("ETH");
    const [sortBy , setSortBy] = useState<string>("market_cap_rank");
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(250);

    const [error, setError] = useState({ data: "", coinData: "", search: "" });

    const getCryptoData = async () => {
        //here we will set an empty string for the data error
        setError({ ...error, data: "" });
        // setCryptoData("");

        try {
            const data = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
            ).then(async (res) => {
                if (res.ok) {
                    return res.json();
                }
                let errorResponse = await res.json();
                // here we might get the error so it is best to handle it and throw the error
                // console.log(errorResponse);
                setError({ ...error, data: errorResponse.error });
                throw new Error(errorResponse.error);
            }).then((json) => json);

            // console.log(data);
            setCryptoData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getCoinData = async (coinid : string) => {
        // setCoinData("");
        try {
            const data = await fetch(
                `https://api.coingecko.com/api/v3/coins/${coinid}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
            )
                .then((res) => res.json())
                .then((json) => json);

            // console.log("CoinData", data);
            setCoinData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getSearchResult = async (query: string) => {
        try {
            const data = await fetch(
                `https://api.coingecko.com/api/v3/search?query=${query}`
            )
                .then((res) => res.json())
                .then((json) => json);

            // console.log(data);
            setSearchData(data.coins);
        } catch (error) {
            console.log(error);
        }
    };

    const resetFunction = () => {
        setPage(1);
        setCoinSearch("Etherium");
    };

    useLayoutEffect(() => {
        getCryptoData();
    }, [coinSearch, currency, sortBy, page, perPage]);

    return (
        <CryptoContext.Provider
            value={{
                cryptoData,
                searchData,
                getSearchResult,
                setCoinSearch,
                setSearchData,
                currency,
                setCurrency,
                sortBy,
                setSortBy,
                page,
                setPage,
                totalPages,
                resetFunction,
                setPerPage,
                perPage,
                getCoinData,
                coinData,
                setCoinData,
                error
            }}
        >
            {children}
        </CryptoContext.Provider>
    );
}
import { tw } from "@/ultis/tailwind-ultis";
import Image from "next/image";
import {assets} from "@/ultis/asset-ultis";
// import Badge from "@/components/badge";
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import {formatCurrency, usdtToVndIntegers} from "@/ultis/currency";
import {CryptoContext, CryptoProvider} from "@/context/CryptoContext";
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     Tooltip,
//     CartesianGrid,
//     Legend,
//     ResponsiveContainer,
// } from "recharts";
// import {CategoryScale, Chart} from 'chart.js';
// Chart.register(CategoryScale);
// import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Chart, Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

interface cost {
    cryptoType: string;
    cost: number | string;
    data: Array<{ cost: number | string; volume?: number | string }>;
}

interface Market {
    marketCap: number | string;
    volume: number | string;
    supply: number | string;
    currencyType: string;
    sentiment: {
        positive: number | string;
        negative: number | string;
    };
}

interface ChartData {
    labels: string[];
    datasets: [
        {
            label: string;
            data: number[];
            fill: boolean;
            backgroundColor: string;
            borderColor: string;
        }
    ];
}

const LineChart = ({ data }: { data: ChartData }) => {
    return (
        <Line
            data={data}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        grid: {
                            display: false,
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            }}
        />
    );
};

const ChartLayout = ({
    id,
    days,
    type,
    setType,
    setDays
}: {
    id: string;
    days: number;
    type: string;
    setType: (str: string) => void,
    setDays: (num: number) => void;

}) => {

    const [chartData, setChartData] = useState<ChartData>();
    // let { currency } = useContext(CryptoContext);
    const [coinFetchedData, setCoinFetchedData] = useState<any>();

    useEffect(() => {
        const getChartData = async (id: string) => {
            try {
                const data = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
                )
                    .then((res) => res.json())
                    .then((json) => json);

                console.log("chart-data", data);
                setCoinFetchedData(data);
                // let convertedData = data[type].map((item: any) => {
                //     return {
                //         date: new Date(item[0]).toLocaleDateString(),
                //         [type]: item[1],
                //     };
                // });
                //
                // console.log(convertedData);
                setChartData({
                    labels: data[type].map((item: any[]) => new Date(item[0]).toLocaleDateString()),
                    datasets: [
                        {
                            label: type,
                            data: data[type].map((item: any[]) => item[1]),
                            fill: false,
                            backgroundColor: "#14ffec",
                            borderColor: "#14ffec",
                        },
                    ],
                });
            } catch (error) {
                console.log(error);
            }
        };

        if (!chartData) {
            getChartData(id);
        } else {
            setChartData({
                labels: coinFetchedData[type].map((item: any[]) => new Date(item[0]).toLocaleDateString()),
                datasets: [
                    {
                        label: type,
                        data: coinFetchedData[type].map((item: any[]) => item[1]),
                        fill: false,
                        backgroundColor: "#14ffec",
                        borderColor: "#14ffec",
                    },
                ],
            });
        }
        // const interval = setInterval(() => {
        //     getChartData(id);
        // }  , 10000);
        // return () => clearInterval(interval);
    }, [id, type, days]);

    return (

            <div className={"h-[250px]"}>
                {chartData && (
                    <LineChart
                        data={chartData}
                        // currency={currency}
                        // type={type}
                    />
                )}
            <div className="flex">
                <button
                    className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
                        type === "prices"
                            ? "bg-cyan text-gray-800"
                            : "bg-gray-200 text-gray-100"
                    }`}
                    onClick={() => setType("prices")}
                >
                    Price
                </button>
                <button
                    className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
                        type === "market_caps"
                            ? "bg-cyan text-gray-800"
                            : "bg-gray-200 text-gray-100"
                    }`}
                    onClick={() => setType("market_caps")}
                >
                    market caps
                </button>
                <button
                    className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
                        type === "total_volumes"
                            ? "bg-cyan text-gray-800"
                            : "bg-gray-200 text-gray-100"
                    }`}
                    onClick={() => setType("total_volumes")}
                >
                    total volumes
                </button>

                <button
                    className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
                        days === 7 ? "bg-cyan text-gray-800" : "bg-gray-200 text-gray-100"
                    }`}
                    onClick={() => setDays(7)}
                >
                    7d
                </button>
                <button
                    className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
                        days === 14 ? "bg-cyan text-gray-800" : "bg-gray-200 text-gray-100"
                    }`}
                    onClick={() => setDays(14)}
                >
                    14d
                </button>
                <button
                    className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
                        days === 30 ? "bg-cyan text-gray-800" : "bg-gray-200 text-gray-100"
                    }`}
                    onClick={() => setDays(30)}
                >
                    30d
                </button>
            </div>
        </div>

    );
};

const Label = ({ title, mainValue,  commonValue}: { title: string; mainValue: string, commonValue: string }) => {
    return (
        <div className={"mt-3"}>
            <p className={"text-gray-400 text-[12px]"}>{title}</p>
            <div className={"text-gray-200"}>
                <p>
                    {mainValue}
                </p>
            </div>
            <div className={"text-gray-500 text-[12px]"}>
                <p>
                    {commonValue}
                </p>
            </div>
        </div>
        );
}

const CurrentCost = ({
    currentCost,
    cryptoType,
    market,
    className,
}: {
    currentCost: number;
    cryptoType: string;
    market: Market;
    className: string;
}) => {
    const [type, setType] = useState<string>("prices");
    const [days, setDays] = useState<number>(7);
    const { getCoinData, coinData, setCoinData } = useContext(CryptoContext);
    const [id, setId] = useState<string>("ethereum");
    useLayoutEffect(() => {
        const getChartData = async (id: string) => {
            try {
                const data = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
                )
                    .then((res) => res.json())
                    .then((json) => json);

                console.log("coin-data", data);


                setCoinData(data);
            } catch (error) {
                console.log(error);
            }
        };

        getChartData(id);
    }, [id]);

    return (
            <div className={tw(
                " p-5 bg-gray-800 rounded-xl",
                "flex flex-row items-start p-6 w-full gap-2",
                className)
            }>
                <div className={"w-fit flex flex-col"}>
                    <div className={"flex flex-row w-fit justify-items-center items-center gap-1"}>
                        <Image
                            src={assets.cryptoIcon[13]}
                            alt={"crypto icon"}
                            style={{objectFit: "contain"}}
                            width={30}
                            height={30}
                        />
                        <h1 className={" text-gray-100 text-[20px]"}>Ethereum</h1>
                        <span className={tw(
                            "w-fit h-fit bg-green-700 bg-opacity-30 text-green-800 text-xs font-semibold px-2 py-0.5 rounded",
                            "text-green-400 place-content-center grid",
                            // "text-sm py-0.5 px-2.5 ml-2 bg-cyan text-cyan rounded bg-opacity-25 uppercase"
                        )}>
                  ETH
              </span>
                    </div>
                    <Label
                        title={"Giá hiện tại:"}
                        mainValue={
                            formatCurrency(
                                String(coinData?.market_data?.current_price["usd"] || "1")
                            ) + " " + market.currencyType
                        }
                        commonValue={
                            "≈ đ" + usdtToVndIntegers(
                                String(coinData?.market_data?.current_price["usd"] || "1"),
                                "23000"
                            )
                        }/>
                    <Label
                        title={"Vốn hóa thị trường:"}
                        mainValue={(
                            formatCurrency(
                                String(
                                    coinData?.market_data?.market_cap["usd"] || "1"
                                )
                            ) + " " + market.currencyType
                        )}
                        commonValue={
                            "≈ đ" + usdtToVndIntegers(
                                String(
                                    coinData?.market_data?.market_cap["usd"] || "1"
                                ),
                                "23000"
                            )
                        } />

                    <Label
                        title={"Tổng khối lượng:"}
                        mainValue={(
                            formatCurrency(
                                String(
                                    coinData?.market_data?.total_volume["usd"] || "1"
                                )
                            ) + " " + market.currencyType
                        )}
                        commonValue={
                            "≈ đ" + usdtToVndIntegers(
                                String(
                                    coinData?.market_data?.total_volume["usd"] || "1"
                                ),
                                "23000"
                            )
                        } />

                    <div className={"mt-3"}>
                        <p className={"text-gray-400 text-[12px]"}>Mức tăng giảm:</p>
                        <span className={tw(
                            "flex flex-row items-center w-fit h-fit bg-green-700 bg-opacity-30 text-green-800 text-xs font-semibold px-2 py-0.5 rounded",
                            "text-green-400 "
                        )}>
                            <span>{
                                coinData?.market_data?.["price_change_percentage_" + days + "d"] > 0
                                    ? coinData?.market_data?.["price_change_percentage_" + days + "d"]
                                    : "0"
                            }%</span>
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                   className={"w-3 h-3 ml-1 fill-green-400  rotate-180"}
                                  // width={14} height={14}
                                  // fill={"#2563eb"}
                                   viewBox="0 0 512 512"
                                   preserveAspectRatio="xMidYMid meet">

                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                   fill="inherit" stroke="none">
                                <path d="M161 3949 c-18 -6 -54 -31 -81 -58 -84 -84 -102 -200 -46 -295 14
                                -22 555 -571 1203 -1218 919 -918 1188 -1182 1223 -1197 59 -27 141 -27 200 0
                                35 15 304 279 1223 1197 648 647 1189 1196 1203 1218 56 95 38 211 -46 295
                                -29 29 -63 52 -86 58 -51 14 -4743 14 -4793 0z"/>
                                </g>
                            </svg>

                                    {/*<Image src={"/arrow-up.svg"} width={10} height={10} alt={"up icon"} />*/}
                        </span>
                        <span className={tw(
                            "flex flex-row items-center w-fit h-fit bg-[#fa5252] bg-opacity-30  text-xs font-semibold px-2 py-0.5 rounded",
                            "text-red-600 mt-1"
                        )}>
                            <span>{
                                coinData?.market_data?.["price_change_percentage_" + days + "d"] < 0
                                    ? coinData?.market_data?.["price_change_percentage_" + days + "d"]
                                    : "0"
                            }%</span>
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                className={"w-3 h-3 ml-1 fill-red-600"}
                               // width={14} height={14}
                               // fill={"#2563eb"}
                                viewBox="0 0 512 512"
                                preserveAspectRatio="xMidYMid meet">

                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                   fill="inherit" stroke="none">
                                <path d="M161 3949 c-18 -6 -54 -31 -81 -58 -84 -84 -102 -200 -46 -295 14
                                -22 555 -571 1203 -1218 919 -918 1188 -1182 1223 -1197 59 -27 141 -27 200 0
                                35 15 304 279 1223 1197 648 647 1189 1196 1203 1218 56 95 38 211 -46 295
                                -29 29 -63 52 -86 58 -51 14 -4743 14 -4793 0z"/>
                                </g>
                            </svg>
                      </span>
                    </div>
                </div>
                <ChartLayout
                    days={days}
                    type={type}
                    setType={setType}
                    setDays={setDays}
                    id={"ethereum"}
                />
            </div>
    )
}

export default CurrentCost;
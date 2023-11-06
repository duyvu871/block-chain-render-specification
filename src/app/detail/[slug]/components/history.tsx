import {tw} from "@/ultis/tailwind-ultis";
import {assets} from "@/ultis/asset-ultis";
import Image from "next/image";
import {ReactNode, useEffect, useState} from "react";
import {formatCurrency, usdtToVndIntegers, divideLargeIntegers} from "@/ultis/currency";

interface tradingTransaction {
    from: string;
    balance: undefined | string;
    buyPrice: undefined | string;
    sellPrice: undefined | string;
    sellTransaction?: (number | string)[];
    timeStamp: number | string;
    value: number | string;
}

type status = "SELL" | "BUY" | "HOLD";

const Badge = ({
content,
status,
}: {
    content: string;
    status: status;
}) => {
    return (
        <span className={tw(
            "w-fit h-fit  place-content-center grid text-xs font-semibold px-2 py-0.5 rounded",
            (status === "SELL" ?
                "bg-[#fa5252] bg-opacity-30 text-red-600"
                : status === "BUY"
                    ? "text-green-400 bg-green-700 bg-opacity-30"
                    : status === "HOLD"
                        ? "text-gray-400 bg-gray-700 bg-opacity-100"
                        : ""
            )
            // "text-sm py-0.5 px-2.5 ml-2 bg-cyan text-cyan rounded bg-opacity-25 uppercase"
        )}>
            {content}
        </span>
    )
}

const HistoryItem = ({
    transaction
}: {
  transaction: tradingTransaction;
}) => {
    const [status, setStatus] = useState<status>("SELL");
    const [timeStamp, setTimeStamp] = useState<string>("")


    useEffect(() => {
        setStatus((transaction.buyPrice) ? "BUY" : (transaction.sellPrice) ? "SELL" : "HOLD");
        const currentDate = new Date(Number(transaction.timeStamp)*1000);
        // console.log("currentDate", transaction.timeStamp)
        // Format thời gian ngắn gọn (VD: "2023-10-29")
        const shortDateFormat = currentDate.toISOString().split('T')[0];

        // Format thời gian đầy đủ (VD: "Thứ Bảy, 29 Tháng 10, 2023 16:30:45 GMT+0700 (Giờ Đông Dương Việt Nam)")
        // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short', hour12: false };
        const fullDateFormat = currentDate.toLocaleString('vi-VN');
        setTimeStamp(fullDateFormat);
    }, []);

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 ">
                <div className={"flex flex-row w-fit justify-items-center items-center gap-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"}>
                    <Image
                        src={assets.cryptoIcon[13]}
                        alt={"crypto icon"}
                        style={{objectFit: "contain"}}
                        width={20}
                        height={20}
                    />
                    <span>
                    ETH
                    </span>
                </div>
            </th>
            <td className="px-6 py-4 w-[100px]">
                <Badge content={status} status={status}/>
            </td>
            <td className="px-2 py-4 wrap-anywhere max-w-[200px]">
                {transaction.from || "0x000000"}
            </td>
            <td className="px-2 py-4">
                {timeStamp || "NULL"}
            </td>
            <td className="px-2 py-4 wrap-anywhere max-w-[200px]">
                {formatCurrency(divideLargeIntegers(String(transaction.value), 1e18.toString())) +" ETH" || "NULL"}
            </td>
            <td className="px-2 py-4">
                {transaction.buyPrice ? formatCurrency(String(transaction.buyPrice))  + " Usdt" : "0"}
            </td>
            <td className="px-2 py-4">
                {transaction.sellPrice ? formatCurrency(String(transaction.sellPrice)) + " Usdt" : "0"}
            </td>
            <td className="px-2 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
        </tr>
    )
}

const History = ({
    transactions,
    className,
}: {
    transactions: tradingTransaction[];
    className: string;
}) => {
  return (
    <div className={tw("mt-6", className)}>
        {/*<h1>History</h1>*/}

            <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-2 py-3 w-[100px]">
                            Loại tài sản
                        </th>
                        <th scope="col" className="px-2 py-3 w-[100px]">
                            Trạng thái
                        </th>

                        <th scope="col" className="px-2 py-3 w-[170px]">
                            Địa chỉ
                        </th>
                        <th scope="col" className="px-2 py-3 w-[170px]">
                            Thời gian
                        </th>
                        <th scope="col" className="px-2 py-3 max-w-[200px] w-fit" >
                            khối lượng
                        </th>
                        <th scope="col" className="px-2 py-3 w-[80px]">
                            Giá mua
                        </th>
                        <th scope="col" className="px-2 py-3 w-[80px]">
                            Giá bán
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((transaction, index) => {
                        return (
                            <HistoryItem
                                key={"history-item-" + String(index)}
                                transaction={transaction}
                            />
                        )
                    })}
                    </tbody>
                </table>
            </div>
    </div>
  );
}

export default History;
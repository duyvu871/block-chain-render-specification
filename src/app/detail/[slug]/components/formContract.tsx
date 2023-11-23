import React, {useState, useContext} from "react";
import ContractField from "@/components/input/contractField";
import { SiEthereum, SiHiveBlockchain } from "react-icons/si";
import SubmitButton from "@/components/button/SubmitButton";
import {ContractCheckbox} from "@components/checkbox";
import {tw} from "@/ultis/tailwind-ultis";
import { IoIosSend } from "react-icons/io";
import {TransactionContext} from "@/context/TransactionContext";

interface contractData {
    addressBuy: string;
    addressSell: string;
    amount: number;
    code: string;
}

interface FormContractProps {
    formData: any;
    setFormData: (data: any) => void;
    field: React.ReactNode;
}

const FormContractField = ({
    
}) => {

}

export const FormContract = ({
    formData,
} : {
    formData: FormContractProps;
}) => {

    const {
        sendTransaction,
        address,
        setAddress,
        connectWallet,
        checkIfWalletIsConnected,
        handleChange
    } = useContext(TransactionContext);
    const [data, setData] = useState<contractData>({
        addressBuy: "",
        addressSell: "",
        amount: 0,
        code: "",
    });
    const [confirmContract, setConfirmContract] = useState<boolean>(false)
    const sendRegister = () => {
        console.log("send register");
    }

    const sendContract = async () => {
        if (confirmContract) {
            const contractData = {
                addressBuy: data.addressBuy,
                addressSell: data.addressSell,
                amount: data.amount,
                code: data.code,
            }

            try {
                const response = await fetch("/api/v1/contract", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(contractData),
                });

                if (!response.ok) {
                    // Handle non-successful response (status not in the range 200-299)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
            } catch (error) {
                // Handle network errors or errors during JSON parsing
                console.error("Fetch error:", error);
            }

        } else {
            console.log("not confirm contract");
        }
    }

    return (
        <div>
            <ContractField
                label={"Địa chỉ mua"}
                type={"text"}
                setValue={(e: React.MouseEvent) => {
                    setData({
                        ...data,
                        addressBuy: e.target?.value,
                    })
                }}
                placeholder={"0x000000..."}
                />
            <ContractField
                label={"Địa chỉ bán"}
                type={"text"}
                setValue={(e: React.MouseEvent) => {
                    setData({
                        ...data,
                        addressSell: e.target?.value,
                    })
                }}
                placeholder={"0x000000..."}
            />
            <div className={"flex flex-row justify-between items-end w-full"}>
                <ContractField
                    label={"Số lượng"}
                    type={"number"}
                    setValue={(e: React.MouseEvent) => {
                        setData({
                            ...data,
                            amount: e.target?.value,
                        })
                    }}
                    placeholder={"10 ETH"}
                    props={{
                        min: 0,
                        step: 0.01,
                    }}
                />
                <div className={"flex flex-row justify-center items-center my-4 p-2"}>
                    <SiEthereum className={"text-2xl text-gray-400 mr-2"} />
                    <span className={"text-gray-400 text-sm"}>ETH</span>

                </div>

            </div>
            <div className={"flex flex-row justify-start items-end"}>
                <ContractField
                    label={"Mã xác thực"}
                    type={"text"}
                    setValue={(e: React.MouseEvent) => {
                        setData({
                            ...data,
                            code: e.target?.value,
                        })
                    }}
                    placeholder={"XXXXXXX"}
                    className={""}
                    wrapperStyle={"w-40"}
                />
                <div className={"flex flex-row justify-center items-center my-3 p-2"}>
                    <SubmitButton
                        onClick={sendRegister}
                        className={"font-semibold text-xs rounded-lg w-fit bg-blue-600 hover:bg-blue-700"}

                    >
                        Xác thực
                    </SubmitButton>
                </div>

            </div>
            <div className={"flex flex-row justify-start items-center  p-2"}>
                <ContractCheckbox
                    setConfirm={(value: boolean) => {setConfirmContract(value)}}
                    label={"Đồng ý với điều khoản"}
                    className={"text-xl text-gray-400"}
                    wrapperStyle={"text-sm"}
                />
            </div>
            <div className={"flex flex-row justify-center items-center p-2"}>
                <button
                    type={"button"}
                    onClick={sendContract}
                    className={tw(
                        "flex flex-row justify-center items-center my-5 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full cursor-pointer",
                        "transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110",
                        "md:text-lg text-sm",
                        "md:w-52 w-40 md:text-xl "
                    )}
                >
                    <IoIosSend className={"mr-2"}/>
                    <p className={"text-white md:text-base font-semibold"}>
                        Thiết lập hợp đồng
                    </p>
                </button>
            </div>
        </div>
    )
}
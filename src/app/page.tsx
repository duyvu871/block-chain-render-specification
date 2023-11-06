'use client'

import { assets } from "@/ultis/asset-ultis";
import Image from "next/image";
import {useState, useEffect, ChangeEvent} from "react";
import { tw } from "@/ultis/tailwind-ultis";
import {CryptoRotation} from "@/components/crypto-rotation";
import { RegisterButton } from "@/components/register";

const similarColor: string[] = [
    "bg-pink-600",
    "bg-yellow-500",
    "bg-orange-400",
    "bg-orange-500",
    "bg-blue-800",
    "bg-gray-700",
    "bg-gray-800",
    "bg-blue-700",
    "bg-red-500",
    "bg-green-500",
    "bg-blue-800",
    "bg-blue-500",
    "bg-orange-500",
    "bg-blue-400",
    "bg-blue-600",
];

const similarColorText: string[] = similarColor.map((color) => color.replace("bg", "text"));
// console.log(similarColorText);
export default function Home() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const [crypto, setCrypto] = useState<string>(assets.cryptoIcon[0]);
    const [cryptoIndex, setCryptoIndex] = useState<number>(0);
    const [showBackground, setShowBackground] = useState<boolean>(false)
    const [isSubmit, setSubmitState] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");
    const [isTokenValid, setIsTokenValid] = useState<boolean>(false);

    const directToDetailPage = () => {
        if (!token) {
            setIsTokenValid(false);
            return;
        } else {
            setIsTokenValid(true);
            window.location.href = "/detail/" + token;
        }
    }

    useEffect(() => {
        let currentIndex = 0;
        const rotateCrypto = () => {
            setCrypto(assets.cryptoIcon[currentIndex]);
            setCryptoIndex(currentIndex);
            // setCurrentColor(similarColor[cryptoIndex].replace("bg", "text"));
            currentIndex  = (currentIndex + 1) % assets.cryptoIcon.length;
        }

        const interval = setInterval(rotateCrypto, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setShowBackground(true);
    }, []);

    return (
        <main >
            {/*background color*/}
            <div className={tw(
                "fixed inset-0 transition-colors delay-100 duration-700 ease-out",
                similarColor[cryptoIndex]
                )} />
            {/*grid*/}
            <div
                className={"fixed inset-0 opacity-30" }
                style={{
                    backgroundImage: `url(${assets.square})`,
                    backgroundSize: "30px"
                }}
            ></div>
            {/*gradient*/}
            <Image src={assets.gradient}
                   className={"fixed inset-0 w-screen h-screen object-cover"}
                   height={1200} width={1200}
                   role={"presentation"}
                   alt={"gradiant background"}
            />
            {/*Reveal*/}
            <div className={tw(
                "bg-black fixed inset-0 transition-opacity duration-1000",
                (!showBackground ? "opacity-100" : "opacity-0")
                )} />
            <div className={"fixed max-w-7xl mt-20 mx-auto inset-0"}>
                <div className={"flex flex-col items-center"}>
                    <div className={"flex flex-row items-center"}>
                        {/*<Image*/}
                        {/*    src={assets.cryptoIcon[cryptoIndex]}*/}
                        {/*    height={100}*/}
                        {/*    width={100}*/}
                        {/*    alt={"logo"}*/}
                        {/*    className={"rounded-full inline-block mr-4 border-2 border-white stroke-white"}*/}
                        {/*/>*/}
                        <CryptoRotation currentCrypto={cryptoIndex} />
                        <h1 className={"text-6xl font-bold text-white"}>Crypto</h1>
                    </div>
                    <h2 className={tw( "text-3xl text-center font-bold mt-3 mx-auto")}>
                        Crypto
                        <span
                            className={tw(
                                "transition-colors duration-200",
                                [
                                    "text-pink-600",
                                    "text-yellow-500",
                                    "text-orange-400",
                                    "text-orange-500",
                                    "text-blue-800",
                                    "text-gray-700",
                                    "text-gray-800",
                                    "text-blue-700",
                                    "text-red-500",
                                    "text-green-500",
                                    "text-blue-800",
                                    "text-blue-500",
                                    "text-orange-500",
                                    "text-blue-400",
                                    "text-blue-600"
                                ][cryptoIndex]
                            )}
                        >{" "}trading{" "}</span>
                        for everyone
                    </h2>
                    <div className={"flex flex-row items-center mt-20"} >
                        <input
                            className={tw(
                                "py-2 px-4 rounded mr-4 outline-none",
                                similarColorText[cryptoIndex],
                                "placeholder-gray-400",
                                "transition-colors duration-200",
                                (isSubmit
                                    ? isTokenValid ? "border-2 border-green-500" : "border-2 border-red-500"
                                    : "border-2 border-white"
                                )
                            )}
                            placeholder={"Token"}
                            value={token}
                            onChange={(e) => setToken(e.target.value)} />
                        <RegisterButton
                            onClick={(event) => {
                                setSubmitState(true);
                                directToDetailPage();
                            }}
                            colorPicker={{static: similarColor[cryptoIndex]}}
                        >
                            Join now
                        </RegisterButton>
                    </div>
                </div>
            </div>

        </main>
    )
}
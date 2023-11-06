import Image from "next/image";
import { assets } from "@/ultis/asset-ultis";
import { tw } from "@/ultis/tailwind-ultis";
import {className} from "postcss-selector-parser";

export const CryptoRotation = ({currentCrypto} : {
    currentCrypto: number | string;
}) => {

    return (
        <div className={"mx-2 -mt-2 align-middle inline-flex relative h-[80px] w-[80px]"} >
            {assets.cryptoIcon.map(
                (cryptoImageUrl, index) => {
                    return (
                        <Image
                          key={"crypto-image" + String(index)}
                          src={cryptoImageUrl}
                          height={100}
                          width={100}
                          alt={"logo"}
                          // className={"rounded-full inline-block mr-4 border-2 border-white stroke-white"}
                          // width={}
                          // alt={"crypto-image"}
                          className={tw(
                              "w-full h-full object-contain object-center absolute top-0 left-0 transition-all duration-300",
                                "rounded-full inline-block mr-4 border-2 border-white stroke-white",
                                (index === Number(currentCrypto)
                                    ? "opacity-100 transform-none"
                                    : index > Number(currentCrypto) ? "opacity-0 -translate-y-2" : "opacity-0 translate-y-2")
                          )}
                        />
                    );
                })
            }
        </div>
    );
}
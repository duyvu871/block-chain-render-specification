import {tw} from "@/ultis/tailwind-ultis";
import { NumericFormat } from "react-number-format";
import Image from "next/image";
import {formatCurrency, usdtToVndIntegers} from "@/ultis/currency";
import RegisterButton from "@/components/register/button";
const Wallet = ({
    walletRemain,
    cryptoType,
    className,
}: {
    walletRemain: number | string;
    cryptoType: string;
    className: string;
}) => {
    return (
      <div className={tw(
          "flex flex-col items-start pr-5 pl-10 gap-2",
          className
      )}>
          <div className={"p-5 bg-gray-800 rounded-xl"}>
              <h1 className={"text-gray-400 text-[12px]"}>
                  Tổng tài sản
                  {/*<Image src={} alt={} />*/}
              </h1>
              <div  className={"text-gray-200"}>
                    <p className={"wrap-anywhere"}>
                        {formatCurrency(String(walletRemain))}{" "}{cryptoType}
                    </p>
              </div>
              <div  className={"text-gray-500 text-[12px]"}>
                  <p className={"wrap-anywhere"}>
                      ≈đ{usdtToVndIntegers(walletRemain, 23000)}
                  </p>
              </div>
          </div>
          <div className={"flex flex-row  items-start flex-wrap gap-2"}>
              <RegisterButton
                  onClick={() => {}}
                  className={"text-[12px] text-gray-200"}
              >
                  Mua
              </RegisterButton>
              <RegisterButton
                  onClick={() => {}}
                  className={"text-[12px] text-gray-200"}
                  colorPicker={{
                      static: "bg-gray-700",
                  }}>
                 Bán
              </RegisterButton>
              <RegisterButton
                  onClick={() => {}}
                  className={"text-[12px] text-blue-500 border-2 border-blue-500"}
                  colorPicker={{
                      static: "bg-gray-900",
                  }}>
                  Chuyển quỹ
              </RegisterButton>
              <RegisterButton
                  onClick={() => {}}
                  className={"text-[12px] text-blue-500 border-2 border-blue-500"}
                  colorPicker={{
                      static: "bg-gray-900",
                  }}>
                  Quy đổi
              </RegisterButton>
          </div>
      </div>
    )
}

export default Wallet;
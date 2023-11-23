import Image from "next/image";
import Link from "next/link";
import {tw} from "@/ultis/tailwind-ultis";
import {useState} from "react";

import ToolbarContent from "@components/toolBar/ToolbarContent";
import ToolbarItem from "@components/toolBar/ToolbarItem";
import ToolbarTrigger from "@components/toolBar/ToolbarTrigger";

import UserProfileAvatar from "@components/User/UserProfileAvatar";


import {DeviceType} from "@/types/responsive";
import { MdOutlineMenuOpen } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { IoIosNotifications } from "react-icons/io";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
// import {UserProfile} from "@firebase/auth";

const PreInitUserProfile = {
    displayName: "Chưa đăng nhập",
    email: "anonymous",
    phoneNumber: "",
    photoURL: "",
    providerId: "",
    uid: "",
}

const TriggerType = {
    Menu: {
        close: MdOutlineClose,
        open: MdOutlineMenuOpen
    }
}

type NavigatorType = "user" | "notification" | "transaction" | "setting";

interface UserProfile {
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    providerId: string;
    uid: string;
}

interface ToolBarProps {

}

const ToolBar = ({

}: ToolBarProps) => {
    const [visibility, setVisibility] = useState<boolean>(false);
    const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
    const [userProfile, setUserProfile] = useState<UserProfile>(PreInitUserProfile);
    const [navigatorActive, setNavigatorActive] = useState<NavigatorType>("user");
    // const [/]


    const CurrentTrigger = TriggerType.Menu[visibility ? "close" : "open"];

    const checkActiveNavigator = (navigator: NavigatorType): boolean => {
        return navigator === navigatorActive;
    }

    const toolbarItemAction = (navigator: NavigatorType) => {
        return {
            active: checkActiveNavigator(navigator),
            role: navigator,
            action: () => setNavigatorActive(navigator)
        }
    }



    return (
        <div className={tw(
            "flex flex-row justify-between items-center h-[62px] w-full",
            "bg-gray-800",
            "p-2 ",
            // "border-b border-gray-200",
            // "fixed top-0 left-0 z-10",
        )}>
            {/* Menu Trigger */}
            <ToolbarTrigger action={() => setVisibility(!visibility)} >
                <CurrentTrigger className={"text-3xl text-gray-400"}/>
            </ToolbarTrigger>
            {/* User Navigator */}
            <UserProfileAvatar userAvatarInfo={userProfile} />
            {/* Sidebar  */}
            {visibility && (
            <ToolbarContent className={"top-[62px] h-[calc(100%-62px)]"}>
                <ToolbarItem {...toolbarItemAction("user")} >
                    <RxAvatar className={"text-2xl text-gray-300 mr-2"} />
                    <span className={"text-gray-300 text-xl"}>Hồ sơ người dùng</span>
                </ToolbarItem>
                <ToolbarItem {...toolbarItemAction("notification")}>
                    <IoIosNotifications className={"text-2xl text-gray-300 mr-2"} />
                    <span className={"text-gray-300 text-xl"}>Thông báo</span>
                </ToolbarItem>
                <ToolbarItem {...toolbarItemAction("transaction")}>
                    <AiOutlineTransaction className={"text-2xl text-gray-300 mr-2"} />
                    <span className={"text-gray-300 text-xl"}>Giao dịch</span>
                </ToolbarItem>
                <ToolbarItem {...toolbarItemAction("setting")}>
                    <IoIosSettings className={"text-2xl text-gray-300 mr-2"} />
                    <span className={"text-gray-300 text-xl"}>Cài đặt</span>
                </ToolbarItem>
            </ToolbarContent>
            )}
        </div>
    )
}

export default ToolBar;

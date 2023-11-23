import Image from "next/image";
import {RxAvatar} from "react-icons/rx";

interface UserProfileAvatarProps {
    userAvatarInfo: {
        displayName?: string;
        email?: string;
        phoneNumber?: string;
        photoURL: string;
        providerId?: string;
        uid?: string;
    };
}

const UserProfileAvatarType = {
    anonymous: RxAvatar,
    user: Image
};

const UserProfileAvatar = ({
    userAvatarInfo,
}: UserProfileAvatarProps) => {

    const CurrentAvatar = UserProfileAvatarType[userAvatarInfo.photoURL ? "user" : "anonymous"];

    return (
        <div className={"flex flex-row items-center cursor-pointer"}>
            <CurrentAvatar  className={"text-3xl text-gray-400 mr-2"} src={userAvatarInfo.photoURL} alt={"user avatar"}/>
            <div className={"flex flex-col"}>
                <span className={"text-sm text-gray-400"}>{userAvatarInfo.displayName}</span>
                <span className={"text-xs text-gray-400"}>{userAvatarInfo.email}</span>
            </div>
        </div>
    )
}

export default UserProfileAvatar;
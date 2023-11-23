


interface NotificationItem {
    title: string;
    content: string;
    type: string;
    timeCreate: number | string;
}

interface NotificationProps {
    notificationList: NotificationItem[];
}

const Notification = ({
    notificationList,
}: NotificationProps) => {
    return (
        <div className={"flex flex-col justify-start items-start w-full"}>
            <div className={"flex flex-row justify-between items-center w-full"}>
                <span className={"text-lg font-semibold"}>Thông báo</span>
                <span className={"text-sm font-semibold text-gray-400"}>Xem tất cả</span>
            </div>
            <div className={"flex flex-col justify-start items-start w-full"}>
                {notificationList.map((item, index) => (
                    <div key={index} className={"flex flex-col justify-start items-start w-full"}>
                        <span className={"text-sm font-semibold"}>{item.title}</span>
                        <span className={"text-xs font-semibold text-gray-400"}>{item.content}</span>
                        <span className={"text-xs font-semibold text-gray-400"}>{item.timeCreate}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notification;

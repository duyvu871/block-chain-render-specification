import Link from "next/link";

interface UserProfileItemProps {
    content: string;
    isDirect: boolean;
    link?: string | null;
    children?: React.ReactNode;
}

const UserNavigationItem = ({
    isDirect, link, children
}: UserProfileItemProps) => {
    return (
        <div className={"flex flex-row justify-center items-center p-2"}>
            {
                isDirect
                    ? <Link href={link || "#"}>
                        <a className={"text-sm text-gray-400"}>{children}</a>
                    </Link>
                    : <span className={"text-sm text-gray-400"}>{children}</span>
            }
        </div>
    )
}
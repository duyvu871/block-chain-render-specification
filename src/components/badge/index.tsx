import React from "react";

type colorType = "blue" | "gray" | "red" | "green" | "yellow" | "indigo" | "purple" | "pink";

export default function Badge(
    { children, color }: { children: React.ReactNode; color: colorType },
) {
    const badgeWithColor = {
        blue: (
            <span className="w-fit bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
            {children}
            </span>
        ),
        gray: (
            <span className="w-fit bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
            {children}
            </span>
        ),
        red: (
            <span className="w-fit bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
            {children}
            </span>
        ),
        green: (
            <span className="w-fit bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
            {children}
            </span>
        ),
        yellow: (
            <span className="w-fit bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
            {children}
            </span>
        ),
        indigo: (
            <span className=" w-fit bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900">
            {children}
            </span>
        ),
        purple: (
            <span className="w-fit bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900">
            {children}
            </span>
        ),
        pink: (
            <span className="w-fit bg-pink-100 text-pink-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-pink-200 dark:text-pink-900">
            {children}
            </span>
        ),
    };

    if (color in badgeWithColor) {
        return badgeWithColor[color];
    } else {
        return <> </>;
    }
}

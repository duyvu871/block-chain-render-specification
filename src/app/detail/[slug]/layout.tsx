"use client"


import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "@/reducers";
import { TransactionProvider } from "@/context/TransactionContext";

const store = createStore(rootReducer);

export default function DetailLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <TransactionProvider>
            <Provider store={store}>
                {children}
            </Provider>
        </TransactionProvider>
    )
}
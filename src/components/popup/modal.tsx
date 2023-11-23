"use client";
import "./popup.css";
import { useState, useEffect} from "react";
import {pop} from "@jridgewell/set-array";
import {useDispatch, useSelector} from "react-redux";
import showPopup from "@/actions/showPopup";

export default function PopupLayout({
  children, popupTitle, onClose, isShowPopup,
}: {
  children: React.ReactNode;
  popupTitle: string;
  onClose: (status: boolean) => void;
  isShowPopup: boolean;
}) {

    // const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const dispatch = useDispatch();
    const isPopupOpen = useSelector((state: any) => state.popupReducer);

    const closeHandler = () => {
        dispatch(showPopup(false));
        onClose(false);
    }

  // useEffect(() => {
  //   setIsPopupOpen(isShowPopup);
  // }, []);


  return(
        <div className="overlay" style={{
            visibility: isPopupOpen ? "visible" : "hidden",
            opacity: isPopupOpen ? 1 : 0,
        }}>
            <div className="popup">
              <h2 className={"font-bold text-gray-800 text-xl px-2 py-3"}>{popupTitle}</h2>
              <span className="close" onClick={closeHandler}>&times;</span><div className="content">
                {children}
              </div>
            </div>
        </div>
  );
}
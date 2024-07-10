import React ,{ ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";

 type PropTypes = {
    isVisible: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ isVisible, onClose, children } : PropTypes) => {
    if (!isVisible) return null;

    return (
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className=" relative bg-white rounded-lg shadow-md p-6 w-[500px] text-left">
                <button className="absolute top-6 right-6" onClick={onClose}>
                    <IoCloseOutline className="w-6 h-6" />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;

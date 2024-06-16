import React from "react";
import { MdDisabledByDefault } from "react-icons/md";
import {ImLinkedin} from "react-icons/im";


type CardDisableType = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const CardDisableComponent: React.FC<CardDisableType> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-lms-black90 bg-opacity-50">
      <div className="bg-lms-white-80 rounded-lg shadow-md p-6 max-w-sm w-full text-center">
        <div className="text-lms-secondary mb-4 flex items-center justify-center">
          {/*<svg*/}
          {/*  xmlns="http://www.w3.org/2000/svg"*/}
          {/*  className="h-12 w-12 mx-auto"*/}
          {/*  fill="none"*/}
          {/*  viewBox="0 0 24 24"*/}
          {/*  stroke="currentColor"*/}
          {/*>*/}
          {/*  <path*/}
          {/*    strokeLinecap="round"*/}
          {/*    strokeLinejoin="round"*/}
          {/*    strokeWidth="2"*/}
          {/*    d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"*/}
          {/*  />*/}
          {/*</svg>*/}
          <MdDisabledByDefault className="w-12 h-12 text-lms-secondary" />

        </div>
        <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-lms-white-80 px-4 py-2 rounded-lg"
          >
            Disable
          </button>
          <button
            onClick={onCancel}
            className="border border-lms-gray-30 text-lms-gray-80 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDisableComponent;

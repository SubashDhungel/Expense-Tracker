import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;
return (
  <div
    className="fixed inset-0 z-[9999] flex justify-center items-center w-full min-h-screen overflow-y-auto bg-black/50"
    role="dialog"
    aria-modal="true"
  >
    <div className="relative p-4 w-full max-w-2xl max-h-full">
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-sm">
        {/* Modal header */}
        
        <div className="flex items-center justify-between p-5  pt-0 pb-0 md:pt-2 md:pb-2 border-b border-gray-200 rounded-t-lg " style = {{  borderBottom: "1px solid rgb(205, 211, 221)" }}>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button className="text-gray-500 hover:text-gray-800 hover:bg-gray-100 bg-transparent rounded text-sm w-6 h-6 inline-flex justify-center items-center  cursor-pointer" onClick={onClose}>
            X
          </button>
        </div>

        {/* Modal body */}
        <div className="p-4 md:p-5 space-y-4" >{children}</div>
      </div>
    </div>
  </div>
);
}


export default Modal;

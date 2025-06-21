import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  amount,
  date,
  type,
  hideDeleteBtn,
  onDelete,
}) => {

  const getAmountStyles = () => {
   return type === "income" ? "bg-green-50 text-green-600": "bg-red-50 text-red-600";
    } 
  

  return (
    <div className="group relative flex items-center gap-4 mt-1 p-3 rounded-lg hover:bg-gray-100/60">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 rounded-full bg-gray-100">
        {icon && icon !== "" ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils />
        )}
      </div>

      {/* Add transaction info here */}
      <div className="flex-1 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-700 font-medium m-0 pt-2">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {! hideDeleteBtn && (
            <button className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" >
              <LuTrash2 size={18}></LuTrash2>
            </button>
          )}
          <div className={`flex items-center gap-2 px-3  rounded-md ${getAmountStyles()}`}>
            <h6 className="text-xs font-bold py-2 m-0 "> {type==="income" ? '+':'-'}Rs. {amount}</h6>
            {type === "income" ? (
              <LuTrendingUp className="text-green-600" />
            ) : (
              <LuTrendingDown className="text-red-600" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;

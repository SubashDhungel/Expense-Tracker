import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import { useProgressBar } from "../../context/ProgressBarContext";

const SideMenu = ({ activeMenu }) => {
    const { startProgress, stopProgress } = useProgressBar();
  
  const navigate = useNavigate();
  const { user, clearUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      startProgress();

      await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
      clearUser(); // clear context or state
      navigate("/login"); // go to login page
      stopProgress()
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleClick = (route) => {
      startProgress();
    route === "/logout" ? handleLogout() : navigate(route);
  };

  return (
    <div className=" w-full h-[calc(100vh-60px)] bg-nav border border-r border-gray-200/50 p-5 sticky top-[61px] ml-[0px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-3">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl || ""}
            alt="User Profile"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <CharAvatar
          fullName = {user?.name || ""}
          width="w-20"
          height="h-20"
          style="text-xl"
          
          ></CharAvatar>
        )}
        <h5 className="text-gray-950  font-medium leading-6">{user?.name || ""}</h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={`menu_${index}`}
            className={` border-none cursor-pointer w-full flex items-center gap-4 text-[15px] ${
              activeMenu == item.label ? "text-white bg-primary" : ""
            } py-3 px-6 rounded-lg mb-3`}
            onClick={() => handleClick(item.path )}
          >
            <Icon className="text-xl" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default SideMenu;

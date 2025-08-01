import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import Sidebar from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="">
      <Navbar activeMenu={activeMenu}></Navbar>
      {user && (
        <div className="flex">
          <div className="max-[1000px]:hidden">
            <Sidebar activeMenu={activeMenu}></Sidebar>
          </div>

          <div className="grow mx-5">{children} </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;

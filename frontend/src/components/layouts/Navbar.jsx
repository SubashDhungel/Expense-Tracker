import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [ openSideMenu, setOpenSideMenu ] = useState(false);
  return (
    <div className="flex items-center gap-5 h-[30px] bg-nav border border-b border-gray -200/50 backdrop-blur -[2px] py-4 px-7 sticky top-0 z-50">
      <button
        className="border-none bg-transparent block lg:hidden text-black"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
      <h2 className="font-sans text-lg">Expense Tracker</h2>
      {openSideMenu && (
      <div className="fixed top-[60px] -ml-7 bg-nav">
        <SideMenu activeMenu={activeMenu} />
      </div>)
}
    </div>
  );
};

export default Navbar;

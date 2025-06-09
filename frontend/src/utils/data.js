import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LuLayoutDashboard, // ✅ Correct
  },
  {
    label: "Earnings",
    path: "/earnings",
    icon: LuHandCoins,
  },
  {
    label: "Wallet",
    path: "/wallet",
    icon: LuWalletMinimal,
  },
  {
    label: "Logout",
    path: "/logout",
    icon: LuLogOut,
  },
];

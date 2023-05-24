import { Basket, ChartPie, CurrencyDollar, UsersThree } from "@phosphor-icons/react";
import React from "react";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <ChartPie />,
    link: "",
  },
  {
    title: "Products",
    icon: <Basket />,
    link: "products",
  },
  {
    title: "Users",
    icon: <UsersThree />,
    link: "users",
  },
  {
    title: "Orders",
    icon: <CurrencyDollar/>,
    link: "orders",
  },
];

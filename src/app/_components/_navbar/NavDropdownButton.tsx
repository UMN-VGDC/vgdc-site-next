"use client";

import { Squash as Hamburger } from "hamburger-react";
import { useContext } from "react";
import { NavContext } from "./NavContextProvider";

export default function NavDropdownButton() {
  const { setSidebarOpen, sidebarOpen } = useContext(NavContext);
  return (
    <li className="mr-8 flex h-navbar items-center">
      <Hamburger color="#41434d" toggle={setSidebarOpen} toggled={sidebarOpen} />
    </li>
  );
}

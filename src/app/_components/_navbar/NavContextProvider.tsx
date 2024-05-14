"use client";

import { AnimatePresence } from "framer-motion";
import { createContext, useState } from "react";
import NavDropdown from "./NavDropdown";

type NavContext = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavContext = createContext<NavContext>({
  sidebarOpen: false,
  setSidebarOpen: () => null,
});

export default function NavContextProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <NavContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <nav>
        <AnimatePresence>{sidebarOpen && <NavDropdown setSidebarOpen={setSidebarOpen} />}</AnimatePresence>
        {children}
      </nav>
    </NavContext.Provider>
  );
}

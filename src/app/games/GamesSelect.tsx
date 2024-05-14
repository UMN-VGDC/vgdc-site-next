"use client";

import { useAnimate } from "framer-motion";
import { createContext, useEffect, useState } from "react";
import { GameData } from "./GameData";
import Sidebar from "./Sidebar";
import styles from "./styles.module.scss";

type GameSelectContext = {
  activeItem: number;
  panelSelect: (index: number, gameData: GameData) => void;
};

export const GamesSelectContext = createContext<GameSelectContext>({
  activeItem: -1,
  panelSelect: () => null,
});

export default function GamesSelect({ children }: { children: React.ReactNode }) {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [isSidebarClose, setIsSidebarClose] = useState(true);
  const [activeItem, setActiveItem] = useState<number>(-1);

  const panelSelect = (index: number, gameData: GameData) => {
    setActiveItem(index);
    setIsSidebarClose(false);
    setGameData(gameData);
  };

  return (
    <GamesSelectContext.Provider value={{ activeItem, panelSelect }}>
      <aside
        className={`absolute z-[3] min-h-full min-w-[100vw] md:relative md:min-w-[350px] lg:min-w-[500px] ${
          isSidebarClose ? "pointer-events-none" : ""
        }`}
      >
        <SidebarContainer isClosed={isSidebarClose}>
          <Sidebar data={gameData} setIsSidebarClose={setIsSidebarClose} />
        </SidebarContainer>
      </aside>
      <div className={styles.imgContainer}>{children}</div>
    </GamesSelectContext.Provider>
  );
}

interface SidebarContainer {
  isClosed: boolean;
  children: React.ReactNode;
}

function SidebarContainer({ isClosed, children }: SidebarContainer) {
  const [isMobileSidebar, setIsMobileSidebar] = useState<boolean>(false);

  const [scope, animate] = useAnimate();
  useEffect(() => {
    if (scope === null) return;
    animate(scope.current, { x: isClosed && isMobileSidebar ? "-100vw" : 0 }, { ease: "circOut" });
  }, [isClosed, isMobileSidebar]);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobileSidebar(window.innerWidth <= 768);
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div
      className="fixed top-[70px] h-[calc(100%-70px)] w-screen overflow-hidden md:w-[350px] lg:w-[500px]"
      ref={scope}
    >
      {children}
    </div>
  );
}

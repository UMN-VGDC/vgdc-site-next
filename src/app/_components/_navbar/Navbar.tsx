import Image from "next/image";
import Link from "next/link";
import NewWindowIcon from "../../_icons/NewWindowIcon";
import Triangles from "../../_icons/Triangles";
import { exposedItems } from "./NavbarItems";
import NavContextProvider from "./NavContextProvider";
import NavDropdownButton from "./NavDropdownButton";
import styles from "./styles.module.scss";

export default function Navbar() {
  return (
    <NavContextProvider>
      <div className={`${styles.navbarGradient} fixed top-0 z-10 flex h-navbar w-screen overflow-hidden text-white`}>
        <Logo />
        <div className="flex w-full justify-end">
          <Routes />
        </div>
      </div>
      <div className={styles.dropShadow}></div>
    </NavContextProvider>
  );
}

function Routes() {
  return (
    <ul className="m-0 flex min-h-full list-none p-0 font-header">
      {exposedItems
        .filter((e) => e.exposed)
        .map((e, i) => {
          return (
            <li key={i} className="hidden h-navbar lg:block">
              <Link href={e.href} className={styles.navbarItem}>
                {e.label}
              </Link>
            </li>
          );
        })}
      <NavDropdownButton />
      <li className="hidden h-navbar md:block">
        <Link
          className="flex h-navbar items-center gap-1 bg-primary pl-10 pr-7"
          href="https://discord.gg/Yst7Zwn4wk"
          target="_blank"
        >
          DISCORD
          <NewWindowIcon className="mt-[1px] h-7 w-7 opacity-50" />
        </Link>
      </li>
    </ul>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex h-navbar items-center gap-5 whitespace-nowrap">
      <Image
        src="/images/Navbar-logo.webp"
        alt="VGDC logo"
        width={206}
        height={70}
        className="h-navbar min-w-[206px]"
      />
      <div className="hidden text-[0.9rem] leading-[1.2rem] opacity-40 xl:block">
        University of Minnesota <br /> Video Game Development Club
      </div>
      <Triangles className="absolute left-[8.75rem] top-[-1.875rem] z-[-1] w-[170px] opacity-60 mix-blend-screen" />
    </Link>
  );
}

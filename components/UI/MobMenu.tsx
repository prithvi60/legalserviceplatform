"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { IoDocumentTextOutline } from "react-icons/io5";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Menu {
  menu: string;
  subCategories?: Array<SubMenu>;
}

interface SubMenu {
  subMenu: string;
  href: string;
  subDividion?: Array<SubLink>;
}

interface SubLink {
  subLink: string;
  href: string;
}

export default function MobMenu({ Menus }: { Menus: Menu[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null);
  const { status } = useSession();
  const router = useRouter();

  const handleClick = (val: string) => {
    if (status === "authenticated") {
      router.push(val);

    } else {
      localStorage.setItem("returnUrl", val);
      router.push("/api/auth/signin");
    }
  };

  const toggleDrawer = (val: string) => {
    setIsOpen(!isOpen);
    setOpenMenuIndex(null);
    setOpenSubMenuIndex(null);
    handleClick(val)
  };

  const subMenuDrawer = {
    enter: {
      height: "auto",
      overflow: "hidden",
    },
    exit: {
      height: 0,
      overflow: "hidden",
    },
  };

  return (
    <div className="relative">
      <button className="lg:hidden z-[999] relative" onClick={() => toggleDrawer("")}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <motion.div
        className="fixed !z-50 left-0 right-0 top-16 overflow-y-auto h-full bg-[#18181A] backdrop-blur text-white p-6 pb-20"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
      >
        <ul>
          {Menus.map((menu: Menu, i: number) => {
            const isMenuOpen = openMenuIndex === i;
            const hasSubMenu = menu?.subCategories?.length;
            return (
              <li key={i} className="">
                <span
                  className="flex-center-between p-4 hover:bg-white/5 rounded-md cursor-pointer relative"
                  onClick={() => setOpenMenuIndex(isMenuOpen ? null : i)}
                >
                  {menu.menu}
                  {hasSubMenu && (
                    <ChevronDown
                      className={`ml-auto ${isMenuOpen && "rotate-180"} `}
                    />
                  )}
                </span>
                {hasSubMenu && (
                  <motion.ul
                    initial="exit"
                    animate={isMenuOpen ? "enter" : "exit"}
                    variants={subMenuDrawer}
                    className="ml-5"
                  >
                    {menu?.subCategories?.map((submenu: SubMenu, idx: number) => {
                      const isSubMenuOpen = openSubMenuIndex === idx;
                      const hasSubDiv = submenu.subDividion?.length;
                      return (
                        <li
                          key={idx}
                          className="cursor-pointer w-full"
                        >
                          <div className="flex-center-between hover:bg-white/5 rounded-md gap-x-2 w-full">
                            {/* <span>
                              <IoDocumentTextOutline className="bg-white/50 w-fit text-2xl p-1 rounded-md" />
                            </span> */}
                            <h4
                              className="flex-center-between w-full p-4 hover:bg-white/5 rounded-md cursor-pointer relative"
                              onClick={() => setOpenSubMenuIndex(isSubMenuOpen ? null : idx)}
                            >
                              {submenu.subMenu}
                              {hasSubDiv && (
                                <ChevronDown
                                  className={`ml-auto ${isSubMenuOpen && "rotate-180"} `}
                                />
                              )}
                            </h4>
                          </div>
                          {hasSubDiv && (
                            <motion.ul
                              initial="exit"
                              animate={isSubMenuOpen ? "enter" : "exit"}
                              variants={subMenuDrawer}
                              className="ml-5"
                            >
                              {submenu.subDividion?.map((subDiv: SubLink, id: number) => (
                                <li key={id}>
                                  <Link className="p-2 flex-center hover:bg-white/5 rounded-md gap-x-2 cursor-pointer" href={subDiv.href} onClick={() => toggleDrawer(subDiv.href)}>
                                    <span>
                                      <IoDocumentTextOutline className="bg-white/50 w-fit text-xl p-1 rounded-md" />
                                    </span>
                                    {subDiv.subLink}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
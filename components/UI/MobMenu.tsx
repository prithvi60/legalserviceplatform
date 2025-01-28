"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { IoDocumentTextOutline } from "react-icons/io5";

interface Menu {
  menu: string;
  subCategories?: Array<SubMenu>;
}

interface SubMenu {
  subMenu: string;
  href: string;
}

export default function MobMenu({ Menus }: { Menus: Menu[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState<number | null>(null);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked(null);
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
      <button className="lg:hidden z-[999] relative" onClick={toggleDrawer}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <motion.div
        className="fixed !z-50 left-0 right-0 top-16 overflow-y-auto h-full bg-[#18181A] backdrop-blur text-white p-6 pb-20"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
      >
        <ul>
          {Menus.map((menu: Menu, i: number) => {
            const isClicked = clicked === i;
            const hasSubMenu = menu?.subCategories?.length;
            return (
              <li key={i} className="">
                <span
                  className="flex-center-between p-4 hover:bg-white/5 rounded-md cursor-pointer relative"
                  onClick={() => setClicked(isClicked ? null : i)}
                >
                  {menu.menu}
                  {hasSubMenu && (
                    <ChevronDown
                      className={`ml-auto ${isClicked && "rotate-180"} `}
                    />
                  )}
                </span>
                {hasSubMenu && (
                  <motion.ul
                    initial="exit"
                    animate={isClicked ? "enter" : "exit"}
                    variants={subMenuDrawer}
                    className="ml-5"
                  >
                    {menu?.subCategories?.map((submenu: SubMenu, idx: number) => (
                      <li
                        key={idx}
                        className="p-2 flex-center hover:bg-white/5 rounded-md gap-x-2 cursor-pointer"
                      >
                        {/* <Icon size={17} /> */}
                        <span>
                          <IoDocumentTextOutline className="bg-white/50 w-fit text-2xl p-1 rounded-md" />
                        </span>
                        {submenu.subMenu}
                      </li>
                    ))}
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

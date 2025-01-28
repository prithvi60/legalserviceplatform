"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { IoDocumentTextOutline } from "react-icons/io5";

interface Menu {
  menu: string;
  subCategories?: Array<SubMenu>;
}

interface SubMenu {
  subMenu: string;
  href: string;
}

export default function DesktopMenu({ menu }: { menu: Menu }) {
  const [isHover, toggleHover] = useState(false);
  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  const hasSubMenu = menu?.subCategories?.length;

  return (
    <motion.li
      className="group/link"
      onHoverStart={() => {
        toggleHoverMenu();
      }}
      onHoverEnd={toggleHoverMenu}
      key={menu.menu}
    >
      <span className="flex-center gap-1 hover:bg-white/5 cursor-pointer px-3 py-1 rounded-xl">
        {menu.menu}
        {hasSubMenu && (
          <ChevronDown className="mt-[0.6px] group-hover/link:rotate-180 duration-200" />
        )}
      </span>
      {hasSubMenu && (
        <motion.div
          className="sub-menu"
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div className={`grid gap-7 grid-cols-1`}>
            {hasSubMenu &&
              menu.subCategories?.map((submenu, i) => (
                <div className="relative cursor-pointer" key={i}>
                  {/* {menu.gridCols > 1 && menu?.subMenuHeading?.[i] && (
                    <p className="text-sm mb-4 text-gray-500">
                      {menu?.subMenuHeading?.[i]}
                    </p>
                  )} */}
                  <div className="flex-center gap-x-4 group/menubox">
                    {/* <div className="bg-white/5 w-fit p-2 rounded-md group-hover/menubox:bg-white group-hover/menubox:text-gray-900 duration-300">
                      {submenu.icon && <submenu.icon />}
                    </div> */}
                    <div>
                      <h6 className="font-semibold flex items-center gap-2">
                        <span>
                          <IoDocumentTextOutline className=" w-fit text-4xl p-2 rounded-md group-hover/menubox:bg-primary/50 group-hover/menubox:text-warning duration-300" />
                        </span>
                        {submenu.subMenu}
                      </h6>
                      {/* <p className="text-sm text-gray-400">{submenu.desc}</p> */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}

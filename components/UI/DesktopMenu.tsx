"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { IoDocumentTextOutline } from "react-icons/io5";
import Link from "next/link";

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

export default function DesktopMenu({ menu }: { menu: Menu }) {
  const [isHover, toggleHover] = useState(false);
  const [isSubMenuHover, toggleSubMenuHover] = useState<number | null>(0 || null);
  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };

  console.log(isSubMenuHover);

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
          <div className={`grid gap-4 grid-cols-1`}>
            {hasSubMenu &&
              menu.subCategories?.map((submenu, i) => (
                <div className="relative cursor-pointer" key={i}>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div
                      className={`w-full p-1.5 ${isSubMenuHover === i ? "bg-warning/60 rounded-md" : ""
                        }`}
                    >
                      <h6
                        onMouseEnter={() => toggleSubMenuHover(i)}
                        className={`font-semibold flex w-full items-center gap-2 group/menubox`}
                      >
                        <span>
                          <IoDocumentTextOutline className=" w-fit text-4xl p-2 rounded-md group-hover/menubox:bg-primary/50 group-hover/menubox:text-warning duration-300" />
                        </span>
                        {submenu.subMenu}
                      </h6>
                    </div>
                    {submenu.subDividion?.length && (
                      <div
                        className={`w-full block space-y-2`}
                      >
                        {submenu.subDividion
                          .filter((_, index) => index === isSubMenuHover)
                          .map((subdiv, id) => (
                            <div key={id} className="block space-y-2">
                              <Link
                                href={subdiv.href}
                                className={`font-semibold w-full`}
                              >
                                {subdiv.subLink}
                              </Link>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}

"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { IoDocumentTextOutline } from "react-icons/io5";
import Link from "next/link";
import { Button } from "@heroui/button";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
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

export default function DesktopMenu({ menu, }: { menu: Menu }) {
  const [isHover, toggleHover] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  // Set default value of hoveredSubMenuIndex to 0
  const [hoveredSubMenuIndex, setHoveredSubMenuIndex] = useState<number>(0);

  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };

  const handleClick = (val: string) => {
    if (status === "authenticated") {
      router.push(val);

    } else {
      localStorage.setItem("returnUrl", val);
      router.push("/api/auth/signin");
    }
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
      className={`group/link px-5 ${menu.menu === "Consult an Expert" ? "relative" : ""}`}
      onHoverStart={toggleHoverMenu}
      onHoverEnd={toggleHoverMenu}
      key={menu.menu}
    >
      {menu.menu === "Consult an Expert" ? (
        <Button
          size="md"
          radius="sm"
          color="warning"
          className="font-Lorin flex-center gap-1 font-medium text-lg lg:text-xl text-black"
        >
          Consult an Expert
          {hasSubMenu && (
            <ChevronDown className="mt-[0.6px] group-hover/link:rotate-180 duration-200" />
          )}
        </Button>
      ) : (
        <span className="flex-center gap-1 hover:bg-white/5 text-xl cursor-pointer px-3 py-2 rounded-xl">
          {menu.menu}
          {hasSubMenu && (
            <ChevronDown className="mt-[0.6px] group-hover/link:rotate-180 duration-200" />
          )}
        </span>
      )}

      {hasSubMenu && (
        <motion.div
          className={`${menu.menu === "Consult an Expert" ? "sub-menu_1" : "sub-menu"}`}
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div className={`grid gap-4 grid-cols-1`}>
            {hasSubMenu &&
              menu.subCategories?.map((submenu, i) => (
                <div
                  className="relative cursor-pointer w-full"
                  key={i}
                  onMouseEnter={() => setHoveredSubMenuIndex(i)}
                  onMouseLeave={() => setHoveredSubMenuIndex(0)} // Reset to 0 on mouse leave
                >
                  <div className={`${menu.menu === "Consult an Expert" ? "grid grid-cols-1 w-full" : "grid grid-cols-2 w-[540px]"} gap-x-4 h-fit`}>
                    <div
                      className={`w-full h-20 flex justify-center items-center p-1.5 ${hoveredSubMenuIndex === i ? "bg-warning/60 rounded-md" : ""}`}
                    >
                      <h6 className={`font-semibold flex w-full items-center gap-2 group/menubox`}>
                        <span>
                          <IoDocumentTextOutline className=" w-fit text-4xl p-2 rounded-md group-hover/menubox:bg-primary/50 group-hover/menubox:text-warning duration-300" />
                        </span>
                        {submenu.subMenu}
                        <span >
                          <MdOutlineKeyboardArrowRight className="text-xl text-black" />
                        </span>
                      </h6>
                    </div>
                    {hoveredSubMenuIndex === i && submenu.subDividion?.length && (
                      <div className={`w-full space-y-2`}>
                        {submenu.subDividion.map((subdiv, id) => (
                          <div key={id} className="block space-y-2 h-fit">
                            <Link
                              href={subdiv.href}
                              className={`font-semibold w-full`}
                              onClick={() => handleClick(subdiv.href)}
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
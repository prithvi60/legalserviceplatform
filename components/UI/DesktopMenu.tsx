"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { IoDocumentTextOutline } from "react-icons/io5";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Menu {
  menu: string;
  subCategories?: Array<SubMenu>;
}

interface SubMenu {
  subMenu: string;
  href?: string;
  subDivision?: Array<SubLink>;
}

interface SubLink {
  subLink: string;
  href: string;
}

export default function DesktopMenu({ menu }: { menu: Menu }) {
  const [isHover, setIsHover] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const defaultSubMenu = menu.subCategories?.[0]?.subMenu || "";
  const [hoveredSubMenuIndex, setHoveredSubMenuIndex] =
    useState<string>(defaultSubMenu);
  const [leaveTimeout, setLeaveTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      setLeaveTimeout(null);
    }
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsHover(false);
      setHoveredSubMenuIndex(defaultSubMenu);
    }, 250);
    setLeaveTimeout(timeout);
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
      // transition: {
      //   duration: 0.2,
      // },
      transitionEnd: {
        display: "none",
      },
    },
  };

  const hasSubMenu = menu?.subCategories?.length;

  const FilteredData = menu.subCategories?.find(
    (val) => val.subMenu === hoveredSubMenuIndex
  );

  return (
    <motion.li
      className={`group/link relative px-1 font-Inter font-medium tracking-wide`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      key={menu.menu}
    >
      {menu.menu === "Expert Consultation" ? (
        <span className="flex-center gap-1 bg-success text-black font-Inter font-semibold hover:bg-success/80 text-base xl:text-xl cursor-pointer px-2 xl:px-4 py-1.5 xl:py-2 rounded-xl">
          {menu.menu}
          {hasSubMenu && (
            <ChevronDown className="mt-[0.6px] group-hover/link:text-primary group-hover/link:rotate-180 duration-200" />
          )}
        </span>
      ) : (
        <span className="flex-center gap-1 hover:bg-white/5 text-base xl:text-xl cursor-pointer px-1 xl:px-2 py-1.5 xl:py-2 rounded-xl">
          {menu.menu}
          {hasSubMenu && (
            <ChevronDown className="mt-[0.6px] group-hover/link:text-warning group-hover/link:rotate-180 duration-200" />
          )}
        </span>
      )}

      {hasSubMenu && (
        <motion.div
          className={`${menu.menu === "Expert Consultation" ||
            menu.menu === "Financial Consultation"
            ? "sub-menu w-max "
            : "sub-menu w-[640px]"
            } ${menu.menu === "Legal Documentation" ? " h-[300px]" : "h-fit"}`}
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div className={`grid gap-4 grid-cols-1 relative`}>
            {hasSubMenu &&
              menu.subCategories?.map((submenu, i) => (
                <div
                  className="relative cursor-pointer w-full"
                  key={i}
                  onMouseEnter={() => setHoveredSubMenuIndex(submenu.subMenu)}
                >
                  <div
                    className={`${menu.menu === "Expert Consultation" ||
                      menu.menu === "Financial Consultation"
                      ? "grid grid-cols-1 w-full"
                      : "grid grid-cols-2 w-full pb-3"
                      } relative gap-x-4 h-fit `}
                  >
                    {menu.menu === "Expert Consultation" ||
                      menu.menu === "Financial Consultation" ? (
                      <Link
                        href={submenu.href || "#"}
                        className={`font-semibold w-full text-base xl:text-lg hover:text-primary/80`}
                      >
                        {submenu.subMenu}
                      </Link>
                    ) : (
                      <div
                        className={`w-full h-20 flex justify-center items-center p-1.5 ${hoveredSubMenuIndex === submenu.subMenu
                          ? "bg-success/60 rounded-md"
                          : ""
                          }`}
                      >
                        <h6
                          className={`font-semibold text-xl flex w-full items-center gap-2 group/menubox`}
                        >
                          <span>
                            <IoDocumentTextOutline className="w-fit text-4xl p-2 rounded-md group-hover/menubox:bg-primary/50 group-hover/menubox:text-warning duration-300" />
                          </span>
                          {submenu.subMenu}
                          <span>
                            <MdOutlineKeyboardArrowRight className="text-xl text-black" />
                          </span>
                        </h6>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            {FilteredData && (
              <div className={`space-y-4 w-1/2 absolute top-0 left-[340px]`}>
                {menu.menu !== "Expert Consultation" &&
                  menu.menu !== "Financial Consultation" && (
                    <h4 className="font-Archivo pb-3 font-bold text-base xl:text-lg underline underline-offset-8 text-primary tracking-wide">
                      {FilteredData.subMenu}
                    </h4>
                  )}

                {FilteredData.subDivision?.map((subdiv, id) => (
                  <div key={id} className="block space-y-2 h-fit">
                    <Link
                      href={subdiv.href}
                      className={`font-semibold w-full text-base xl:text-lg hover:text-primary/80`}
                      onClick={() => handleClick(subdiv.href)}
                    >
                      {subdiv.subLink}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}

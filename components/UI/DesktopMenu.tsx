"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const { status } = useSession();
  const router = useRouter();

  const defaultSubMenu = menu.subCategories?.[0]?.subMenu || "";
  const [isHover, setIsHover] = useState(false);
  const [hoveredSubMenuIndex, setHoveredSubMenuIndex] =
    useState<string>(defaultSubMenu);

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  const handleSubMenuHover = (subMenu: string) => {
    setHoveredSubMenuIndex(subMenu);
  };

  const handleClick = (val: string) => {
    if (status === "authenticated") {
      router.push(val);
    } else {
      localStorage.setItem("returnUrl", val);
      router.push("/api/auth/signin");
    }
  };

  const hasSubMenu = menu?.subCategories?.length;
  const FilteredData = menu.subCategories?.find(
    (val) => val.subMenu === hoveredSubMenuIndex
  );

  return (
    <motion.li
      className="group/link relative px-2 font-Inter font-medium tracking-wide"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      key={menu.menu}
    >
      <span
        className={`flex items-center gap-1 ${
          menu.menu === "Expert Consultation"
            ? "bg-success text-black font-semibold hover:bg-success/90"
            : "hover:bg-white/5"
        } text-lg md:text-xl cursor-pointer px-2 xl:px-4 py-1.5 xl:py-2 rounded-lg font-Archivo`}
      >
        {menu.menu}
        {hasSubMenu && (
          <ChevronDown
            className={`mt-[0.6px]  group-hover/link:rotate-180 duration-200  ${
              menu.menu === "Expert Consultation"
                ? "text-black"
                : "text-success"
            } `}
          />
        )}
      </span>

      <AnimatePresence>
        {isHover && hasSubMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`absolute z-50 left-0 mt-2 w-[750px] bg-white text-black shadow-xl rounded-lg overflow-hidden ${
              menu.menu === "Expert Consultation" ||
              menu.menu === "Financial Consultation"
                ? "w-[500px]"
                : "w-[750px]"
            }`}
          >
            {menu.menu === "Expert Consultation" ||
            menu.menu === "Financial Consultation" ? (
              // Card-based layout for Expert & Financial Consultation
              <div className="p-6 max-w-fit">
                {menu.subCategories?.map((submenu, i) => (
                  <div
                    key={i}
                    className="p-4 mb-2  rounded-lg transition"
                    onMouseEnter={() => handleSubMenuHover(submenu.subMenu)}
                  >
                    <Link
                      href={submenu.href || "#"}
                      className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition"
                      onClick={() => handleClick(submenu.href || "#")}
                    >
                      <IoDocumentTextOutline className="text-3xl text-primary" />
                      <span className="font-semibold text-lg">
                        {submenu.subMenu}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              // Grid-based layout for all other submenus
              <div className="grid grid-cols-12">
                {/* Left Column - Submenu List */}
                <div
                  className={`col-span-4 p-6 flex flex-col gap-4 bg-primary text-white`}
                >
                  {menu.subCategories?.map((submenu, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => handleSubMenuHover(submenu.subMenu)}
                      className={`cursor-pointer p-3 rounded-lg ${
                        hoveredSubMenuIndex === submenu.subMenu
                          ? "bg-white text-black"
                          : "hover:bg-white/20"
                      }`}
                    >
                      <h6 className="text-lg font-semibold flex items-center gap-2">
                        {submenu.subMenu}
                        <MdOutlineKeyboardArrowRight className="text-xl" />
                      </h6>
                    </div>
                  ))}
                </div>

                {/* Right Column - SubLinks */}
                <div className="col-span-8 p-6">
                  {FilteredData && (
                    <>
                      <h4 className="font-bold text-lg underline text-primary tracking-wide mb-4">
                        {FilteredData.subMenu}
                      </h4>

                      <div className="grid grid-cols-2 gap-4">
                        {FilteredData.subDivision?.map((subdiv, id) => (
                          <Link
                            key={id}
                            href={subdiv.href}
                            className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition"
                            onClick={() => handleClick(subdiv.href)}
                          >
                            <IoDocumentTextOutline className="text-3xl text-primary" />
                            <span className="font-semibold text-lg">
                              {subdiv.subLink}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

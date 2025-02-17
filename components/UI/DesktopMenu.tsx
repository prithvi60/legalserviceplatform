"use client";
import React, { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Menu {
  menu: string;
  subCategories?: Array<SubMenu>;
}

interface SubMenu {
  subMenu: string;
  href?: string;
  icon?: ReactNode;
  subDivision?: Array<SubLink>;
}

interface SubLink {
  subLink: string;
  href: string;
  note: string
  icon: ReactNode;
}

export default function DesktopMenu({ menu }: { menu: Menu }) {
  const { status } = useSession();
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  const handleClick = (val: string) => {
    if (status === "authenticated") {
      router.push(val);
    } else {
      localStorage.setItem("returnUrl", val);
      router.push("/api/auth/signin");
    }
  };

  const hasSubMenu = menu?.subCategories?.length;

  return (
    <motion.li
      className={`group/link ${(menu.menu === "Business setup" || menu.menu === "Financial Consultation" || menu.menu === "Expert Consultation") && "relative"} font-Inter font-medium tracking-wide`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      key={menu.menu}
    >
      <div
        className={`flex items-center gap-1 ${menu.menu === "Expert Consultation"
          ? "bg-success text-black font-semibold hover:bg-success/90"
          : "hover:bg-white/5"
          } text-sm xl:text-[18px] cursor-pointer px-2 2xl:px-4 py-1.5 xl:py-2 rounded-lg font-Archivo`}
      >
        <h4>{menu.menu}</h4>
        {hasSubMenu && (
          <ChevronDown
            className={`mt-[0.6px] group-hover/link:rotate-180 duration-200  ${menu.menu === "Expert Consultation"
              ? "text-black"
              : "text-success"
              } `}
          />
        )}
      </div>

      <AnimatePresence>
        {isHover && hasSubMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`absolute z-50 mt-2 bg-white text-black shadow-xl rounded-lg overflow-hidden ${menu.menu === "Financial Consultation"
              ? "w-[400px] left-0"
              : menu.menu === "Business setup"
                ? "w-[350px] left-0" : menu.menu === "Expert Consultation" ? "w-[320px] left-0" : "w-[950px] left-14 xl:left-80"
              }`}
          >
            {menu.menu === "Expert Consultation" ||
              menu.menu === "Financial Consultation" ? (
              // Card-based layout for Expert & Financial Consultation
              <div className="p-6 w-full">
                {menu.subCategories?.map((submenu, i) => (
                  <div
                    key={i}
                    className="py-2 rounded-lg transition"
                  >
                    <Link
                      href={submenu.href || "#"}
                      className="flex items-center gap-2 p-3 hover:bg-gray-100 transition"
                      onClick={() => handleClick(submenu.href || "#")}
                    >
                      <span className="mr-2">{submenu.icon}</span>
                      <span className="font-semibold text-base text-primary">
                        {submenu.subMenu}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              // Grid-based layout for all other submenus
              // <div className="">
              <div className={`grid ${hasSubMenu >= 2 ? "grid-cols-2" : "grid-cols-1"} gap-10 px-6 py-10 w-full`}>
                {menu.subCategories?.map((item, idx) => (
                  <div key={idx}>
                    <h4 className="text-lg font-semibold text-primary border-b-2 border-slate-200 pb-2.5">{item.subMenu}</h4>
                    <ul className={`grid ${hasSubMenu >= 2 ? "grid-cols-2" : "grid-cols-1"} gap-10 mt-10`}>
                      {item.subDivision?.map((list, id) => (
                        <li key={id} className="w-full hover:bg-gray-100 p-2">
                          <Link href={list.href} className="flex gap-4">
                            <span className="mt-1.5">{list.icon}</span>
                            <div className="block space-y-2.5 w-full">
                              <h5 className="font-semibold text-[17px] text-primary tracking-wide">{list.subLink}</h5>
                              <p className="text-[16px]">{list.note}k</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              // </div>
              // <div className="grid grid-cols-12">
              //   <div
              //     className={`col-span-4 p-6 flex flex-col gap-4 bg-primary text-white`}
              //   >
              //     {menu.subCategories?.map((submenu, i) => (
              //       <div
              //         key={i}
              //         onMouseEnter={() => handleSubMenuHover(submenu.subMenu)}
              //         className={`cursor-pointer p-3 rounded-lg ${hoveredSubMenuIndex === submenu.subMenu
              //           ? "bg-white text-black"
              //           : "hover:bg-white/20"
              //           }`}
              //       >
              //         <h6 className="text-lg font-semibold flex items-center gap-2">
              //           {submenu.subMenu}
              //           <MdOutlineKeyboardArrowRight className="text-xl" />
              //         </h6>
              //       </div>
              //     ))}
              //   </div>
              //   <div className="col-span-8 p-6">
              //     {FilteredData && (
              //       <>
              //         <h4 className="font-bold text-lg underline text-primary tracking-wide mb-4">
              //           {FilteredData.subMenu}
              //         </h4>

              //         <div className="grid grid-cols-2 gap-4">
              //           {FilteredData.subDivision?.map((subdiv, id) => (
              //             <Link
              //               key={id}
              //               href={subdiv.href}
              //               className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition"
              //               onClick={() => handleClick(subdiv.href)}
              //             >
              //               <IoDocumentTextOutline className="text-3xl text-primary" />
              //               <span className="font-semibold text-lg">
              //                 {subdiv.subLink}
              //               </span>
              //             </Link>
              //           ))}
              //         </div>
              //       </>
              //     )}
              //   </div>
              // </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

import { navLinks } from '@/constants/Data';
import React from 'react'
import DesktopMenu from '../UI/DesktopMenu';
import MobMenu from '../UI/MobMenu';


const AcmeLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

const NavBar2 = () => {
    return (
        <header className="h-16 text-[15px] z-50 fixed inset-0 flex-center text-white bg-primary">
            <nav className=" px-3.5 flex-center-between w-full max-w-7xl mx-auto">
                <div className="flex-center gap-x-3 z-[999] relative">
                    {/* <Image src={AcmeLogo} alt="" width={20} height={20} /> */}
                    <AcmeLogo />
                    <h3 className="text-lg font-semibold">Framer</h3>
                </div>

                <ul className="gap-x-1 lg:flex-center hidden">
                    {navLinks.map((menu, idx) => (
                        <DesktopMenu key={idx} menu={menu} />
                    ))}
                </ul>
                <div className="flex-center gap-x-5">
                    <button
                        aria-label="sign-in"
                        className="bg-white/5 z-[999] relative px-3 py-1.5 shadow rounded-xl flex-center"
                    >
                        Sign In
                    </button>
                    <div className="lg:hidden">
                        <MobMenu Menus={navLinks} />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar2

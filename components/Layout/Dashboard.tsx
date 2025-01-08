"use client"
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const { status } = useSession();
    const [isStatus, setIsStatus] = useState(false)
    const handleLogout = () => {
        signOut({ redirect: true, callbackUrl: "/api/auth/signin" });
    }
    useEffect(() => {
        if (status === "authenticated") {
            setIsStatus(true)
        } else {
            setIsStatus(false)
        }
    }, [status]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    return (
        <div className='h-screen w-full flex justify-center items-center text-5xl gap-20'>
            <h4>Dashboard</h4>
            {isStatus && (
                <button className="flex items-center bg-blue-500 gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base" onClick={handleLogout}>
                    Log Out
                </button>
            )}
        </div>
    )
}

export default Dashboard

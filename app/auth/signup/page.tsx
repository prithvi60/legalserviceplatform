"use client"

import { SignUp } from '@/services/api/Signup'
import React from 'react'

const page = () => {
    return (
        <main className='flex justify-center items-center mt-14 h-screen w-full'>
            <SignUp />
        </main>
    )
}

export default page

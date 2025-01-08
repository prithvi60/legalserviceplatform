"use client"

import { SignIn } from '@/services/api/SignIn'
import React from 'react'

const page = () => {
    return (
        <main className='flex justify-center items-center h-screen w-full bg-primary'>
            <SignIn />
        </main>
    )
}

export default page

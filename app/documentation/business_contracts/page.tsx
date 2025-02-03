import dynamic from 'next/dynamic';
const NoSSRComponent2 = dynamic(() => import('@/features/documentation/NDAForm'), { ssr: false });
import React from 'react'

const Page = async () => {
    return (
        <div>
            <NoSSRComponent2 />
        </div>
    )
}

export default Page

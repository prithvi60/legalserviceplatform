import dynamic from 'next/dynamic';
const NoSSRComponent = dynamic(() => import('@/features/documentation/FlexibleHoursForm'), { ssr: false });
import React from 'react'

const Page = () => {
    return (
        <div>
            <NoSSRComponent />
        </div>
    )
}

export default Page

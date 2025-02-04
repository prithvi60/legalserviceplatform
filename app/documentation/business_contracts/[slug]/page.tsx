import dynamic from 'next/dynamic';
const NoSSRComponent2 = dynamic(() => import('@/features/documentation/NDAForm'), { ssr: false });
import React from 'react'

const Page = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params
    console.log(slug);
    // const documentType = slug as string
    return (
        <div>
            <NoSSRComponent2 documentType={"NDA"} />
        </div>
    )
}

export default Page

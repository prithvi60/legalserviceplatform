// import dynamic from 'next/dynamic';
// const NoSSRComponent2 = dynamic(() => import('@/features/documentation/NDAForm'), { ssr: false });
import React from 'react'
// import { notFound } from 'next/navigation';
import { documentConfig } from '@/constants/documentConfig';

type DocumentSlug = keyof typeof documentConfig;

const Page = async ({ params }: { params: { slug: DocumentSlug } }) => {
    const { slug } = params
    const path = slug.replace(/-/g, ' ').replace(/\band\b/g, '&')
    // console.log(slug.replace(/-/g, ' ').replace(/\band\b/g, '&'));
    // const path2 = slug.replace(/\band\b/g, '&')
    // const config = documentConfig[path2 as DocumentSlug];

    // if (!config) {
    //     notFound();
    // }
    return (
        <div className='w-full h-[80vh] capitalize flex justify-center items-center text-xl md:text-2xl font-Archivo font-medium'>
            {path}
        </div>
        // <div>
        //     <NoSSRComponent2 documentType={slug} />
        // </div>
    )
}

export default Page

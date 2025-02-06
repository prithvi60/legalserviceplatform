import dynamic from 'next/dynamic';
const NoSSRComponent2 = dynamic(() => import('@/features/documentation/NDAForm'), { ssr: false });
import React from 'react'
import { notFound } from 'next/navigation';
import { documentConfig } from '@/constants/documentConfig';

type DocumentSlug = keyof typeof documentConfig;

const Page = async ({ params }: { params: { slug: DocumentSlug } }) => {
    const { slug } = params

    const config = documentConfig[slug];

    if (!config) {
        notFound();
    }
    return (
        <div>
            <NoSSRComponent2 documentType={slug} />
        </div>
    )
}

export default Page

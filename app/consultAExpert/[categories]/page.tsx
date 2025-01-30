import ExpertHero from '@/components/Layout/consultExpert/ExpertHero';
import TalkCardComponent from '@/components/Layout/consultExpert/TalkCardComponent';
import React from 'react'

const Page = ({ params }: { params: { categories: string } }) => {
    const { categories } = params
    // console.log(categories);

    return (
        <div>
            <ExpertHero />
            <TalkCardComponent />
        </div>
    )
}

export default Page

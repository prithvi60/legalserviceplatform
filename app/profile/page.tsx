import ProfilePage from '@/components/Layout/ProfilePage'
import React from 'react'

const Page = () => {
    const URI = "/documentation/business_contracts"
    
    return (
        <div>
            <ProfilePage url={`${URI}?resume=true`} />
        </div>
    )
}

export default Page

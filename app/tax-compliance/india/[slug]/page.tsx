import React from 'react'

const Page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params

  return (
    <div className='w-full h-[80vh] capitalize flex justify-center items-center text-xl md:text-2xl font-Archivo font-medium'>
      {slug.replace(/-/g, ' ').replace(/\band\b/g, '&')}
    </div>
  )
}

export default Page

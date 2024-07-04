'use client'

import { useEffect } from 'react'
import Error404 from "@/components/errorPage/Error404Component";

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (

        <div className='bg-lms-white-80  w-full flex flex-col h-screen justify-center items-center space-y-4'>
            {/*<h2 className='text-4xl '>Something went wrong!</h2>*/}
            {/*<button className='bg-orange-100 text-black-100 py-2 px-4 rounded-xl text-based'*/}
            {/*        onClick={*/}
            {/*            // Attempt to recover by trying to re-render the segment*/}
            {/*            () => reset()*/}
            {/*        }*/}
            {/*>*/}
            {/*    Try again*/}
            {/*</button>*/}
            <Error404/>
        </div>
    )
}
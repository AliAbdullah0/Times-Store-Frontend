import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { InfiniteMovingCards } from './ui/InfinityMovingCards'
import { TextGenerateEffect } from './ui/Text-generate-effect'
import { fetchUserFeedbacks } from '../api'

function Userfeedbacks() {
    const [feedbacks, setFeedbacks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetchFeedbacks = async () => {
        setLoading(true)
        try {
            const response = await fetchUserFeedbacks()
            setFeedbacks(response.data.data || [])

        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchFeedbacks()
    }, [])

    return (
        <>
            {loading && (
                <h2 className="uppercase md:text-5xl text-xl text-black dark:text-gray-400 text-center mt-20 font-light animate-pulse">
                    <TextGenerateEffect
                        words="Hang tight, fetching amazing feedback..."
                        className="uppercase md:text-5xl text-xl text-black dark:text-gray-400 text-center font-light animate-pulse"
                    />
                </h2>
            )}

            {error && (<TextGenerateEffect words={'Oops! Error Getting Feedbacks!'} className={'text-center w-full text-red-400 font-light md:text-4xl text-xl'} />)}
            <div className='w-full flex items-center justify-center p-2 mt-8 md:h-[30rem]'>
                {/* Pass feedbacks directly to InfiniteMovingCards */}
                <InfiniteMovingCards items={feedbacks} direction='right' className={''} theme='light'/>
            </div>
        </>
    )
}

export default Userfeedbacks

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { InfiniteMovingCards } from './ui/InfinityMovingCards'
import { TextGenerateEffect } from './ui/Text-generate-effect'

function Userfeedbacks() {
    const [feedbacks, setFeedbacks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetchFeedbacks = async () => {
        setLoading(true)
        try {
            const response = await axios.get('https://times-store-production.up.railway.app/api/feedbacks?populate=*')
            setFeedbacks(response.data.data || [])
            console.log(response.data.data);
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
                <h2 className="uppercase md:text-5xl text-xl text-gray-400 text-center font-bold animate-pulse">
                    <TextGenerateEffect
                        words="Hang tight, fetching amazing feedback..."
                        className="uppercase md:text-5xl text-xl text-gray-400 text-center font-bold animate-pulse"
                    />
                </h2>
            )}

            {error && (<TextGenerateEffect words={'Oops! Error Getting Feedbacks!'} className={'text-center w-full text-red-400 font-light md:text-4xl text-xl'} />)}
            <div className='w-full flex items-center justify-center p-2 mt-8 md:h-[30rem]'>
                {/* Pass feedbacks directly to InfiniteMovingCards */}
                <InfiniteMovingCards items={feedbacks} direction='right' />
            </div>
        </>
    )
}

export default Userfeedbacks

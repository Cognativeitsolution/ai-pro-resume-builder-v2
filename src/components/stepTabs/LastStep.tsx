"use client"
// =============
import React, { useEffect } from 'react'
import Image from 'next/image'
// ===========
import aiLogo from 'media/images/aiLogo.webp'
import { useRouter } from 'next/navigation'

const LastStep = () => {

    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/create-resume')
        }, 1000)

        return () => clearTimeout(timer)
    }, [router])

    return (
        <section className='flex items-center mt-40'>
            <div className='container'>
                {/*====== Logo ======*/}
                <div className="flex items-center justify-center lg:mt-5 mb-8 lg:mb-14">
                    <Image src={aiLogo} alt="AI Logo" />
                </div>

                {/*====== Headings ======*/}
                <div className="text-center">
                    <h3 className='text-[22px] md:text-[30px] font-medium text-zinc-950'>
                        I now have enough to show you the first draft of your new resume. <br /> Let’s take a look!
                    </h3>
                </div>
            </div>
        </section>
    )
}

export default LastStep
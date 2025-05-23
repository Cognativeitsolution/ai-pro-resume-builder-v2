import React from 'react'
import Image from 'next/image'
// ===========
import aiLogo from 'media/images/aiLogo.webp'

const FirstStep = () => {
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
                        Hello I'm Robo, your personal resume expert.
                    </h3>
                </div>
            </div>
        </section>
    )
}

export default FirstStep
import React from 'react'
import { RxTriangleDown } from 'react-icons/rx'

const CustomTooltip = ({ text }: any) => {
    return (
        <>
            <div className='bg-yellow-700 z-10 absolute -left-24 p-1 -top-[49px] rounded-sm w-36 text-center text-xs'>
                {text}
            </div>
            <RxTriangleDown className='bg-yellow-700 absolute -left-7 rotate-45 p-1 -top-[37px] z-0' />
        </>
    )
}

export default CustomTooltip
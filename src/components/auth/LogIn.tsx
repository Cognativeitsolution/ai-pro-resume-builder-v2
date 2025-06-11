import Image from 'next/image'
import React from 'react'
import img from 'media/images/giffs/loopcv-animation.gif'

const LogIn = () => {
  return (
    <div className='w-full h-[100vh] flex items-center justify-center bg-indigo-600/90'>
      <div className='grid grid-cols-12 h-[90%] overflow-hidden rounded-tl-[30px] rounded-br-[30px]'>
        <div className="leftContainer col-span-5 bg-white/10 drop-shadow-3xl flex items-center justify-center">
          <div className=''>
            <Image
              alt='img'
              src={img}
            // width={500}
            // height={500}
            />
          </div>
        </div>
        <div className="rightContainer col-span-7 bg-slate-900">
          dd
        </div>
      </div>
    </div>
  )
}

export default LogIn
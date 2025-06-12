import Image from 'next/image'
import React from 'react'
import img from 'media/images/giffs/loopcv-animation.gif'
import { H1 } from '../typography'
import GoogleLogin from '@/components/socialLogins/googleLogin'
import FBLogin from '@/components/socialLogins/facebookLogin'
import LinkedInLogin from '@/components/socialLogins/linkedInLogin'

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
          <div className='border'>
            <H1 className='text-primaryBlue mb-5'>CREATE ACCOUNT</H1>

            <div className='grid space-y-3 text-white'>
              <div>
                {/* <GoogleLogin /> */}
                sssss
              </div>

              <div>
                {/* <FBLogin /> */}
                ss
              </div>

              <div>
                {/* <LinkedInLogin /> */}
                sss
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn
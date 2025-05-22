'use client'
// ===========
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaAngleLeft, FaCheck } from 'react-icons/fa6'
// ===========
import UploadParser from './UploadParser'
import aiLogo from 'media/images/aiLogo.webp'
import SelectTemplates from './SelectTemplates'

const StepTabs = ({ currentStep = 1 }: { currentStep: number }) => {
  const [step, setStep] = useState(currentStep)
  const [userChoice, setUserChoice] = useState<'yes' | 'no' | null>(null)
  const steps = [1, 2]

  const handleNext = (choice: 'yes' | 'no') => {
    if (step < steps.length) {
      setUserChoice(choice)
      setStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (step > 1) {
      setUserChoice(null)
      setStep(prev => prev - 1)
    }
  }

  return (
    <div className='container'>
      {/*===== Step Bar Progress =====*/}
      <div className='flex justify-between items-center pt-5 md:pt-0 pb-5 md:pb-10 px-0 md:px-10'>
        {/*===== Back Icon (Previous) =====*/}
        <FaAngleLeft
          className={`text-[25px] text-hamzaPrimary cursor-pointer ${step > 1 ? 'visible' : 'invisible'}`}
          onClick={handlePrev}
        />
        {/*===== Step Bar =====*/}
        <div className="hidden md:flex items-center justify-center py-8 ml-0 md:ml-[60px]">
          {steps.map((s, index) => (
            <div className="flex items-center" key={s}>
              <div className={`w-8 h-8 text-[16px] font-medium flex items-center justify-center rounded-full text-white transition-all duration-300 ${step === s ? 'bg-hamzaPrimary' : step > s ? 'bg-hamzaPrimary' : 'bg-gray-400'}`}>
                {step > s ? <FaCheck className="text-sm text-white" /> : s}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-52 h-1 mx-2 transition-colors duration-300 ${step > s ? 'bg-hamzaPrimary' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        {/*===== Login =====*/}
        <Link
          href="/auth/login"
          className='text-[18px] font-medium tracking-wide text-hamzaPrimary hover:text-white px-4 py-1 bg-transparent hover:bg-PrimaryDark border-2 border-hamzaPrimary rounded-md capitalize transition-all duration-300 cursor-pointer' >
          Login
        </Link>
      </div>

      {/*===== Step Bar =====*/}
        <div className="flex md:hidden items-center justify-center pt-4 pb-10">
          {steps.map((s, index) => (
            <div className="flex items-center" key={s}>
              <div className={`w-8 h-8 text-[16px] font-medium flex items-center justify-center rounded-full text-white transition-all duration-300 ${step === s ? 'bg-hamzaPrimary' : step > s ? 'bg-hamzaPrimary' : 'bg-gray-400'}`}>
                {step > s ? <FaCheck className="text-sm text-white" /> : s}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-52 h-1 mx-2 transition-colors duration-300 ${step > s ? 'bg-hamzaPrimary' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

      {/* ===== Image ===== */}
      <div className="flex items-center justify-center lg:mt-5 mb-8 lg:mb-14">
        <Image src={aiLogo} alt="AI Logo" />
      </div>

      <div className="text-center">
        {/*===== Conditional Headings =====*/}
        {step === 1 && (
          <h3 className='text-[22px] md:text-[30px] font-medium text-zinc-950'>
            Do you have an existing resume to use as a starting point?
          </h3>
        )}
        {step === 2 && userChoice === 'yes' && (
          <h3 className='text-[22px] md:text-[30px] font-medium text-zinc-950'>
            Great. Please upload it for a quick start.
          </h3>
        )}
        {step === 2 && userChoice === 'no' && (
          <h3 className='text-[22px] md:text-[30px] font-medium text-zinc-950'>
            Please select a template for your resume. <br className='hidden md:block' /> You can always change it later.
          </h3>
        )}

        {/*===== Buttons =====*/}
        {step === 1 && (
          <div className="mt-6 flex justify-center gap-5">
            <button onClick={() => handleNext('yes')} className="text-[18px] font-medium tracking-wide text-white hover:text-hamzaPrimary px-4 py-1 bg-hamzaPrimary hover:bg-transparent border-2 border-hamzaPrimary rounded-md capitalize transition-all duration-300 cursor-pointer">
              Yes
            </button>
            <button onClick={() => handleNext('no')} className="text-[18px] font-medium tracking-wide text-white hover:text-hamzaPrimary px-4 py-1 bg-hamzaPrimary hover:bg-transparent border-2 border-hamzaPrimary rounded-md capitalize transition-all duration-300 cursor-pointer">
              No
            </button>
          </div>
        )}
      </div>

      {/*===== Step Content Conditional Rendering =====*/}
      {step === 2 && userChoice === 'yes' && <UploadParser />}
      {step === 2 && userChoice === 'no' && <SelectTemplates />}
    </div>
  )
}

export default StepTabs

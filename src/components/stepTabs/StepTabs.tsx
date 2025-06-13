'use client'
// =========== Imports
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaAngleLeft, FaCheck } from 'react-icons/fa6'
// ===========
import aiLogo from 'media/images/aiLogo.webp'
import SelectTemplates from './SelectTemplates'
// ===========
import UploadParser from './UploadParser'
// ===============
import template1 from 'media/images/resume-templates/Sleek Simplicity 1.webp'
import template2Old from 'media/images/resume-templates/Professional Polished 2.webp'
import template3 from 'media/images/resume-templates/Elegant Executive 3.webp'
import template4 from 'media/images/resume-templates/Creative Infusion 4.webp'
import template5 from 'media/images/resume-templates/Classic Professional 5.webp'
import template6 from 'media/images/resume-templates/Career Catalyst 6.webp'
import template7 from 'media/images/resume-templates/Innovative Edge 7.webp'
import template8 from 'media/images/resume-templates/Dynamic Designer 8.webp'
import template9 from 'media/images/resume-templates/Bold Statement 9.webp'
import template10 from 'media/images/resume-templates/Fresher Resume 10.webp'
import template11 from 'media/images/resume-templates/Bright Future 11.webp'
import template12 from 'media/images/resume-templates/Stylish Standard 12.webp'
import template13 from 'media/images/resume-templates/Artistic Flair 13.webp'
import template14 from 'media/images/resume-templates/Graphical Genius 14.webp'
import template15 from 'media/images/resume-templates/Chic and Simple 15.webp'
import template16 from 'media/images/resume-templates/Executive Envision 16.webp'
import template17 from 'media/images/resume-templates/Chromatic Currere 17.webp'
import template18 from 'media/images/resume-templates/Synergistic Synapse 18.webp'
import template19 from 'media/images/resume-templates/Paradigm Pivot 19.webp'
import template20 from 'media/images/resume-templates/Transcendent Trajectory 20.webp'


//===== Template data
const templates = [
  { name: "Sleek Simplicity", image: template1 },
  { name: "Professional Polished", image: template2Old },
  { name: "Elegant Executive", image: template3 },
  { name: "Creative Infusion", image: template4 },
  { name: "Classic Professional", image: template5 },
  { name: "Career Catalyst", image: template6 },
  { name: "Innovative Edge", image: template7 },
  { name: "Dynamic Designer", image: template8 },
  { name: "Bold Statement", image: template9 },
  { name: "Fresher Resume", image: template10 },
  { name: "Bright Future", image: template11 },
  { name: "Stylish Standard", image: template12 },
  { name: "Artistic Flair", image: template13 },
  { name: "Graphical Genius", image: template14 },
  { name: "Chic and Simple", image: template15 },
  { name: "Executive Envision", image: template16 },
  { name: "Chromatic Currere", image: template17 },
  { name: "Synergistic Synapse", image: template18 },
  { name: "Paradigm Pivot", image: template19 },
  { name: "Transcendent Trajectory", image: template20 },
];

const StepTabs = ({ currentStep = 1, onTemplateSelect }: { currentStep: number, onTemplateSelect: () => void }) => {
  const [step, setStep] = useState(currentStep)
  const [userChoice, setUserChoice] = useState<'yes' | 'no' | null>(null)
  const steps = userChoice === 'yes' ? [1, 2, 3] : [1, 2]

  const handleNext = (choice: 'yes' | 'no') => {
    if (step < steps.length) {
      setUserChoice(choice)
      setStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (step > 1) {
      if (step === 2) {
        setUserChoice(null)
      }
      setStep(prev => prev - 1)
    }
  }

  return (
    <div className='container'>
      {/*====== Step Bar Progress ======*/}
      <div className='flex justify-between items-center pt-5 md:pt-0 pb-5 md:pb-10'>
        <FaAngleLeft
          className={`text-[25px] text-hamzaPrimary cursor-pointer ${step > 1 ? 'visible' : 'invisible'}`}
          onClick={handlePrev}
        />
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
        <Link
          href="/auth/login"
          className='text-[18px] font-medium tracking-wide text-hamzaPrimary hover:text-white px-4 py-1 bg-transparent hover:bg-PrimaryDark border-2 border-hamzaPrimary rounded-md capitalize transition-all duration-300 cursor-pointer'>
          Login
        </Link>
      </div>

      {/*====== Mobile Step Bar ======*/}
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

      {/*====== Logo ======*/}
      <div className="flex items-center justify-center lg:mt-5 mb-8 lg:mb-14">
        <Image src={aiLogo} alt="AI Logo" />
      </div>

      {/*====== Headings ======*/}
      <div className="text-center">
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
        {step === 3 && (
          <h3 className='text-[22px] md:text-[30px] font-medium text-zinc-950'>
            Please select a template for your resume. <br className='hidden md:block' /> You can always change it later.
          </h3>
        )}

        {/*====== Buttons ======*/}
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

      {step === 2 && userChoice === 'yes' && <UploadParser onComplete={() => setStep(3)} />}
      {step === 2 && userChoice === 'no' && <SelectTemplates templates={templates} onTemplateSelect={onTemplateSelect} />}
      {step === 3 && userChoice === 'yes' && <SelectTemplates templates={templates} onTemplateSelect={onTemplateSelect} />}
    </div>
  )
}

export default StepTabs

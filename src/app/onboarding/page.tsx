"use client"
// =============
import React, { useEffect, useState } from 'react'
import { FirstStep, LastStep, StepTabs } from '@/components'

const Page = () => {
  const [showFirstStep, setShowFirstStep] = useState(true)
  const [showLastStep, setShowLastStep] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirstStep(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleTemplateSelect = () => {
    setTimeout(() => {
      setShowLastStep(true)
    }, 500)
  }

  return (
    <>
      {showFirstStep ? (
        <FirstStep />
      ) : showLastStep ? (
        <LastStep />
      ) : (
        <StepTabs currentStep={1} onTemplateSelect={handleTemplateSelect} />
      )}
    </>
  )
}

export default Page

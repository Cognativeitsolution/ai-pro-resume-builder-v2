import React from 'react'
import Skills from './sections/Skills'
import Certificate from './sections/Certificate'
import Experience from './sections/Experience'
import Education from './sections/Education'
import Projects from './sections/Projects'
import { useDispatch, useSelector } from 'react-redux'
import { addNewSection } from '@/redux/slices/addSectionSlice'

const AllSections = () => {

  const availableSections = useSelector((state: any) => state.addSection.availableSections)
  console.log(availableSections, "aaaa");
  const dispatch = useDispatch()

  const handleAdd = (section: any) => {
    dispatch(addNewSection(section))
  }

  return (
    <div className='grid gap-4 max-h-[650px] overflow-auto p-2 mt-4'>
      {
        availableSections?.map((section: any) => {
          if (section.name === 'Skills') return <Skills key={section.id} sectionData={section} handleAddSec={handleAdd} />;
          if (section.name === 'Certificate') return <Certificate key={section.id} sectionData={section} handleAddSec={handleAdd} />;
          if (section.name === 'Experience') return <Experience key={section.id} sectionData={section} handleAddSec={handleAdd} />;
          if (section.name === 'Education') return <Education key={section.id} sectionData={section} handleAddSec={handleAdd} />;
          if (section.name === 'Projects') return <Projects key={section.id} sectionData={section} handleAddSec={handleAdd} />;
          return null;
        })

      }
    </div>
  )
}

export default AllSections;
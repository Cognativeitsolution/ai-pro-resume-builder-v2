import React, { useState } from 'react'
import Skills from './sections/SoftSkills'
import Certificate from './sections/Certificate'
import Experience from './sections/Experience'
import Education from './sections/Education'
import Projects from './sections/Projects'
import { useDispatch, useSelector } from 'react-redux'
import { addNewSection } from '@/redux/slices/addSectionSlice'
import SoftSkills from './sections/SoftSkills'
import TechnicalSkills from './sections/TechnicalSkills'
import Awards from './sections/Awards'
import References from './sections/References'
import Languages from './sections/Languages'
import CustomSections from './sections/CustomSections'

const AllSections = () => {

  const availableSections = useSelector((state: any) => state.addSection.availableSections)
  console.log(availableSections, "aaaa");
  const dispatch = useDispatch()

  const [showData, setShowData] = useState(false)
  const handleAdd = (section: any) => {
    dispatch(addNewSection(section))
  }

  return (

    <div className='grid gap-4 max-h-[650px] overflow-auto p-2 mt-4'>
      {
        availableSections?.map((section: any) => {
          if (section.name === 'Soft_Skills') return <SoftSkills key={section.id} sectionData={section} handleAddSec={handleAdd} />;
          if (section.name === 'Technical_Skills') return <TechnicalSkills key={section.id} sectionData={section} handleAddSec={handleAdd} />;
          if (section.name === 'Certificate') return <Certificate key={section.id} sectionData={section} handleAddSec={handleAdd} />;
          if (section.name === 'Experience') return <Experience key={section.id} sectionData={section} handleAddSec={handleAdd} />;
          if (section.name === 'Education') return <Education key={section.id} sectionData={section} handleAddSec={handleAdd} />;
          if (section.name === 'Projects') return <Projects key={section.id} sectionData={section} handleAddSec={handleAdd} />;
          if (section.name === 'Awards') return <Awards key={section.id} sectionData={section} handleAddSec={handleAdd} />;
          if (section.name === 'References') return <References key={section.id} sectionData={section} handleAddSec={handleAdd} />;
          if (section.name === 'Custom_Section') return <CustomSections key={section.id} sectionData={section} handleAddSec={handleAdd} />;
          if (section.name === 'Languages') return <Languages key={section.id} sectionData={section} handleAddSec={handleAdd} />;
          return null;
        })
      }
    </div>
  )
}

export default AllSections;
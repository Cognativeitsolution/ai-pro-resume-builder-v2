"use client"
import { removeSection } from '@/redux/slices/addSectionSlice';
import React, { useEffect, useState } from 'react'
import { FaDeleteLeft } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

type AllSkillsType = {
  textValue: string;
  data?: any;
};

const AllSkills = ({ textValue = '', data = {} }: AllSkillsType) => {
  const dispatch = useDispatch();
  const [skillsData, setSkillsData] = useState<string>('');

  useEffect(() => {
    if (textValue) {
      setSkillsData(textValue);
    }
  }, [textValue]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSkillsData(e.target.value);
  };
  console.log(data, "datadatadata");

  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
    }
  }

  return (
    <div className='border flex'>
      <textarea
        className="w-full p-2 rounded focus:outline-none"
        value={skillsData}
        onChange={handleTextareaChange}
      />
      <button onClick={handleRemoveSection}>
        <FaDeleteLeft className="text-red-500 hover:text-red-700 mt-1" />
      </button>
    </div>
  )
}

export default AllSkills
// "use client";
// import { addUserTechnical_Skills, removeSection } from '@/redux/slices/addSectionSlice';
// import React, { useEffect, useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { FaPen, FaTrash } from 'react-icons/fa';

// type AllTechnicalSkillsType = {
//   data?: any;
// };

// const AllTechnialSkills = ({ data = {} }: AllTechnicalSkillsType) => {
//   const dispatch = useDispatch();

//   const [inputSkill, setInputSkill] = useState<string>('');
//   const [allSkillsData, setAllSkillsData] = useState<string[]>([]);
//   const [showInput, setShowInput] = useState<boolean>(false);
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);
//   const [editedSkill, setEditedSkill] = useState<string>('');
//   const [showBtns, setShowBtns] = useState<boolean>(false);

//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
//         setShowBtns(false);

//         // Dispatch to Redux when clicking outside
//         if (allSkillsData.length > 0 && data?.id) {
//           const skillsPayload = allSkillsData.map(skill => ({
//             type: "skill",
//             name: skill
//           }));

//           dispatch(addUserTechnical_Skills({
//             sectionId: data.id,
//             detail: skillsPayload
//           }));
//         }
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [allSkillsData, data?.id, dispatch]);

//   const handleAddSkill = () => {
//     if (inputSkill.trim() !== '') {
//       setAllSkillsData([...allSkillsData, inputSkill.trim()]);
//       setInputSkill('');
//       setShowInput(false);
//     }
//   };

//   const handleShowInput = () => {
//     setShowInput(true);
//   };

//   const handleRemoveSection = () => {
//     if (data) {
//       dispatch(removeSection(data));
//     }
//   };

//   const handleDeleteSkill = (index: number) => {
//     const updated = allSkillsData.filter((_, i) => i !== index);
//     setAllSkillsData(updated);
//   };

//   const handleEditSkill = (index: number) => {
//     setEditingIndex(index);
//     setEditedSkill(allSkillsData[index]);
//   };

//   const handleSaveEdit = () => {
//     if (editingIndex !== null && editedSkill.trim() !== '') {
//       const updated = [...allSkillsData];
//       updated[editingIndex] = editedSkill.trim();
//       setAllSkillsData(updated);
//       setEditingIndex(null);
//       setEditedSkill('');
//     }
//   };
//   const handleShowEditBtn = () => {
//     setShowBtns(true);
//   }
//   return (

//     <div ref={containerRef}
//       className={`border p-4 relative flex flex-col gap-4 ${showBtns && 'bg-white'}`} onClick={handleShowEditBtn}>

//       <h1>{data?.name}</h1>
//       {/* Buttons */}
//       {showBtns && <div className="flex gap-3 absolute top-2 right-2">
//         {!showInput && (
//           <button
//             className="border px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
//             onClick={handleShowInput}
//           >
//             + Skill
//           </button>
//         )}
//         <button
//           onClick={handleRemoveSection}
//           className="border px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
//         >
//           Delete
//         </button>
//       </div>}

//       {/* Skills List */}
//       <div className="mt-1 flex flex-wrap gap-2">
//         {allSkillsData?.length ? allSkillsData.map((skill, index) => (
//           <div
//             key={index}
//             className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${showBtns && 'bg-gray-100'}`}
//           >
//             {editingIndex === index ? (
//               <>
//                 <input
//                   className="px-2 py-1 text-sm border rounded"
//                   value={editedSkill}
//                   onChange={(e) => setEditedSkill(e.target.value)}
//                   onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
//                   autoFocus
//                 />
//                 <button onClick={handleSaveEdit} className="text-green-600 text-xs">
//                   Save
//                 </button>
//               </>
//             ) : (
//               <>
//                 <ul className='list-disc ps-2'>
//                   <li>{skill}</li>
//                 </ul>
//                 {showBtns &&
//                   <>
//                     <button onClick={() => handleEditSkill(index)} className="text-blue-400 text-xs">
//                       <FaPen />
//                     </button>
//                     <button onClick={() => handleDeleteSkill(index)} className="text-red-400 text-xs">
//                       <FaTrash />
//                     </button>
//                   </>
//                 }
//               </>
//             )}
//           </div>
//         )) :
//           <span onClick={handleShowInput} className='text-gray-300'>Add Skill</span>
//         }
//       </div>

//       {/* Conditional Input Field */}
//       {showBtns && showInput && (
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={inputSkill}
//             onChange={(e) => setInputSkill(e.target.value)}
//             placeholder="Enter a skill"
//             className="border px-3 py-1 rounded-md w-full"
//             onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
//             autoFocus
//           />
//           <button
//             onClick={handleAddSkill}
//             className="border px-4 py-1 rounded-md bg-green-200"
//           >
//             Add
//           </button>
//         </div>
//       )}

//     </div>
//   );
// };

// export default AllTechnialSkills;

'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TiDelete } from 'react-icons/ti';
import { RiAddCircleFill, RiDeleteBin6Line } from 'react-icons/ri';
import { RootState } from '@/redux/store';
import { addUserTechnical_Skills, removeSection } from '@/redux/slices/addSectionSlice';

type TechnicalSkillType = {
  title: string;
  level?: number;
};

type AllTechnicalSkillsProps = {
  data?: { id: any };
  color?: string;
  templateColor: string;
};

const AllTechnicalSkills = ({
  data = { id: '' },
  color = '#fff',
  templateColor,
}: AllTechnicalSkillsProps) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userTechnical_Skills } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [technicalskills, setTechnicalSkills] = useState<TechnicalSkillType[]>([]);

  useEffect(() => {
    if (Array.isArray(userTechnical_Skills) && userTechnical_Skills.length > 0) {
      const normalizedTechnicalSkills = userTechnical_Skills.map(skill => ({
        title: skill.title ?? '',
        level: skill.level ?? 0,
      }));
      setTechnicalSkills(normalizedTechnicalSkills);
    }
  }, [userTechnical_Skills]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setEditable(false);
        const validTechnicalSkills = technicalskills.filter(skill => skill.title.trim() !== '');
        dispatch(addUserTechnical_Skills({
          sectionId: data.id,
          detail: validTechnicalSkills
        }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [technicalskills, dispatch, data.id]);

  const handleEditableSection = () => setEditable(true);

  const handleAddTechnicalSkill = () => {
    setTechnicalSkills([...technicalskills, { title: '', level: 0 }]);
  };

  const handleDeleteTechnicalSkill = (index: number) => {
    const updated = technicalskills.filter((_, i) => i !== index);
    setTechnicalSkills(updated);
  };

  const handleInputChange = (index: number, value: string) => {
    const updated = [...technicalskills];
    updated[index].title = value;
    setTechnicalSkills(updated);
  };

  const handleRemoveSection = () => {
    dispatch(removeSection(data));
    dispatch(addUserTechnical_Skills({ sectionId: data.id, detail: [] }));
  };

  const handleAddFirstTechnicalSkill = (value: string) => {
    const newSkill = { title: value.trim(), level: 0 };
    if (newSkill.title !== '') {
      setTechnicalSkills([newSkill]);
    }
  };

  const handleBlur = (index: number) => {
    if (technicalskills[index]?.title.trim() === '') {
      const updated = technicalskills.filter((_, i) => i !== index);
      setTechnicalSkills(updated);
    }
  };

  return (
    <div ref={containerRef} onClick={handleEditableSection}>
      {editable && (
        <div className="flex gap-1 absolute top-5 right-0">
          <button className="cursor-pointer" style={{ color: templateColor }} onClick={handleAddTechnicalSkill}>
            <RiAddCircleFill size={24} />
          </button>
          <button className="cursor-pointer" style={{ color: templateColor }} onClick={handleRemoveSection}>
            <TiDelete size={30} />
          </button>
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-1 ">
        {technicalskills.length > 0 ?
          technicalskills.map((skill, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 rounded-full opacity-75 backdrop-blur-[40px] font-medium px-3 py-1 transition-all duration-500 ease-in-out ${hoveredIndex === index ? 'pr-5' : ''
                }`}
              style={{
                color,
                background: templateColor,
                border: `1px solid ${templateColor}`,
              }}
              onMouseOver={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setHoveredIndex(index);
                }
              }}
              onMouseOut={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setHoveredIndex(null);
                }
              }}
            >
              <input
                value={skill.title}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onBlur={() => handleBlur(index)}
                placeholder="Technical Skill"
                className="bg-transparent text-sm truncate placeholder:text-sm focus:outline-none transition-all duration-500 ease-in-out w-[115px] opacity-70 "
                style={{ color }}
                autoFocus
              />
              {hoveredIndex === index && (
                <button onClick={() => handleDeleteTechnicalSkill(index)} className="opacity-70 hover:opacity-100">
                  <RiDeleteBin6Line size={18} style={{ color }} />
                </button>
              )}
            </div>
          ))
          : (
            <div
              className="flex items-center gap-2 rounded-full opacity-75 backdrop-blur-[40px] font-medium  px-3 py-1"
              style={{
                color,
                background: templateColor,
                border: `1px solid ${templateColor}`,
              }}
            >
              <input
                value={''}
                onChange={(e) => handleAddFirstTechnicalSkill(e.target.value)}
                placeholder="Technical Skill"
                className="bg-transparent text-sm placeholder:text-sm focus:outline-none "
                style={{ color }}
                autoFocus
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default AllTechnicalSkills;

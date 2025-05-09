import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import AllCertificates from '../all-sections/sections-details/AllCertificates';
import AllEducations from '../all-sections/sections-details/AllEducations';
import AllExperiences from '../all-sections/sections-details/AllExperiences';
import AllProjects from '../all-sections/sections-details/AllProjects';
import AllSummary from '../all-sections/sections-details/AllSummary';
import AllSoftSkills from '../all-sections/sections-details/AllSoftSkills';
import AllTechnialSkills from '../all-sections/sections-details/AllTechnicalSkills';
import AllHeader from '../all-sections/sections-details/AllHeader';
import AllLanguages from '../all-sections/sections-details/AllAwards';
import AllCustomSections from '../all-sections/sections-details/AllReferences';
import AllReferences from '../all-sections/sections-details/AllReferences';
import AllAwards from '../all-sections/sections-details/AllAwards';

type CurrentState = {
    fontSize: string;
    fontFamily: string;
    fontWeight: string;
    color: string;
    margin: number;
    padding: number;
    text: any;
}
type ResumePreviewProps = {
    currentState: CurrentState;
    updateState: (newState: CurrentState) => void;
}

const Template3 = (props: ResumePreviewProps) => {
    const addedSections = useSelector((state: any) => state.addSection.addedSections)
    const [textValue, setTextValue] = useState([]);

    const handleTextareaChange = (data: any) => {
        setTextValue(data.target.value)
    }

    console.log(addedSections, "addedSectionsaddedSections", textValue, "textValue", addedSections);

    return (
        <div className='border flex flex-col h-[600px] overflow-auto bg-gray-100'>
            <h1 className='text-center mx-auto flex justify-center'>Template 1</h1>

            <div className='items-start grid  grid-cols-12 gap-4'>
                {addedSections?.length && addedSections?.map((data: any, index: any) => (
                    <div key={index} className='col-span-12 border m-5'>

                        {data && data.name === "Header" && <AllHeader data={data} />}

                        {data && data.name === "Summary" && <AllSummary data={data} />}

                        {data?.name === "Experience" && (<AllExperiences data={data} />)}

                        {data?.name === "Education" && (<AllEducations data={data} />)}

                        {data && data.name === "Soft_Skills" && <AllSoftSkills data={data} />}
                        {data && data.name === "Technical_Skills" && <AllTechnialSkills data={data} />}
                        {data?.name === "Projects" && (<AllProjects data={data} />)}
                        {data?.name === "Certificate" && (<AllCertificates data={data} />)}
                        {data?.name === "Awards" && (<AllAwards data={data} />)}
                        {data?.name === "Languages" && (<AllLanguages data={data} />)}
                        {data?.name === "References" && (<AllReferences data={data} />)}
                        {data?.name === "Custom_Section" && (<AllCustomSections data={data} />)}

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Template3



// import { removeSection } from '@/redux/slices/addSectionSlice';
// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';


// type CurrentState = {
//     fontSize: string;
//     fontFamily: string;
//     fontWeight: string;
//     color: string;
//     margin: number;
//     padding: number;
//     text: any;
// }

// // Define the shape of a section object
// type Section = {
//     id: string;
//     component: string;
// }

// // Define the props for the ResumePreview component
// type ResumePreviewProps = {
//     currentState: CurrentState;
//     updateState: (newState: CurrentState) => void;
// }

// const ResumeTemplateNew = (props: ResumePreviewProps) => {

//     const dispatch = useDispatch();
//     const { currentState, updateState } = props
//     // Typing the Redux state with the sections array
//     const { sections } = useSelector((state: { font: { sections: Section[] } }) => state.font);

//     const addedSections = useSelector((state: any) => state.addSection.addedSections)

//     if (!currentState) {
//         return <div>Error: currentState is undefined</div>;
//     }

//     const handleRemoveSection = (section: any) => {
//         dispatch(removeSection(section))
//     }

//     return (
//         <div className='border flex mx-auto h-[600px] w-[1200px]'>

//             {
//                 addedSections?.map((data: any, index: any) => (
//                     <div key={index}>
//                         <textarea
//                             className="w-full p-2 border rounded focus:outline-none"
//                             style={{
//                                 fontSize: currentState.fontSize || "16px",
//                                 fontFamily: currentState.fontFamily || "Arial",
//                                 fontWeight: currentState.fontWeight || "normal",
//                                 color: currentState.color || "black",
//                                 margin: `${currentState.margin || 0}px`,
//                                 padding: `${currentState.padding || 0}px`,
//                             }}
//                             value={data?.name || ""}
//                             onChange={(e) => updateState({ ...currentState, text: e.target.value })}
//                         />

//                         <button
//                             onClick={() => handleRemoveSection(data)}
//                             className="text-red-500 mt-2"
//                         >
//                             Remove
//                         </button>
//                     </div>
//                 ))
//             }

//         </div>
//     )
// }

// export default ResumeTemplateNew
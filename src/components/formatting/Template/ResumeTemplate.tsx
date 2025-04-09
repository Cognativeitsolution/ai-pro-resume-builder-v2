import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import AllSkills from '../all-sections/sections-details/AllSkills';
import AllCertificates from '../all-sections/sections-details/AllCertificates';
import AllEducations from '../all-sections/sections-details/AllEducations';
import AllExperiences from '../all-sections/sections-details/AllExperiences';
import AllProjects from '../all-sections/sections-details/AllProjects';

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

const ResumeTemplateNew = (props: ResumePreviewProps) => {
    const addedSections = useSelector((state: any) => state.addSection.addedSections)

    const [textValue, setTextValue] = useState([]);

    const handleTextareaChange = (data: any) => {
        setTextValue(data.target.value)
    }

    console.log(textValue, "textValue", addedSections);

    return (
        <div className='border flex flex-col h-[600px]'>
            <h1 className='text-center mx-auto flex justify-center'>Template 1</h1>

            <div className='items-start grid  grid-cols-12 gap-4'>
                {addedSections?.length && addedSections?.map((data: any, index: any) => (
                    <div className='col-span-12 border m-5'>
                        <h2>{data?.name}</h2>

                        {data && data.name === "Skills" && <AllSkills textValue={data.name} data={data} />}

                        {/* {data?.name === "Certificate" && (<AllCertificates textValue={data?.name} />)}

                        {data?.name === "Education" && (<AllEducations textValue={data?.name} />)}

                        {data?.name === "Experience" && (<AllExperiences textValue={data?.name} />)}

                        {data?.name === "Projects" && (<AllProjects textValue={data?.name} />)} */}

                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResumeTemplateNew



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
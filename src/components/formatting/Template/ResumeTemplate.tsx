import { removeSection } from '@/redux/slices/addSectionSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';


type CurrentState = {
    fontSize: string;
    fontFamily: string;
    fontWeight: string;
    color: string;
    margin: number;
    padding: number;
    text: any;
}

// Define the shape of a section object
type Section = {
    id: string;
    component: string;
}

// Define the props for the ResumePreview component
type ResumePreviewProps = {
    currentState: CurrentState;
    updateState: (newState: CurrentState) => void;
}

const ResumeTemplateNew = (props: ResumePreviewProps) => {

    const dispatch = useDispatch();
    const { currentState, updateState } = props
    // Typing the Redux state with the sections array
    const { sections } = useSelector((state: { font: { sections: Section[] } }) => state.font);

    const addedSections = useSelector((state: any) => state.addSection.addedSections)

    if (!currentState) {
        return <div>Error: currentState is undefined</div>;
    }

    const handleRemoveSection = (section: any) => {
        dispatch(removeSection(section))
    }

    return (
        <div className='border flex mx-auto h-[600px] w-[1200px]'>

            {
                addedSections?.map((data: any, index: any) => (
                    <div key={index}>
                        <textarea
                            className="w-full p-2 border rounded focus:outline-none"
                            style={{
                                fontSize: currentState.fontSize || "16px",
                                fontFamily: currentState.fontFamily || "Arial",
                                fontWeight: currentState.fontWeight || "normal",
                                color: currentState.color || "black",
                                margin: `${currentState.margin || 0}px`,
                                padding: `${currentState.padding || 0}px`,
                            }}
                            value={data?.name || ""}
                            onChange={(e) => updateState({ ...currentState, text: e.target.value })}
                        />

                        <button
                            onClick={() => handleRemoveSection(data)}
                            className="text-red-500 mt-2"
                        >
                            Remove
                        </button>
                    </div>
                ))
            }

        </div>
    )
}

export default ResumeTemplateNew
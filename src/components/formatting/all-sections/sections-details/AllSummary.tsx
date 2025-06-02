"use client";
import EditableField from '@/components/editor/editable-field';
import { addUserSummary, sectionEditMode } from '@/redux/slices/addSectionSlice';
import React, { JSX, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import SectionToolbar from '../../section-toolbar/SectionToolbar';
import Image from 'next/image';
import AIImage from 'media/assets/artificial-intelligence.png'

type AllSummaryType = {
    data?: any;
    textColor?: string;
    textAltColor?: string;
    templateColor?: string;
    fontSize?: any;
    fontFamily?: any;
    textEditorPosition?: any;
    dotPosition?: any;
    isDot?: any;
    highlightText?: (text: string) => string;
};

const AllSummary = ({ data = {}, textColor = "#000",
    textAltColor = "#000",
    templateColor,
    fontSize,
    fontFamily,
    textEditorPosition,
    dotPosition,
    isDot,
    highlightText

}: AllSummaryType) => {
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);

    const [inputData, setInputData] = useState<string>('');
    const [editable, setEditable] = useState<boolean>(false);

    const handleDataChange = (e: any) => {
        setInputData(e.target.value);
    }


    const handleEditableSection = () => {
        setEditable(true);
        dispatch(sectionEditMode(true))
    }


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setEditable(false);
                dispatch(sectionEditMode(false))
                dispatch(addUserSummary({
                    sectionId: data.id,
                    detail: inputData
                }));
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [data?.id, dispatch, inputData]);

    useEffect(() => {
        if (data?.description) {
            setInputData(data.description);
        }
    }, [data?.description]);




    return (
        <div ref={containerRef} className={`p-1 flex flex-col ${editable && 'bg-white rounded-sm'}`} onClick={handleEditableSection}>
            {editable && (
                <SectionToolbar
                    isTextEditor={true}
                    mainClass={`transition-all duration-500 ease-in-out ${editable ? "block " : "hidden"}`}
                    isVerticleHeader="hidden"
                    textEditorPosition={textEditorPosition ? textEditorPosition : `top-1 left-[25%] `}
                    isHeader={false}
                    showDot={true}
                    dotPosition={dotPosition}
                    isDot={isDot}
                />
            )}
            <div className="flex flex-wrap gap-2">
                {editable ?
                    // <EditableField
                    //     html={inputData}
                    //     onChange={handleDataChange}
                    //     placeholder="Description"
                    //     className="bg-transparent"
                    //     style={{
                    //         color: textColor,
                    //         fontSize: fontSize,
                    //         fontFamily: fontFamily,
                    //     }}
                    // />
                    <EditableField
                        html={inputData}
                        onChange={handleDataChange}
                        placeholder="Description"
                        className="bg-transparent"
                        style={{
                            color: textColor,
                            fontSize: fontSize,
                            fontFamily: fontFamily,
                        }}
                        highlightText={highlightText}
                    />
                    :
                    <p
                        className="w-full rounded focus:outline-none focus:ring-0 focus:border-0"
                        style={{
                            color: textColor,
                            fontSize: fontSize,
                            fontFamily: fontFamily,
                        }}
                        dangerouslySetInnerHTML={{
                            __html: highlightText ? highlightText(inputData) : inputData,
                        }}
                    />
                    //     {highlightText ? highlightText(inputData) : inputData}
                    // </p>
                }
            </div>

        
            {editable && (
                <div className={`absolute top-16 -left-[30px] transition-all duration-300 ease-in-out
                ${editable ? 'opacity-100 ' : 'opacity-0 '}
              `}>
                    <button
                        className="flex justify-center items-center"
                    >
                        <Image src={AIImage} alt="ai" width={28} height={28} />
                    </button>
                </div>
            )}
        </div >
    )
};

export default AllSummary;

"use client";
import EditableField from '@/components/editor/editable-field';
import { addUserSummary, sectionEditMode } from '@/redux/slices/addSectionSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import SectionToolbar from '../../section-toolbar/SectionToolbar';

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
};

const AllSummary = ({ data = {}, textColor = "#000",
    textAltColor = "#000",
    templateColor,
    fontSize,
    fontFamily,
    textEditorPosition,
    dotPosition,
    isDot

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
                    />
                    :
                    <p className="w-full rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0"
                        style={{
                            color: textColor,
                            fontSize: fontSize,
                            fontFamily: fontFamily,
                        }}
                    >
                        {inputData}
                    </p>
                }
            </div>

        </div>
    )
};

export default AllSummary;

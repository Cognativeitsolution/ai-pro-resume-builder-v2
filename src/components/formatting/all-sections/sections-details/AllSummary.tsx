"use client";
import EditableField from '@/components/editor/editable-field';
import { addUserSummary, sectionEditMode } from '@/redux/slices/addSectionSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

type AllSummaryType = {
    data?: any;
    textColor?: string;
    textAltColor?: string;
    templateColor?: string;
    fontSize?: any;
    fontFamily?: any;
};

const AllSummary = ({ data = {}, textColor = "#000",
    textAltColor = "#000",
    templateColor,
    fontSize,
    fontFamily, }: AllSummaryType) => {
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
        <div ref={containerRef} className={`p-1 border-4 relative flex flex-col gap-4 ${editable && 'bg-white rounded-sm'}`} onClick={handleEditableSection}>
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

"use client";
import { addUserHeader } from '@/redux/slices/addSectionSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

type AllHeaderType = {
    data?: any;
};

const AllHeader = ({ data = {} }: AllHeaderType) => {
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);

    const [inputData, setInputData] = useState<string>('');
    const [editable, setEditable] = useState<boolean>(false);

    const handleDataChange = (e: any) => {
        setInputData(e.target.value);
    }
    const handleEditableSection = () => {
        setEditable(true);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setEditable(false);

                dispatch(addUserHeader({
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
        <div ref={containerRef}
            className={`border p-4 relative flex flex-col gap-4 
            ${editable && 'bg-white'}`} onClick={handleEditableSection}
        >
            <h1>{data?.name}</h1>

            <div className="mt-1 flex flex-wrap gap-2">
                <input
                    value={inputData}
                    className='border w-full'
                    type='text'
                    onChange={handleDataChange}
                    placeholder='Full Name'
                />
            </div>

        </div>
    );
};

export default AllHeader;

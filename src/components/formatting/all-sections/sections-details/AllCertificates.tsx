'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addUserCertificates, removeSection, sectionEditMode } from '@/redux/slices/addSectionSlice';
import { RiAddCircleFill, RiDeleteBin6Line } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';
import CustomDatePicker from '../../custom/CustomDatePicker';
import SectionToolbar from '../../section-toolbar/SectionToolbar';

type CertificateType = {
  title: string;
  description: string;
  institutionName: string;
};

type AllSummaryType = {
  data?: any;
  textColor?: string;
  textAltColor?: string;
  templateColor?: string;
};

const AllCertificates = ({
  data = {},
  textColor,
  textAltColor,
  templateColor
}: AllSummaryType) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userCertificates } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState(false);
  const [certificates, setCertificates] = useState<CertificateType[]>([]);

  useEffect(() => {
    if (Array.isArray(userCertificates) && userCertificates.length > 0) {
      const normalizedCertificates = userCertificates.map(Certificate => ({
        title: Certificate.title ?? '',
        description: Certificate.description ?? '',
        institutionName: Certificate.institutionName ?? '',
      }));
      setCertificates(normalizedCertificates);
    }
  }, [userCertificates]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setEditable(false);
        dispatch(sectionEditMode(false))
        const validCertificates = certificates.filter(
          certificate => certificate.title.trim() && certificate.institutionName.trim()
        );

        // Only dispatch if something actually changed or is valid
        if (validCertificates.length > 0) {
          dispatch(addUserCertificates({
            sectionId: data.id,
            detail: validCertificates
          }));
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [certificates, dispatch, data.id]);

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true))
  }

  const handleAddCertificate = () => {
    setCertificates([...certificates, { title: '', description: '', institutionName: '' }]);
  };

  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
      dispatch(addUserCertificates({ sectionId: data.id, detail: [] }));
    }
  };

  const handleInputChange = (index: number, field: keyof CertificateType, value: string) => {
    const updated = [...certificates];
    updated[index] = { ...updated[index], [field]: value };
    setCertificates(updated);
  };

  const handleDelete = (index: number) => {
    const updated = certificates.filter((_, i) => i !== index);
    setCertificates(updated);
  };

  const handleBlur = (index: number) => {
    if (certificates[index]?.title.trim() === '') {
      const updated = certificates.filter((_, i) => i !== index);
      setCertificates(updated);
    }
  };

  const handleAddFirstCertificate = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue !== '') {
      setCertificates([{ title: trimmedValue, description: '', institutionName: '' }]);
    }
  };

  return (
    <div ref={containerRef} className={`flex flex-col gap-4 ${editable && 'bg-white'} `} onClick={handleEditableSection}>

      {editable && (
        <SectionToolbar
          onCopy={handleAddCertificate}
          onDelete={handleRemoveSection}
          // onMoveUp={handleAddAward}
          position="top-8 right-0"
          showDot={true}
        />
      )}
      <div className="flex flex-col gap-3 ">
        {certificates.length > 0 ? (
          certificates.map((cert, index) => (
            <div key={index} className='relative px-2 py-4'>
              {/* ====== Job Title ====== */}
              <div className="flex items-center justify-between">
                <div className='w-full'>
                  <input
                    value={cert.title}
                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                    onBlur={() => handleBlur(index)}
                    placeholder="Title"
                    className="w-full bg-transparent text-[16px] rounded placeholder:text-[16px] focus:outline-none focus:ring-0 focus:border-0"
                    style={{
                      color: textAltColor ? textAltColor : textColor
                    }}
                  />
                </div>
                {/* ====== Date Picker ====== */}
                <CustomDatePicker onChange={(dates) => console.log(dates)} />
              </div>
              {/* ====== Company Name ====== */}
              <div className='w-full'>
                <input
                  type="text"
                  value={cert.institutionName}
                  placeholder="Institution Name"
                  onBlur={() => handleBlur(index)}
                  onChange={(e) => handleInputChange(index, 'institutionName', e.target.value)}
                  className="w-full text-[14px] bg-transparent rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 "
                  style={{
                    color: textColor
                  }}
                />
              </div>
              <div>
                <textarea
                  value={cert.description}
                  disabled={!editable}
                  onBlur={() => handleBlur(index)}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                  placeholder="Description"
                  rows={2}
                  className="w-full text-[14px] bg-transparent rounded placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 mb-4"
                  style={{
                    color: textColor
                  }}
                />
              </div>
              <div className="absolute bottom-2 right-2">
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-800/30 text-red-800 text-sm w-6 h-6 flex justify-center items-center rounded-l-sm"
                >
                  <RiDeleteBin6Line size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='relative px-2 py-4'>
            {/* ====== Job Title ====== */}
            <div className="flex items-center justify-between">
              <div className='w-full'>
                <input
                  value=""
                  onChange={(e) => handleAddFirstCertificate(e.target.value)}
                  placeholder="Title"
                  className="w-full text-[16px] bg-transparent rounded placeholder:text-[16px] focus:outline-none focus:ring-0 focus:border-0"
                  style={{
                    color: textAltColor ? textAltColor : textColor
                  }}
                />
              </div>
              {/* ====== Date Picker ====== */}
              <CustomDatePicker onChange={(dates) => console.log(dates)} />
            </div>
            <div>
              <input
                type="text"
                placeholder="Institution Name"
                value=""
                onChange={(e) => handleAddFirstCertificate(e.target.value)}
                className="w-full text-[14px] rounded bg-transparent placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 "
                style={{
                  color: textColor
                }}
              />
            </div>
            <div>
              <textarea
                disabled={!editable}
                value=""
                onChange={(e) => handleAddFirstCertificate(e.target.value)}
                placeholder="Description"
                rows={2}
                className="w-full text-[14px] rounded bg-transparent placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-0 mb-4"
                style={{
                  color: textColor
                }}
              />
            </div>
            <div className="absolute bottom-2 right-2">
              <button
                onClick={handleRemoveSection}
                className="bg-red-800/30 text-red-800 text-sm w-6 h-6 flex justify-center items-center rounded-l-sm"
              >
                <RiDeleteBin6Line size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default AllCertificates;

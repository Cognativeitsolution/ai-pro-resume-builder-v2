"use client";
import { addUserCertificates, removeSection } from '@/redux/slices/addSectionSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaPen, FaTrash } from 'react-icons/fa';

type AllCertificatesType = {
  data?: any;
};

const AllAwards = ({ data = {} }: AllCertificatesType) => {
  const dispatch = useDispatch();

  const [inputCertificate, setInputCertificate] = useState<string>('');
  const [allCertificatesData, setAllCertificatesData] = useState<string[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedCertificate, setEditedCertificate] = useState<string>('');
  const [showBtns, setShowBtns] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowBtns(false);

        // Dispatch to Redux when clicking outside
        if (allCertificatesData.length > 0 && data?.id) {
          const CertificatesPayload = allCertificatesData.map(Certificate => ({
            type: "Certificate",
            name: Certificate
          }));

          dispatch(addUserCertificates({
            sectionId: data.id,
            detail: CertificatesPayload
          }));
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [allCertificatesData, data?.id, dispatch]);

  const handleAddCertificate = () => {
    if (inputCertificate.trim() !== '') {
      setAllCertificatesData([...allCertificatesData, inputCertificate.trim()]);
      setInputCertificate('');
      setShowInput(false);
    }
  };

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleRemoveSection = () => {
    if (data) {
      dispatch(removeSection(data));
    }
  };

  const handleDeleteCertificate = (index: number) => {
    const updated = allCertificatesData.filter((_, i) => i !== index);
    setAllCertificatesData(updated);
  };

  const handleEditCertificate = (index: number) => {
    setEditingIndex(index);
    setEditedCertificate(allCertificatesData[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editedCertificate.trim() !== '') {
      const updated = [...allCertificatesData];
      updated[editingIndex] = editedCertificate.trim();
      setAllCertificatesData(updated);
      setEditingIndex(null);
      setEditedCertificate('');
    }
  };
  const handleShowEditBtn = () => {
    setShowBtns(true);
  }
  return (

    <div ref={containerRef}
      className={`border p-4 relative flex flex-col gap-4 ${showBtns && 'bg-white'}`} onClick={handleShowEditBtn}>

      <h1>{data?.name}</h1>
      {/* Buttons */}
      {showBtns && <div className="flex gap-3 absolute top-2 right-2">
        {!showInput && (
          <button
            className="border px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
            onClick={handleShowInput}
          >
            + Certificate
          </button>
        )}
        <button
          onClick={handleRemoveSection}
          className="border px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
        >
          Delete
        </button>
      </div>}

      {/* Certificates List */}
      <div className="mt-1 flex flex-wrap gap-2">
        {allCertificatesData?.length ? allCertificatesData.map((Certificate, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${showBtns && 'bg-gray-100'}`}
          >
            {editingIndex === index ? (
              <>
                <input
                  className="px-2 py-1 text-sm border rounded"
                  value={editedCertificate}
                  onChange={(e) => setEditedCertificate(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                  autoFocus
                />
                <button onClick={handleSaveEdit} className="text-green-600 text-xs">
                  Save
                </button>
              </>
            ) : (
              <>
                <ul className='list-disc ps-2'>
                  <li>{Certificate}</li>
                </ul>
                {showBtns &&
                  <>
                    <button onClick={() => handleEditCertificate(index)} className="text-blue-400 text-xs">
                      <FaPen />
                    </button>
                    <button onClick={() => handleDeleteCertificate(index)} className="text-red-400 text-xs">
                      <FaTrash />
                    </button>
                  </>
                }
              </>
            )}
          </div>
        )) :
          <span onClick={handleShowInput} className='text-gray-300'>Add Certificate</span>
        }
      </div>

      {/* Conditional Input Field */}
      {showBtns && showInput && (
        <div className="flex gap-2">
          <input
            type="text"
            value={inputCertificate}
            onChange={(e) => setInputCertificate(e.target.value)}
            placeholder="Enter a Certificate"
            className="border px-3 py-1 rounded-md w-full"
            onKeyDown={(e) => e.key === 'Enter' && handleAddCertificate()}
            autoFocus
          />
          <button
            onClick={handleAddCertificate}
            className="border px-4 py-1 rounded-md bg-green-200"
          >
            Add
          </button>
        </div>
      )}

    </div>
  );
};

export default AllAwards;

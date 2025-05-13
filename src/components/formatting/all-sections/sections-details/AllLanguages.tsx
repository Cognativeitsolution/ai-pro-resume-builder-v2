'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TiDelete } from 'react-icons/ti';
import { RiAddCircleFill, RiDeleteBin6Line } from 'react-icons/ri';
import { RootState } from '@/redux/store';
import { addUserLanguages, removeSection } from '@/redux/slices/addSectionSlice';

type LanguageType = {
  title: string;
  description?: string;
  level?: number;
};

type AllLanguagesProps = {
  data?: { id: any };
  color?: string;
  templateColor: string;
};

const AllLanguages = ({
  data = { id: '' },
  color = '#fff',
  templateColor,
}: AllLanguagesProps) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { userLanguages } = useSelector((state: RootState) => state.addSection);
  const [editable, setEditable] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [languages, setLanguages] = useState<LanguageType[]>([]);

  useEffect(() => {
    if (Array.isArray(userLanguages) && userLanguages.length > 0) {
      const normalizedLanguages = userLanguages.map(lang => ({
        title: lang.title ?? '',
        level: lang.level ?? 0,
      }));
      setLanguages(normalizedLanguages);
    }
  }, [userLanguages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setEditable(false);
        setEditingIndex(null);

        dispatch(addUserLanguages({
          sectionId: data?.id,
          detail: languages
        }))
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [languages, dispatch, data?.id]);

  const handleEditableSection = () => setEditable(true);

  const handleAddLanguage = () => {
    setLanguages([...languages, { title: '', level: 0 }]);
  };

  const handleDeleteLanguage = (index: number) => {
    const updated = languages.filter((_, i) => i !== index);
    setLanguages(updated);
  };

  const handleInputChange = (index: number, value: string) => {
    const updated = [...languages];
    updated[index].title = value;
    setLanguages(updated);
    setEditingIndex(index);
  };

  const handleLevelChange = (index: number, value: number) => {
    const updated = [...languages];
    updated[index].level = value;
    setLanguages(updated);
    setEditingIndex(index);
  };

  const handleRemoveSection = () => {
    dispatch(removeSection(data));
    dispatch(addUserLanguages({ sectionId: data.id, detail: [] }));
  };

  const handleAddFirstLanguage = (value: any) => {
    const newLang = { title: value, level: 0 };
    if (value.trim() !== "") {
      setLanguages([newLang]);
      setEditingIndex(0);
    }
  };

  const handleBlur = (index: number) => {
    if (languages[index]?.title.trim() === '') {
      const updated = languages.filter((_, i) => i !== index);
      setLanguages(updated);
    }
  };

  return (
    <div ref={containerRef} onClick={handleEditableSection}

    >
      {editable && (
        <div className="flex gap-1 absolute top-5 right-0">
          <button className="cursor-pointer" style={{ color }} onClick={handleAddLanguage}>
            <RiAddCircleFill size={24} />
          </button>
          <button className="cursor-pointer" style={{ color }} onClick={handleRemoveSection}>
            <TiDelete size={30} />
          </button>
        </div>
      )}

      <div className="px-1 flex flex-col gap-4 relative">
        <div className="flex flex-col gap-3">
          {languages.length > 0 ? (
            languages.map((lang, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <input
                    value={lang.title}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onBlur={() => handleBlur(index)}
                    placeholder="Language"
                    className="text-base placeholder:text-base focus:outline-none bg-transparent "
                    style={{ color }}
                    autoFocus
                  />
                  {editingIndex === index && lang.title.trim() !== "" && (
                    <div className="flex gap-2">
                      <div className="text-sm opacity-65" style={{ color }}>
                        {lang.level ?? 0}%
                      </div>
                      <button
                        onClick={() => handleDeleteLanguage(index)}
                        className="opacity-65 hover:opacity-100"
                        style={{ color }}
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 mt-1">
                  <div className="overflow-hidden h-[8px] flex items-center w-80">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={lang.level ?? 0}
                      disabled={lang.title.trim() !== "" ? false : true}
                      onChange={(e) => handleLevelChange(index, Number(e.target.value))}
                      className="w-full opacity-80"
                      style={{ accentColor: templateColor }}

                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <input
                  value={""}
                  onChange={(e) => handleAddFirstLanguage(e.target.value)}
                  placeholder="Language"
                  className="text-base placeholder:text-base focus:outline-none bg-transparent "
                  style={{ color }}
                  autoFocus
                />
              </div>
              <div className="flex items-center justify-between gap-3 mt-1">
                <div className="overflow-hidden h-[8px] flex items-center w-80">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value=""
                    disabled={true}
                    className="w-full opacity-80"
                    style={{ accentColor: templateColor }}

                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AllLanguages;

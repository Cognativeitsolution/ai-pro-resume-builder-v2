'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RootState } from '@/redux/store';
import { addUserLanguages, removeSection, sectionEditMode } from '@/redux/slices/addSectionSlice';
import SectionToolbar from '../../section-toolbar/SectionToolbar';
import { moveItem } from '@/utils/moveUpDown';
import { ImMoveDown, ImMoveUp } from 'react-icons/im';

type LanguageType = {
  title: string;
  description?: string;
  level?: number;
};

type AllLanguagesProps = {
  data?: { id: any };
  textColor?: string;
  textAltColor?: string;
  templateColor?: string;
  editableAltBG?: string;
  fontSize?: any;
  fontFamily?: any;
  dotPosition?: any;
  isVerticleHeader?: any;
  headerPosition?: any;
  isDot?: any;
};

const AllLanguages = ({
  data = { id: '' },
  textColor = '#fff',
  textAltColor,
  templateColor,
  editableAltBG,
  fontSize,
  fontFamily,
  dotPosition,
  isVerticleHeader,
  headerPosition,
  isDot
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
        dispatch(sectionEditMode(false))
        dispatch(addUserLanguages({
          sectionId: data?.id,
          detail: languages
        }))
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [languages, dispatch, data?.id]);

  const handleEditableSection = () => {
    setEditable(true);
    dispatch(sectionEditMode(true))
  }
  const handleAddLanguage = () => {
    setLanguages([...languages, { title: '', level: 0 }]);
  };

  const handleDeleteLanguage = (index: number) => {
    if (languages?.length <= 1 && index === 0) {
      handleRemoveSection();
    }
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
  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const updated = moveItem(languages, index, index - 1);
    setLanguages(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index >= languages.length - 1) return;
    const updated = moveItem(languages, index, index + 1);
    setLanguages(updated);
  };
  return (
    <div ref={containerRef} className={`px-1 py-4 relative ${editable === true ? editableAltBG ? editableAltBG : 'bg-white rounded-sm' : 'bg-transparent'}`} onClick={handleEditableSection}>
      {editable && (
        <SectionToolbar
          isTextEditor={false}
          onCopy={handleAddLanguage}
          onDelete={handleRemoveSection}
          isVerticleHeader={isVerticleHeader}
          headerPosition={headerPosition}
          // position={`-top-[154px] right-[68px] `}
          mainClass={`transition-all duration-500 ease-in-out ${editable ? "block " : "hidden"}`}
          showDot={true}
          dotPosition={dotPosition}
          isDot={isDot}
        // dotPosition={`top-[30px] left-[48px]`}
        />
      )}

      <div className="px-1 flex flex-col gap-4 relative">
        <div className="flex flex-col gap-3">
          {languages.length > 0 ? (
            languages.map((lang, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <div>
                    <input
                      value={lang.title}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onBlur={() => handleBlur(index)}
                      placeholder="Language"
                      className="text-base w-10/12 placeholder:text-base focus:outline-none bg-transparent"
                      style={{
                        color: textColor,
                        fontSize: fontSize,
                        fontFamily: fontFamily
                      }}
                      autoFocus
                    />
                  </div>
                  {editingIndex === index && lang.title.trim() !== "" && (
                    <div className="flex gap-2">
                      <div className="text-sm opacity-65"
                        style={{ color: textColor }}>
                        {lang.level ?? 0}%
                      </div>
                      <button
                        onClick={() => handleDeleteLanguage(index)}
                        className="opacity-65 hover:opacity-100"
                        style={{ color: textColor }}
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                      {languages?.length > 1 && <button
                        onClick={() => handleMoveUp(index)}
                        className="opacity-65 hover:opacity-100"
                        style={{ color: textColor }}
                      >
                        <ImMoveUp size={20} />
                      </button>}
                      {languages?.length > 1 && <button
                        onClick={() => handleMoveDown(index)}
                        className="opacity-65 hover:opacity-100"
                        style={{ color: textColor }}
                      >
                        <ImMoveDown size={20} />
                      </button>}
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
                      style={{ accentColor: textAltColor }}
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
                  style={{ color: textColor }}
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
                    style={{ accentColor: textAltColor }}
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

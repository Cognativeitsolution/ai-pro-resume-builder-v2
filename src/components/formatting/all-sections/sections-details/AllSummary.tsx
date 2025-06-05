"use client";
import EditableField from '@/components/editor/editable-field';
import { addUserSummary, sectionEditMode } from '@/redux/slices/addSectionSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import SectionToolbar from '../../section-toolbar/SectionToolbar';
import AiRobo from '../../aiAssistant/AiRobo';
import axios from 'axios';


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
    correctText?: (text: string) => string;
};

const AllSummary = ({ data = {}, textColor = "#000",
    textAltColor = "#000",
    templateColor,
    fontSize,
    fontFamily,
    textEditorPosition,
    dotPosition,
    isDot,
    highlightText,
    correctText,

}: AllSummaryType) => {
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const [inputData, setInputData] = useState<string>('');
    const [inputData2, setInputData2] = useState<string>('');
    const [editable, setEditable] = useState<boolean>(false);
    const [correctedWords, setCorrectedWords] = useState<string[]>([])

    const handleDataChange = (e: any) => {
        setInputData(e.target.value);
    }
    const handleEditableSection = () => {
        setEditable(true);
        dispatch(sectionEditMode(true))
    }

    const handleSpellingCorrection = () => {
        setInputData(inputData2);
        setInputData2("");
    };

    const highlightCorrectedWords = (text: string): string => {
        return text.split(/\s+/).map(word => {
            const cleaned = word.replace(/[.,!?]/g, "").toLowerCase();
            if (correctedWords.map(w => w.toLowerCase()).includes(cleaned)) {
                return `<span class="text-blue-500">${word}</span>`;
            }
            return word;
        }).join(" ");
    };

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

    useEffect(() => {
        if (data?.description) {
            const runSpellCorrection = async () => {
                try {
                    const res = await axios.post('https://ai.spellcheck.aiproresume.com/api/v1/spell-correction', {
                        text: data.description
                    });

                    const correctedData = res.data?.data;
                    let newText = data.description;
                    const corrected: string[] = [];

                    correctedData.forEach(({ misspelledWord, correctedWord }: any) => {
                        const regex = new RegExp(`\\b${misspelledWord}\\b`, 'gi');
                        newText = newText.replace(regex, correctedWord);
                        corrected.push(correctedWord);
                    });

                    setCorrectedWords(corrected);
                    setInputData2(newText);
                } catch (err) {
                    console.error("Initial spell correction error:", err);
                }
            };

            runSpellCorrection();
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
                }
            </div>
            {editable && (
                <AiRobo
                    positionClass="-left-[70px] hover:-left-[154px] top-14"
                    info={highlightCorrectedWords(inputData2) !== "" ? highlightCorrectedWords(inputData2) : "no spell mistake found"}
                    popupTitle={highlightText ? "Spelling Correction" : "AI Assistant"}
                    popupTitleBtn="Apply"
                    popupTheme="red"
                    onClickPopup={handleSpellingCorrection}
                />
            )}
        </div>
    )
};

export default AllSummary; 
"use client";
import EditableField from '@/components/editor/editable-field';
import { addUserSummary, sectionEditMode } from '@/redux/slices/addSectionSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import SectionToolbar from '../../section-toolbar/SectionToolbar';
import AiRobo from '../../aiAssistant/AiRobo';
import BotPopup from '../../aiAssistant/BotPopup';
import { useSpellCorrection } from '@/app/configs/store/useSpellCorrection';
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
    popupRefSummary?: any;
    enableSpellCorrection?: boolean;
};

const AllSummary = ({
    data,
    textColor = "#000",
    textAltColor = "#000",
    templateColor,
    fontSize,
    fontFamily,
    textEditorPosition,
    dotPosition,
    isDot,
    highlightText,
    popupRefSummary,
    enableSpellCorrection = false,
}: AllSummaryType) => {
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    // const [correctedText, setCorrectedText] = useState("");
    // const [correctedWords, setCorrectedWords] = useState<string[]>([]);
    const description = typeof data === 'string' ? data : data?.description || '';
    const { correctedText, correctedWords } = useSpellCorrection(description);
    const [inputData, setInputData] = useState<string>('');
    const [editable, setEditable] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showSpellCorrection, setShowSpellCorrection] = useState(enableSpellCorrection); // ✅ local state
    console.log(data, "data of summary")
    const handleDataChange = (val: string) => {
        setInputData(val);
    };

    const handleEditableSection = () => {
        setEditable(true);
        dispatch(sectionEditMode(true));
    };

    const handleSpellingCorrection = () => {
        setInputData(correctedText);
        setShowPopup(false);
        setShowSpellCorrection(false);
    };

    // const handleSpellingCorrection = () => {
    //     if (inputData) {
    //         setInputData(inputData);
    //         dispatch(addUserSummary({
    //             sectionId: data.id,
    //             detail: inputData
    //         }));
    //         setInputData("");
    //         setCorrectedText("");
    //         setCorrectedWords([]);
    //         setShowPopup(false);
    //     }
    // };


    const highlightCorrectedWords = (text: string): string => {
        console.log("highlightCorrectedWords INPUT:", text);
        console.log("Corrected Words:", correctedWords);
        if (!text || !correctedWords || correctedWords.length === 0) return text;

        return text.split(/\s+/).map(word => {
            const cleaned = word.replace(/[.,!?]/g, "").toLowerCase();
            if (correctedWords.map(w => w.toLowerCase()).includes(cleaned)) {
                return `<span class="text-blue-500">${word}</span>`;
            }
            return word;
        }).join(" ");
    };

    // const highlightCorrectedWords = (text: string): string => {
    //     if (!text) return "";
    //     return text.split(/\s+/).map(word => {
    //         const cleaned = word.replace(/[.,!?]/g, "").toLowerCase();
    //         if (correctedWords.map(w => w.toLowerCase()).includes(cleaned)) {
    //             return `<span class="text-blue-500">${word}</span>`;
    //         }
    //         return word;
    //     }).join(" ");
    // };

    // Close AI popup
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };
        if (showPopup) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopup]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setEditable(false);
                dispatch(sectionEditMode(false));
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
        if (description) {
            setInputData(description);
        }
    }, [description]);

    // Sync props to local state (optional but recommended)
    useEffect(() => {
        setShowSpellCorrection(enableSpellCorrection);
    }, [enableSpellCorrection]);


    // Run spell correction
    // useEffect(() => {
    //     console.log(data?.description, "data?.description")
    //     if (data?.description) {
    //         const runSpellCorrection = async () => {
    //             try {
    //                 const res = await axios.post('https://ai.spellcheck.aiproresume.com/api/v1/spell-correction', {
    //                     text: data.description
    //                 });

    //                 const correctedData = res.data?.data;
    //                 let newText = data.description;
    //                 const corrected: string[] = [];

    //                 correctedData.forEach(({ misspelledWord, correctedWord }: any) => {
    //                     const regex = new RegExp(`\\b${misspelledWord}\\b`, 'gi');
    //                     newText = newText.replace(regex, correctedWord);
    //                     corrected.push(correctedWord);
    //                 });

    //                 setCorrectedWords(corrected);
    //                 setInputData(newText);
    //                 setCorrectedText(newText);
    //                 if (corrected.length > 0) {
    //                     setShowPopup(true);
    //                 }
    //             } catch (err) {
    //                 console.error("Spell correction error:", err);
    //             }
    //         };

    //         runSpellCorrection();
    //     }
    // }, [data?.description]);



    return (
        <div
            ref={containerRef}
            className={`p-1 flex flex-col ${editable && 'bg-white rounded-sm'}`}
            onClick={handleEditableSection}
        >
            {editable && (
                <SectionToolbar
                    isTextEditor={true}
                    mainClass={`transition-all duration-500 ease-in-out ${editable ? "block" : "hidden"}`}
                    isVerticleHeader="hidden"
                    textEditorPosition={textEditorPosition || "top-1 left-[25%]"}
                    isHeader={false}
                    showDot={true}
                    dotPosition={dotPosition}
                    isDot={isDot}
                />
            )}

            <div className="flex flex-wrap gap-2">
                {/* {editable ? ( */}
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
            </div>

            {editable && (
                <div ref={popupRef}>
                    <AiRobo
                        positionClass="-left-[70px] hover:-left-[154px] top-14"
                        info="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
                        popupTitle="AI Assistant"
                        popupTitleBtn="Generate"
                    />
                </div>
            )}

            {showSpellCorrection && correctedText && (
                <div ref={popupRefSummary}>
                    <BotPopup
                        info={highlightCorrectedWords(correctedText) || "No spell mistake found"}
                        popupTitle="Spelling Correction"
                        popupTitleBtn="Apply"
                        popupTheme="red"
                        onClickPopup={handleSpellingCorrection}
                        popupWidth="w-full"
                        popupPosition="top-[110%] -left-[25%]"
                    />
                </div>
            )}
        </div>
    );
};

export default AllSummary;

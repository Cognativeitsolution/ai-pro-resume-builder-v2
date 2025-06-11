"use client";
import EditableField from '@/components/editor/editable-field';
import { addUserSummary, sectionEditMode } from '@/redux/slices/addSectionSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import SectionToolbar from '../../section-toolbar/SectionToolbar';
import AiRobo from '../../aiAssistant/AiRobo';
import BotPopup from '../../aiAssistant/BotPopup';
import { useSpellCorrection } from '@/app/configs/store/useSpellCorrection';

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
    popupRef2?: any;
    enableSpellCorrection?: boolean;
};

const AllSummary = ({
    data = {},
    textColor = "#000",
    textAltColor = "#000",
    templateColor,
    fontSize,
    fontFamily,
    textEditorPosition,
    dotPosition,
    isDot,
    highlightText,
    popupRef2,
    enableSpellCorrection = false,
}: AllSummaryType) => {
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const { correctedText, correctedWords } = useSpellCorrection(data?.description || '');

    const [inputData, setInputData] = useState<string>('');
    const [editable, setEditable] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showSpellCorrection, setShowSpellCorrection] = useState(enableSpellCorrection); // ✅ local state

    const handleDataChange = (val: string) => {
        setInputData(val);
        console.log(val + " aaaaaaaaaaaaaaaaaa");
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

    const highlightCorrectedWords = (text: string): string => {
        return text.split(/\s+/).map(word => {
            const cleaned = word.replace(/[.,!?]/g, "").toLowerCase();
            if (correctedWords.map(w => w.toLowerCase()).includes(cleaned)) {
                return `<span class="text-blue-500">${word}</span>`;
            }
            return word;
        }).join(" ");
    };

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
        if (data?.description) {
            setInputData(data.description);
        }
    }, [data?.description]);

    useEffect(() => {
        setShowSpellCorrection(enableSpellCorrection);
    }, [enableSpellCorrection]);

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
                {/* ) : (
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
                )} */}
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
                <div ref={popupRef2}>
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

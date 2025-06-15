import EditableField from '@/components/editor/editable-field';
import { addUserSummary, sectionEditMode } from '@/redux/slices/addSectionSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SectionToolbar from '../../section-toolbar/SectionToolbar';
import AiRobo from '../../aiAssistant/AiRobo';
import BotPopup from '../../aiAssistant/BotPopup';
import { useSpellCorrection } from '@/app/configs/store/useSpellCorrection';
import { RootState } from '@/redux/store';
import { setCorrectedSection } from '@/redux/slices/improveTextSlice';

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
    popupRefSummary?: any;
    enableSpellCorrection?: boolean;
    AiRoboPosition?: string;
    BotPopupPosition?: string;
};

const AllSummary = ({
    data,
    textColor = "#000",
    textAltColor = "#000",
    fontSize,
    fontFamily,
    textEditorPosition,
    dotPosition,
    isDot,
    highlightText,
    popupRefSummary,
    enableSpellCorrection = false,
    AiRoboPosition,
    BotPopupPosition
}: AllSummaryType) => {
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const popupRefSpell = useRef<HTMLDivElement | null>(null);

    // const summaryText = useSelector((state: RootState) => state.ImproveText.summary.correctedText);
    const summaryData = useSelector((state: RootState) => state.ImproveText.sections["summary"]);

    if (summaryData) {
        console.log(summaryData.correctedWords, 'yelo'); // ['alwayz', 'libary']
        console.log(summaryData.totalLength, 'yelo'); // 120
    }
    const description = typeof data === 'string' ? data : data?.description || '';
    const { correctedText, correctedWords } = useSpellCorrection(description);

    const [inputData, setInputData] = useState<string>('');
    const [editable, setEditable] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupSpell, setShowPopupSpell] = useState(false);
    const [showSpellCorrection, setShowSpellCorrection] = useState(enableSpellCorrection); // local state
    // const summaryText = useSelector((state: RootState) => state.ImproveText.summary.correctedText);
    // const correctedWords = useSelector((state: RootState) => state.ImproveText.summary.correctedWords);

    // const highlightCorrectedWords = (text: string): string => {
    //   if (!text || !correctedWords || correctedWords.length === 0) return text;

    //   return text.split(/\s+/).map(word => {
    //     const cleaned = word.replace(/[.,!?]/g, "").toLowerCase();
    //     if (correctedWords.map(w => w.toLowerCase()).includes(cleaned)) {
    //       return `<span class="text-blue-500">${word}</span>`;
    //     }
    //     return word;
    //   }).join(" ");
    // };
    const handleDataChange = (val: string) => {
        setInputData(val);
    };

    const handleEditableSection = () => {
        setEditable(true);
        dispatch(sectionEditMode(true));
    };

    const handleSpellingCorrection = () => {
        setInputData(correctedText);
        // setInputData(summaryText);
        setShowPopup(false);
        setShowSpellCorrection(false);
    };

    // Highlight the corrected words
    const highlightCorrectedWords = (text: string): string => {
        if (!text || !correctedWords || correctedWords.length === 0) return text;

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

    // Close on outside click for summary input and spell correction
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setEditable(false);
                dispatch(sectionEditMode(false));
                dispatch(addUserSummary({
                    sectionId: data?.id || 2,
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

    useEffect(() => {
        setShowSpellCorrection(enableSpellCorrection);
    }, [enableSpellCorrection]);

    // Handle click outside for popupSpell
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRefSpell.current && !popupRefSpell.current.contains(event.target as Node)) {
                setShowPopupSpell(false);
            }
        };
        if (showPopupSpell) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopupSpell]);

    useEffect(() => {
        if (description && correctedText && correctedWords) {
            dispatch(setCorrectedSection({
                section: "summary",
                originalText: description,
                correctedText,
                correctedWords,
                incorrectWords: [], // if you're not using yet, leave empty
                totalLength: description.length,
            }));
        }
    }, [description, correctedText, correctedWords, dispatch]);

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
                        positionClass={AiRoboPosition ? AiRoboPosition : "-left-[70px] hover:-left-[154px] top-14"}
                        info="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
                        popupTitle="AI Assistant"
                        popupTitleBtn="Generate"
                    />
                </div>
            )}

            {/* {showSpellCorrection && correctedText && ( */}
            {/* <div ref={popupRefSpell}>
                <BotPopup
                    // info={highlightCorrectedWords(correctedText) || "No spell mistake found"}
                    popupTitle="Spelling Correction"
                    popupTitleBtn="Apply"
                    popupTheme="red"
                    onClickPopup={handleSpellingCorrection}
                    popupWidth="w-full"
                    popupPosition={BotPopupPosition ? BotPopupPosition : "top-[110%] -left-[25%]"}
                />
            </div> */}
            {/* )} */}
        </div>
    );
};

export default AllSummary;

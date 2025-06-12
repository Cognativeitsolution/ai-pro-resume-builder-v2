"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGrammarCheck, setSpellCheck } from '@/redux/slices/improveTextSlice';
import CustomSwitch from '@/components/common/switch/switch';
import { Lock } from 'lucide-react';
import BotPopup from '../aiAssistant/BotPopup';

export default function ImproveText() {
    const dispatch = useDispatch();
    const { grammarCheck, spellCheck, incorrectWords, grammarErrors } = useSelector((state: any) => state?.ImproveText)

    // Handle grammar check toggle
    const handleGrammarCheck = () => {
        dispatch(setGrammarCheck(!grammarCheck));

    };

    // Handle spell check toggle
    const handleSpellCheck = () => {
        dispatch(setSpellCheck(!spellCheck));
    };

    useEffect(() => {
        console.log('Updated grammarCheck:', grammarCheck);
        console.log('Updated spellCheck:', spellCheck);
    }, [grammarCheck, spellCheck]);

    // Dummy list of incorrect sentences
    const list = [
        "I has alwayz enjoyd goin to the libary becaus books is very intersting and helps me learn many thingz.",
        "Sometime I spends hourz their reading differnt kinds of novel and magazins. My favrite book is Harry Poter,",
        "it have a magical story that keep me exited every time I read it again. I also like to write storys but my",
        "spelling not alwayz correct, wich is why I try to impruve everyday by reading and praticing."
    ];

    return (
        <div className='mt-4 pt-2 relative'>
            <div className='flex pb-6 items-center justify-between '>
                <p className='capitalize'>Tailored Suggessions</p>
                <CustomSwitch
                // checked={grammarCheck}
                // onChange={handleGrammarCheck}

                />
            </div>
            <div className='flex pb-6 items-center justify-between '>
                <p className='capitalize'>Spell Check </p>
                <div className='flex justify-center items-center gap-2'>
                    <div className='flex gap-2'>
                        {spellCheck && (
                            <div className='w-6 h-6 flex justify-center items-center rounded-sm bg-red-100 text-red-600 text-xs'>
                                {incorrectWords.length}
                            </div>
                        )}
                        <CustomSwitch
                            checked={spellCheck}
                            onChange={handleSpellCheck}
                        />
                    </div>
                </div>
            </div>
            <div className='flex pb-6 items-center justify-between '>
                <p className='capitalize'>Grammer Check</p>
                <div className='flex justify-center items-center gap-2'>
                    <Lock size={16} className="text-gray-600" />
                    <div className='flex gap-2'>
                        {/* <div className='w-6 h-6 flex justify-center items-center rounded-sm bg-blue-100 text-blue-600'>
                            4
                        </div> */}
                        {/* {grammarCheck && (
                            <div className='w-6 h-6 flex justify-center items-center rounded-sm bg-blue-100 text-blue-600 text-xs'>
                                {grammarErrors.length}
                            </div>
                        )} */}
                        <CustomSwitch
                            checked={grammarCheck}
                            onChange={handleGrammarCheck}
                        // disabled={true}
                        />
                    </div>
                </div>
            </div>
            <div className='flex pb-6 items-center justify-between '>
                <p className='capitalize'>Wording & readability</p>
                <div className='flex justify-center items-center gap-2'>
                    <Lock size={16} className="text-gray-600" />
                    <CustomSwitch
                        disabled={true}
                    // checked={spellCheck}
                    // onChange={handleSpellCheck}
                    />
                </div>
            </div>
            <div className='flex pb-6 items-center justify-between '>
                <p className='capitalize'>Recommendations</p>
                <div className='flex justify-center items-center gap-2'>
                    <Lock size={16} className="text-gray-600" />
                    <CustomSwitch
                        disabled={true}
                    // checked={spellCheck}
                    // onChange={handleSpellCheck}
                    />
                </div>
            </div>
            <div>
                <BotPopup
                    // info={highlightCorrectedWords(correctedText) || "No spell mistake found"}
                    list={list}
                    popupTitle="Spelling Correction"
                    popupTitleBtn="Apply All"
                    popupTitleBtn2="Remove All"
                    btnBackground="bg-indigo-500"
                    btnBackgroundHover="hover:bg-indigo-700"
                    popupTheme="red"
                    // onClickPopup={handleSpellingCorrection}
                    popupWidth="w-full"
                    popupPosition="top-[110%] z-10"
                />
            </div>
        </div>
    );
}

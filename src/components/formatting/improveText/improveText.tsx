"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGrammarCheck, setSpellCheck } from '@/redux/slices/improveTextSlice';
import CustomSwitch from '@/components/common/switch/switch';

export default function ImproveText() {
    const dispatch = useDispatch();
    const grammarCheck = useSelector((state: any) => state?.ImproveText?.grammarCheck);
    const spellCheck = useSelector((state: any) => state?.ImproveText?.spellCheck);

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

    return (
        <div className=''>

            <div className='pt-8'>
                <div className='flex pb-8 items-center justify-between '>
                    <p>Grammar Checker</p>
                    <CustomSwitch
                        checked={grammarCheck}
                        onChange={handleGrammarCheck}

                    />
                </div>
                <div className='flex pb-8 items-center justify-between '>
                    <p>Spelling Checker</p>
                    <CustomSwitch
                        checked={spellCheck}
                        onChange={handleSpellCheck}
                    />
                </div>
            </div>
        </div>
    );
}

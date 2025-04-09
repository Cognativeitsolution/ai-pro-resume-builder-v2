"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGrammarCheck, setSpellCheck } from '@/redux/slices/improveTextSlice';
import CustomSwitch from '@/components/common/switch/switch';
import { Lock } from 'lucide-react';

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
                        {/* <Lock size={16} className="text-gray-600" /> */}
                        <CustomSwitch
                            checked={spellCheck}
                            onChange={handleSpellCheck}
                        />
                    </div>
                </div>
                <div className='flex pb-6 items-center justify-between '>
                    <p className='capitalize'>Grammer Check</p>
                    <div className='flex justify-center items-center gap-2'>
                        <Lock size={16} className="text-gray-600" />
                        <CustomSwitch
                            checked={grammarCheck}
                            onChange={handleGrammarCheck}
                            disabled={true}
                        />
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
            </div>
        </div>
    );
}

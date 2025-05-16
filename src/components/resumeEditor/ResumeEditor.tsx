"use client";
// ============
import React, { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
// ============
import Popup from '@/components/popup/Popup';
import usePopup from '@/app/configs/store/Popup';
import { addNewSection } from "@/redux/slices/addSectionSlice";
import { ResumeActiveTemplate, TextEditor, UserHeader } from "@/components";
import AddSectionClipPath from '@/components/common/clipPath/addSectionClipPath';


const ResumeEditor = ({ sectionData }: { sectionData?: any }) => {
    const dispatch = useDispatch();
    const { availableSections, addedSections } = useSelector((state: RootState) => state.addSection);
    const { fontFamily, fontSize, color } = useSelector((state: any) => state.font);

    const [currentState, setCurrentState] = useState<any>({
        fontSize,
        fontWeight: "normal",
        color,
        selectedIndex: 0,
        text: [],
        fontFamily,
        margin: 0,
        padding: "8px",
    });

    const [history, setHistory] = useState<any[]>([currentState]);
    const [future, setFuture] = useState<any[]>([]);

    const updateState = (newState: any) => {
        if (JSON.stringify(currentState) !== JSON.stringify(newState)) {
            setHistory([...history, currentState]);
            setCurrentState(newState);
            setFuture([]);
        }
    };

    const handleUndo = () => {
        if (history.length > 1) {
            const lastState = history[history.length - 1];
            setCurrentState(lastState);
            setFuture([currentState, ...future]);
            setHistory(history.slice(0, history.length - 1));
        }
    };

    const handleRedo = () => {
        if (future.length > 0) {
            const nextState = future[0];
            setCurrentState(nextState);
            setHistory([...history, nextState]);
            setFuture(future.slice(1));
        }
    };

    useEffect(() => {
        const newText = availableSections.map((section: any) => section.text || '');
        setCurrentState((prev: any) => ({
            ...prev,
            text: newText,
        }));
    }, [availableSections]);

    const { popup, togglePopup } = usePopup();

    const handleAddSection = (newSection: any) => {
        dispatch(addNewSection(newSection));
        togglePopup(true);
    };

    return (
        <>
            {sectionData?.locked && <AddSectionClipPath />}
            {popup && <Popup handleAddSec={handleAddSection} sectionData={sectionData} />}

            <UserHeader
                currentState={currentState}
                handleUndo={handleUndo}
                handleRedo={handleRedo}
                history={history}
                future={future}
            />
            <div className="grid grid-cols-12 px-5 mt-28 mb-10">
                <div className="col-span-4">
                    <TextEditor currentState={currentState} updateState={updateState} />
                </div>
                <div className="col-span-8">
                    <ResumeActiveTemplate
                        currentState={currentState}
                        updateState={updateState}
                        addedSections={addedSections}
                    />
                </div>
            </div>
        </>
    );
};

export default ResumeEditor;

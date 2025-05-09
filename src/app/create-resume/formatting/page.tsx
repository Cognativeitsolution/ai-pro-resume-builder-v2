"use client";
import React, { useEffect, useState } from "react";
import { ResumeActiveTemplate, Template, TextEditor, UserHeader } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
export default function Page() {
    const { availableSections } = useSelector((state: RootState) => state.addSection);
    const { fontFamily, fontSize, color } = useSelector((state: any) => state.font)



    const [currentState, setCurrentState] = useState<any>({
        fontSize: fontSize,
        fontWeight: "normal",
        color: color,
        selectedIndex: 0,
        text: [],
        fontFamily: fontFamily,
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
        // Ensure text is an array of strings
        const newText = availableSections.map((section: any) => section.text || ''); // Adjust field name if necessary
        setCurrentState((prevState: any) => ({
            ...prevState,
            text: newText, // populate text with an array of strings
        }));
    }, [availableSections]);



    return (
        <>

            <UserHeader
                currentState={currentState}
                handleUndo={handleUndo}
                handleRedo={handleRedo}
                history={history}
                future={future}
            />
            <div className="grid grid-cols-12 px-5 mt-28 mb-10">
                <div className="col-span-4">
                    <TextEditor
                        currentState={currentState}
                        updateState={updateState}
                    />
                </div>
                <div className="col-span-8">
                    <ResumeActiveTemplate
                        currentState={currentState}
                        updateState={updateState}
                    />
                </div>
            </div>

        </>
    );
}

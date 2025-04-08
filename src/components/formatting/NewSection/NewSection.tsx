"use client"
import React from 'react';

// Define the shape of the `currentState` object
type CurrentState = {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  color: string;
  margin: number;
  padding: number;
  text: string;
}

// Define the props for the component
interface NewSectionProps {
  currentState: CurrentState;
  updateState: (newState: CurrentState) => void;
}

const NewSection = (props: NewSectionProps) => {
  const { currentState, updateState } = props
  return (
    <div className="mt-4">
      <textarea
        className="w-full text-center border rounded"
        style={{
          fontSize: currentState.fontSize || "16px",
          fontFamily: currentState.fontFamily || "Arial",
          fontWeight: currentState.fontWeight || "normal",
          color: currentState.color || "black",
          margin: `${currentState.margin || 0}px`,
          padding: `${currentState.padding || 0}px`,
        }}
        value={currentState.text || ""}
        onChange={(e) => updateState({ ...currentState, text: e.target.value })}
      />
    </div>
  );
};

export default NewSection;

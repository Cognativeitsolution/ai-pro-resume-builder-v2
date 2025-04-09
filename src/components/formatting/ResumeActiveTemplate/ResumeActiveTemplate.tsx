"use client"

import ResumeTemplateNew from '../Template/ResumeTemplate';

type CurrentState = {
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  color: string;
  margin: number;
  padding: number;
  text: any;
}

type ResumePreviewProps = {
  currentState: CurrentState;
  updateState: (newState: CurrentState) => void;
}

const ResumeActiveTemplate = (props: ResumePreviewProps) => {
  const { currentState, updateState } = props

  return (
    <div className="bg-[#ffffff] border border-gray-300 rounded-md h-full p-5">

      <ResumeTemplateNew
        currentState={currentState}
        updateState={updateState}
      />

    </div>
  );
};

export default ResumeActiveTemplate;

// context/EditorTabContext.tsx
import React, { createContext, useContext, useState } from "react";

type TabContextType = {
  activeTabContext: string;
  setActiveTabContext: (tab: string) => void;
};

const EditorTabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTabContext, setActiveTabContext] = useState("Add Section");

  return (
    <EditorTabContext.Provider value={{ activeTabContext, setActiveTabContext }}>
      {children}
    </EditorTabContext.Provider>
  );
};

export const useEditorTab = () => {
  const context = useContext(EditorTabContext);
  if (!context) throw new Error("useEditorTab must be used inside TabProvider");
  return context;
};

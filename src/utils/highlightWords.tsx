import React from "react";

interface HighlightOptions {
  spellCheck?: boolean;
  grammarCheck?: boolean;
}

export const highlightWords = (
  text: string,
  incorrectWords: string[] = [],
  grammarErrors: string[] = [],
  options: HighlightOptions = {}
) => {
  const { spellCheck, grammarCheck } = options;

  return text.split(/\s+/).map((word, index) => {
    const cleanedWord = word.replace(/[.,!?]/g, "").toLowerCase();
    const isSpellingMistake = spellCheck && incorrectWords.includes(cleanedWord);
    const isGrammarMistake = grammarCheck && grammarErrors.includes(cleanedWord);

    return (
      <span
        key={index}
        className={`${isSpellingMistake ? "text-red-500" : ""
          } ${isGrammarMistake ? "bg-blue-200 underline" : ""}`}
      >
        {word}{" "}
      </span>
    );
  });
};
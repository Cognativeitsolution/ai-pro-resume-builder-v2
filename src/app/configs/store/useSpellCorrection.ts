// /configs/store/useSpellCorrection.ts
import { useEffect, useState } from "react";
import axios from "axios";

export const useSpellCorrection = (text: string) => {
    const [correctedText, setCorrectedText] = useState("");
    const [correctedWords, setCorrectedWords] = useState<string[]>([]);

    useEffect(() => {
        const fetchSpellCorrection = async () => {
            try {
                const res = await axios.post(
                    "https://ai.spellcheck.aiproresume.com/api/v1/spell-correction",
                    { text }
                );

                const corrections = res.data?.data;
                let updatedText = text;
                const words: string[] = [];

                corrections.forEach(({ misspelledWord, correctedWord }: any) => {
                    const regex = new RegExp(`\\b${misspelledWord}\\b`, 'gi');
                    updatedText = updatedText.replace(regex, correctedWord);
                    words.push(correctedWord);
                });

                setCorrectedText(updatedText);
                setCorrectedWords(words);
            } catch (error) {
                console.error("Spell correction error:", error);
            }
        };

        if (text) fetchSpellCorrection();
    }, [text]);

    return { correctedText, correctedWords };
};

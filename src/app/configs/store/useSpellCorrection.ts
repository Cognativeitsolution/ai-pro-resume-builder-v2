import { useEffect, useState } from "react";
import axios from "axios";

export const useSpellCorrection = (text: string) => {
    const [correctedText, setCorrectedText] = useState<string>("");
    const [correctedWords, setCorrectedWords] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);  // Optional: to track API loading state
    const [error, setError] = useState<string | null>(null);   // Optional: to capture any errors

    useEffect(() => {
        const fetchSpellCorrection = async () => {
            if (!text) return;

            setLoading(true);  // Set loading to true when starting the API call
            setError(null);  // Clear previous errors (if any)

            try {
                const res = await axios.post(
                    "https://ai.spellcheck.aiproresume.com/api/v1/spell-correction",
                    { text }
                );

                const corrections = res.data?.data;
                let updatedText = text;
                const words: string[] = [];

                corrections.forEach(({ misspelledWord, correctedWord }: any) => {
                    const regex = new RegExp(`\\b${misspelledWord}\\b`, "gi"); // Properly match word boundaries
                    updatedText = updatedText.replace(regex, correctedWord); // Replace misspelled word with the corrected word
                    words.push(correctedWord); // Collect the corrected words
                });

                setCorrectedText(updatedText); // Set the corrected text
                setCorrectedWords(words); // Set the corrected words list
            } catch (error) {
                console.error("Spell correction error:", error);
                setError("An error occurred while fetching corrections"); // Set error message if API call fails
            } finally {
                setLoading(false); // Set loading to false after API call is complete
            }
        };

        fetchSpellCorrection();
    }, [text]);  // Re-run the effect when the `text` changes

    return { correctedText, correctedWords, loading, error };
};

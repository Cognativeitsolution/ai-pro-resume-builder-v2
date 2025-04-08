"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ResumeTemplate = () => {
    const grammarCheck = useSelector((state: any) => state?.ImproveText?.grammarCheck);
    const spellCheck = useSelector((state: any) => state?.ImproveText?.spellCheck);

    const [incorrectWords, setIncorrectWords] = useState<string[]>([]);  // Initialize as an empty array
    const [grammarErrors, setGrammarErrors] = useState<string[]>([]);    // Initialize as an empty array
    const [loading, setLoading] = useState(false);

    const personalInfo = {
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        address: "123 Street, City",
    };

    const summary =
        "I am a software developr with a passion for wrng solving and incorect debugging.";

    const experience = [
        {
            company: "Tech Corp",
            position: "Frontend Developer",
            duration: "2020 - Present",
            description:
                "Worked on React and Tailwind projects with exmple best practices.",
        },
    ];

    const education = [
        {
            degree: "Bachelor's in Computer Engineering",
            institution: "XYZ University",
            year: "2018 - 2022",
        },
    ];

    const technicalSkills = ["React.js", "Next.js", "TypeScript", "Tailwind CSS"];
    const softSkills = ["Communication", "Problem-solving", "Leadership"];
    const awards = ["Best Developer Award - 2021"];
    const certifications = ["Certified React Developer"];

    // Combine all text content into one for API request

    const fullText = [
        personalInfo.name,
        personalInfo.email,
        personalInfo.phone,
        personalInfo.address,
        summary,
        ...experience.map((exp) => `${exp.company} ${exp.position} ${exp.description}`),
        ...education.map((edu) => `${edu.degree} ${edu.institution} ${edu.year}`),
    ].join("\n");

    useEffect(() => {
        const fetchCorrections = async () => {
            if (!spellCheck && !grammarCheck) return;
            setLoading(true);

            try {
                let spellingMistakes: string[] = [];
                let grammarMistakes: string[] = [];

                if (spellCheck === true) {
                    const spellResponse = await axios.post(
                        "https://ai.spellcheck.aiproresume.com/api/v1/spell-correction",
                        { text: fullText },
                        { headers: { "Content-Type": "application/json" } }
                    );
                    spellingMistakes = spellResponse.data?.data?.map((item: any) => item?.misspelledWord) || [];
                }

                if (grammarCheck === true) {
                    const grammarResponse = await axios.post(
                        "https://ai.grmcheck.aiproresume.com/api/v1/grammar-correction",
                        { text: fullText },
                        { headers: { "Content-Type": "application/json" } }
                    );
                    grammarMistakes = grammarResponse.data?.data?.map((item: any) => item?.wrongWords) || [];
                }

                setIncorrectWords(spellingMistakes);
                setGrammarErrors(grammarMistakes);
            } catch (error) {
                console.error("Error fetching corrections:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCorrections();
    }, [spellCheck, grammarCheck]);


    const highlightWords = (text: string) => {
        return text.split(/\s+/).map((word, index) => {
            // Normalize word by removing punctuation and making it lowercase
            const cleanedWord = word.replace(/[.,!?]/g, "").toLowerCase();

            // Ensure incorrectWords and grammarErrors are always arrays before calling 'includes'
            const isSpellingMistake = spellCheck && incorrectWords.includes(cleanedWord);
            const isGrammarMistake = grammarCheck && grammarErrors.includes(cleanedWord);

            return (
                <span
                    key={index}
                    className={`
                        ${isSpellingMistake ? "text-red-500" : ""}
                        ${isGrammarMistake ? "bg-blue-200 underline" : ""}
                    `}
                >
                    {word}{" "}
                </span>
            );
        });
    };

    return (
        <div className="p-6 max-w-3xl mx-auto border border-gray-300 shadow-lg bg-white text-left">
            <h1 className="text-2xl font-bold">{highlightWords(personalInfo.name)}</h1>
            <p>{highlightWords(personalInfo.email)}</p>
            <p>{highlightWords(personalInfo.phone)}</p>
            <p>{highlightWords(personalInfo.address)}</p>

            <h2 className="text-xl font-semibold mt-4">Summary</h2>
            <p>{highlightWords(summary)}</p>

            <h2 className="text-xl font-semibold mt-4">Experience</h2>
            {experience.map((exp, index) => (
                <div key={index}>
                    <h3 className="font-bold">{highlightWords(exp.company)}</h3>
                    <p>{highlightWords(exp.position)} ({highlightWords(exp.duration)})</p>
                    <p>{highlightWords(exp.description)}</p>
                </div>
            ))}

            <h2 className="text-xl font-semibold mt-4">Education</h2>
            {education.map((edu, index) => (
                <div key={index}>
                    <h3 className="font-bold">{highlightWords(edu.degree)}</h3>
                    <p>{highlightWords(edu.institution)} ({highlightWords(edu.year)})</p>
                </div>
            ))}

            <h2 className="text-xl font-semibold mt-4">Technical Skills</h2>
            <p>{technicalSkills.join(", ")}</p>

            <h2 className="text-xl font-semibold mt-4">Soft Skills</h2>
            <p>{softSkills.join(", ")}</p>

            <h2 className="text-xl font-semibold mt-4">Awards</h2>
            <p>{awards.join(", ")}</p>

            <h2 className="text-xl font-semibold mt-4">Certifications</h2>
            <p>{certifications.join(", ")}</p>

            {loading && <p className="text-gray-500 mt-4">Checking for errors...</p>}
        </div>
    );
};

export default ResumeTemplate;

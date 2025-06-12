'use client';

import { useEffect, useState } from "react";
import ResumePage from "./ResumePage";
import ResumeSection from "./ResumeSection";

type ResumeSectionData = {
    type: string;
    entries: string[];
};

export default function ResumeBuilder() {
    const [sections, setSections] = useState<ResumeSectionData[]>([
        {
            type: "Experience",
            entries: [
                "Software Engineer @ ABC (2020–2022)",
                "Developer @ XYZ (2018–2020)",
            ],
        },
        {
            type: "Education",
            entries: [
                "Intermediate - 2014",
                "Bachelor's - 2018",
                "Master's - 2021",
            ],
        },
        {
            type: "Projects",
            entries: [
                "Portfolio Website – React, Tailwind",
                "Task Manager App – Next.js, MongoDB",
            ],
        },
    ]);

    const [pages, setPages] = useState<ResumeSectionData[][]>([]);

    useEffect(() => {
        paginateSections();
    }, [sections]);

    const paginateSections = () => {
        const tempPages: ResumeSectionData[][] = [];
        let currentPage: ResumeSectionData[] = [];
        let currentHeight = 0;
        const PAGE_LIMIT = 1150;

        const tempDiv = document.createElement("div");
        tempDiv.style.width = "210mm";
        tempDiv.style.position = "absolute";
        tempDiv.style.visibility = "hidden";
        tempDiv.style.padding = "0";
        tempDiv.style.margin = "0";
        tempDiv.style.boxSizing = "border-box";
        document.body.appendChild(tempDiv);

        sections.forEach((section) => {
            let sectionBuffer: ResumeSectionData = {
                type: section.type,
                entries: [],
            };

            section.entries.forEach((entry) => {
                // Measure entry height
                tempDiv.innerHTML = `<div class="p-2 text-base"> <li>${entry}</li> </div>`;

                const entryHeight = tempDiv.offsetHeight + 4;

                // If entry will overflow page, push current buffer and start new page
                if (currentHeight + entryHeight > PAGE_LIMIT) {
                    if (sectionBuffer.entries.length > 0) {
                        currentPage.push(sectionBuffer);
                    }

                    tempPages.push(currentPage);
                    currentPage = [];
                    currentHeight = 0;

                    sectionBuffer = {
                        type: section.type,
                        entries: [],
                    };
                }

                sectionBuffer.entries.push(entry);
                currentHeight += entryHeight;
            });

            if (sectionBuffer.entries.length > 0) {
                currentPage.push(sectionBuffer);
            }
        });

        if (currentPage.length > 0) {
            tempPages.push(currentPage);
        }

        document.body.removeChild(tempDiv);
        setPages(tempPages);
    };

    const addEntryToSection = (sectionType: string, defaultEntry: string) => {
        setSections((prev) =>
            prev.map((s) =>
                s.type === sectionType
                    ? {
                        ...s,
                        entries: [...s.entries, `${defaultEntry} ${s.entries.length + 1}`],
                    }
                    : s
            )
        );
    };

    const addNewSection = () => {
        const newIndex = sections.length + 1;
        setSections((prev) => [
            ...prev,
            {
                type: `New Section ${newIndex}`,
                entries: [
                    "Software Engineer @ ABC (2020–2022)",
                    "Developer @ XYZ (2018–2020)",
                    "Intern @ LMN (2017)"
                ]
            },
        ]);
    };

    return (
        <div className="flex flex-col items-center gap-6">
            {pages.map((sectionGroup, pageIndex) => (
                <ResumePage key={pageIndex}>
                    {sectionGroup.map((section, index) => (
                        <ResumeSection key={index} title={section.type} entries={section.entries} />
                    ))}
                </ResumePage>
            ))}

            <div className="fixed left-2 flex flex-col gap-4">
                <button
                    onClick={() => addEntryToSection("Experience", "New Company")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    ➕ Add Experience Entry
                </button>

                <button
                    onClick={() => addEntryToSection("Education", "New Degree")}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                    ➕ Add Education Entry
                </button>

                <button
                    onClick={() => addEntryToSection("Projects", "New Project")}
                    className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                >
                    ➕ Add Project Entry
                </button>

                <button
                    onClick={addNewSection}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    ➕ Add Section
                </button>
            </div>
        </div>
    );
}

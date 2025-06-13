import React from 'react';
import { TbTextGrammar } from "react-icons/tb";
import { FaRegFileAlt } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";

// Sample data
const overviewInfo = [
    {
        id: 2,
        label: 'Resume Parser',
        data: { value: 1 },
        icon: <FaRegFileAlt />,
        backgroundColor: 'bg-hamzaPrimary'
    },
    {
        id: 3,
        label: 'AI-Based Cover Letter Tries',
        data: { value: 1 },
        icon: <MdOutlineMarkEmailRead />,
        backgroundColor: 'bg-[#18BFFF]'
    },
    {
        id: 1,
        label: 'Spell and Grammar Tries',
        data: { value: 10 },
        icon: <TbTextGrammar />,
        backgroundColor: 'bg-[#3FD97F]'
    }
];

type PropsType = {
    label: string;
    data: { value: number };
    icon: React.ReactNode;
    backgroundColor: string;
};

export function OneCard({ label, data, icon, backgroundColor }: PropsType) {
    // Determine trial label based on value
    const getTrialText = (val: number) => {
        if (val === 0 || val === 1) return `${val} try left`;
        if (val > 1) return `${val} tries left`;
        return '';
    };


    const trialText = getTrialText(data.value);
    console.log(trialText)

    return (
        <div className="rounded-md bg-white p-6 shadow-md border border-gray-200">
            <div className="space-y-4 items-center">
                <div className={`text-white rounded-full w-14 h-14 flex items-center justify-center text-[1.6rem] ${backgroundColor}`}>
                    {icon}
                </div>
                <dl>
                    <dt className="font-bold text-[1.65rem] text-primaryBlack leading-none">
                        {trialText}
                    </dt>


                    <dd className="text-lg font-semibold text-primarySlate/80">{label}</dd>
                </dl>
            </div>
        </div>
    );
}


const OverviewCards = () => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {overviewInfo.map((item) => (
                <OneCard
                    key={item.id}
                    label={item.label}
                    data={item.data}
                    icon={item.icon}
                    backgroundColor={item.backgroundColor}
                />
            ))}
        </div>
    )
}

export default OverviewCards
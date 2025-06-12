type Props = {
    title: string;
    entries: string[];
};

export default function ResumeSection({ title, entries }: Props) {
    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
            <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                {entries.map((entry, i) => (
                    <li key={i}>{entry}</li>
                ))}
            </ul>
        </div>
    );
}

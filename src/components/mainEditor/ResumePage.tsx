type Props = {
    children: React.ReactNode;
};

export default function ResumePage({ children }: Props) {
    return (
        <div
            className="bg-white border border-gray-300 w-[210mm] h-[297mm] shadow-md overflow-hidden"
            style={{
                pageBreakAfter: "always",
            }}
        >
            {children}
        </div>
    );
}

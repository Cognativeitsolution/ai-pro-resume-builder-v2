type Props = {
    children: React.ReactNode;
};

export default function ResumePage({ children }: Props) {
    return (
        <div
            className="bg-white w-[210mm] h-[297mm] shadow-md p-6 overflow-hidden"
            style={{
                pageBreakAfter: "always",
            }}
        >
            {children}
        </div>
    );
}

import React from "react";

interface AlertProps {
    messages: string[] | string | any;
    type: "success" | "error";
}

const CustomAlert: React.FC<AlertProps> = ({ messages, type }) => {
    if (!messages || (Array.isArray(messages) && messages.length === 0)) return null;

    const alertStyles =
        type === "error"
            ? "bg-red-100 border-red-500 text-red-700"
            : "bg-green-100 border-green-500 text-green-700";

    return (
        <div className={`${alertStyles} border-l-4 text-start mb-4 p-4 rounded relative`} role="alert">
            <ul className="list-disc list-inside">
                {Array.isArray(messages)
                    ? messages.map((msg, index) => <li key={index}>{msg}</li>)
                    : <li>{messages}</li>}
            </ul>
        </div>
    );
};

export default CustomAlert;

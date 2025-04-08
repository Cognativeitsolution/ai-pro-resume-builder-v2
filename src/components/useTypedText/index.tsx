import React, { useEffect, useState } from 'react'

export const useTypedText = (strings: string[], typeSpeed = 100, backSpeed = 40, loop = true) => {
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!strings || strings.length === 0) return;

        const handleTyping = () => {
            const currentString = strings[index % strings.length];
            if (isDeleting) {
                setDisplayText(currentString.substring(0, charIndex - 1));
                setCharIndex((prev) => prev - 1);
                if (charIndex - 2 === 0) {
                    setIsDeleting(false);
                    setIndex((prev) => (loop ? (prev + 1) % strings.length : prev));
                }
            } else {
                setDisplayText(currentString.substring(0, charIndex + 4));
                setCharIndex((prev) => prev + 1);
                if (charIndex + 1 === currentString.length) {
                    setTimeout(() => setIsDeleting(true), 1000);
                }
            }
        };
        const timeout = setTimeout(handleTyping, isDeleting ? backSpeed : typeSpeed);
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, index, strings, typeSpeed, backSpeed, loop]);

    return displayText;

};




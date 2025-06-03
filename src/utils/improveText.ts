// utils/improveText.ts
export function improveText(text: string): string {
    // You can replace this with API call to OpenAI or any grammar tool.
    // For now, just doing a mock capitalization + trimming
    return text
        .split('.')
        .map(sentence => sentence.trim().charAt(0).toUpperCase() + sentence.trim().slice(1))
        .join('. ')
        .trim();
}

// export function improveText(text: string): string {
//     return text
//         .split('.')
//         .map(sentence => {
//             const trimmed = sentence.trim();
//             return trimmed.length > 0
//                 ? trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
//                 : '';
//         })
//         .filter(Boolean)
//         .join('. ')
//         .trim();
// }

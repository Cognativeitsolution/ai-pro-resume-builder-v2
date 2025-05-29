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

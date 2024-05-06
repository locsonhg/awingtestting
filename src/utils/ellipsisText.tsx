export const ellipsisText = (text: string, len: number): string => {
    if (text.length > len) return text.slice(0, len) + "...";
    return text;
};

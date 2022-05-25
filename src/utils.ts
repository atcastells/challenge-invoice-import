export const cleanString = (str: string): string => {
    str = str.trim();
    return str.replace(/[\n\r]+/g, '');
}

export const parseNumber = (str: string): number => {
    str = cleanString(str);
    return Number(str);
}
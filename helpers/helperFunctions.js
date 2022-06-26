export const sanitizeString = (str) => {
    return str.toLowerCase().replace(',', '').replace('.', '')
}

export const cleanString = (str, search) => {
    return str.replace(search, '').trim();
}
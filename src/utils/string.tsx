export const toProperCase = (word: string): string =>
    word
        ? word.charAt(0).toLocaleUpperCase() + word.slice(1)
        : "";

export const toTitleCase = (text: string): string =>
    text
        .split(" ")
        .map(w => w ? w[0].toLocaleUpperCase() + w.slice(1) : "")
        .join(" ");

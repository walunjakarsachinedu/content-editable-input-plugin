/** format number string by inserting comma */
export const numberFormatter = (num: string, event: InputEvent): string => {
  console.log(event)
  let onlyNumber = num.replaceAll(/[^0-9]/g, "");

  if(onlyNumber.length <= 3) return onlyNumber;

  let formattedNumber = onlyNumber.split("");
  let size = formattedNumber.length;
  for(let i=3; i<size; i+=2) formattedNumber.splice(size-i, 0, ",");
  
  return formattedNumber.join("");
} 

/** remove leading/trailing spaces */
export const trimSpaces = (text: string, ev: InputEvent): string => {
  return text.trim();
};

/** capitalize first letter of each significant word */
export const titleCase = (text: string, ev: InputEvent): string => {
  return text
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

/** auto-format date string as YYYY-MM-DD */
export const dateFormat = (text: string, ev: InputEvent): string => {
  let digits = text.replaceAll(/[^0-9]/g, "").slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return digits.replace(/(\d{4})(\d{1,2})/, "$1-$2");
  return digits.replace(/(\d{4})(\d{2})(\d{1,2})/, "$1-$2-$3");
};

/** convert text to uppercase */
export const upperCase = (text: string, ev: InputEvent): string => {
  return text.toUpperCase();
};

/** convert text to lowercase */
export const lowerCase = (text: string, ev: InputEvent): string => {
  return text.toLowerCase();
};

/** limit decimal places in number string */
export const decimalLimiter = (maxDecimals: number, ev: InputEvent) => {
  return (value: string, ev: InputEvent): string => {
    const parts = value.replace(/[^0-9.]/g, "").split(".");
    if (parts.length > 2) return `${parts[0]}.${parts.slice(1).join("")}`;
    if (parts[1]) parts[1] = parts[1].slice(0, maxDecimals);
    return parts.join(".");
  };
};


/** prevent new line characters in text */
export const preventNewLine = (text: string, ev: InputEvent): string => {
  return text.replace(/[\r\n]+/g, "");
};
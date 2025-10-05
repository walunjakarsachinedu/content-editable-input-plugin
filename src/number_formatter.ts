/** format number string by inserting comma */
const format = (num: string): string => {
  let onlyNumber = num.replaceAll(/[^0-9]/g, "");

  if(onlyNumber.length <= 3) return onlyNumber;

  let formattedNumber = onlyNumber.split("");
  let size = formattedNumber.length;
  for(let i=3; i<size; i+=2) formattedNumber.splice(size-i, 0, ",");
  
  return formattedNumber.join("");
} 

export { format };
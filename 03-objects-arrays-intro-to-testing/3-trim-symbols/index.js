/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (string === '' || size === 0) {return '';}
  if (size === undefined) {return string;}

  let newStr = '';
  let n = 1;
  for (let i = 0; i < string.length; i++) {  
    if (string[i] === string[i - 1]) {      
      n++;              
    } 
    else {
      n = 1;
    }  

    if (n <= size) {
      newStr = newStr + string[i];  
    }         
  }
  return newStr;
}

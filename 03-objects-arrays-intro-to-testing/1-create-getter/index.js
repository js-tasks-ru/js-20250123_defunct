/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const arr = path.split('.');  
  
  return function(obj) {
    if (!obj.hasOwnProperty(arr[0])) return ;
    return arr.reduce((accum, item)=> 
      accum.hasOwnProperty(item) ? accum[item] : undefined, obj)  
    
  }
}

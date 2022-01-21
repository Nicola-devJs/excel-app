// Pure function - чистая функция
export function capitalaze(string) {
   if (typeof string !== 'string') {
      return ''
   }
   return string.charAt(0).toUpperCase() + string.slice(1)
}

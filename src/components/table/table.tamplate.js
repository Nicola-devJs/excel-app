const CODES = {
   A: 65,
   Z: 90,
}

function toCell() {
   return `<div class="cell" contenteditable></div>`
}

function toColumn(char) {
   return `
      <div class="column">${char}</div>
   `
}

function createRow(numRow, content) {
   return `
   <div class="row">
      <div class="row-info">${numRow ?? ''}</div>
      <div class="row-data">${content}</div>
   </div>
   `
}

const toChar = (_, index) => {
   return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 20) {
   const countCols = CODES.Z - CODES.A + 1
   const rows = []

   const headlines = new Array(countCols)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

   const cells = new Array(countCols).fill('').map(toCell).join('')

   rows.push(createRow(null, headlines))

   for (let i = 1; i <= rowsCount; i++) {
      rows.push(createRow(i, cells))
   }
   return rows.join('')
}

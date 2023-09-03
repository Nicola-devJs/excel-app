const CODES = {
   A: 65,
   Z: 90,
}

// function toCell(row, col) {
//    return `<div class="cell" contenteditable data-col="${col}" data-id="${row}:${col}"></div>`
// }

function toCell(row) {
   return function (_, col) {
      return `<div class="cell" contenteditable data-col="${col}" data-type="cell" data-id="${row}:${col}"></div>`
   }
}

function toColumn(char, index) {
   return `
      <div class="column" data-type="resizable" data-col="${index}">
         ${char}
         <div class="col-resize" data-resize="col"></div>
      </div>
   `
}

function createRow(numRow, content) {
   const resize = numRow
      ? '<div class="row-resize" data-resize="row"></div>'
      : ''
   return `
   <div class="row" ${numRow ? 'data-type="resizable"' : ''}>
      <div class="row-info">
         ${numRow ?? ''}
         ${resize}
      </div>
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

   rows.push(createRow(null, headlines))

   for (let row = 0; row < rowsCount; row++) {
      const cells = new Array(countCols)
         .fill('')
         // .map((_, col) => toCell(row, col))
         .map(toCell(row))
         .join('')
      rows.push(createRow(row + 1, cells))
   }
   return rows.join('')
}

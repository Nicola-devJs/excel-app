import { defaultStyles } from '../../constants'
import { parse } from '../../core/parse'
import { toInlineStyles } from '../../core/utilits'

const CODES = {
   A: 65,
   Z: 90,
}

const DEFAULT_WIDHT = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
   return (state[index] || DEFAULT_WIDHT) + 'px'
}

function getHeight(state, index) {
   return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(row, state) {
   return function (_, col) {
      const id = `${row}:${col}`
      const text = state.dataState[id] || ''
      const width = getWidth(state.colState, col)

      const styles = toInlineStyles({
         ...defaultStyles,
         ...state.stylesState[id],
      })

      return `<div class="cell" contenteditable 
         data-col="${col}" 
         style="${styles}; width: ${width}" 
         data-type="cell" 
         data-id="${id}"
         data-value="${text}"
      >${parse(text) || ''}</div>`
   }
}

function toColumn({ char, index, width }) {
   return `
      <div class="column" data-type="resizable" style="width: ${width}" data-col="${index}">
         ${char}
         <div class="col-resize" data-resize="col"></div>
      </div>
   `
}

function createRow(numRow, content, state) {
   const height = getHeight(state, numRow)
   const resize = numRow
      ? '<div class="row-resize" data-resize="row"></div>'
      : ''
   return `
   <div 
      class="row" ${
         numRow ? 'data-type="resizable"' : ''
      }  data-row="${numRow}" style="height: ${height};"
   >
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

function withWidthFrom(state) {
   return function (char, index) {
      return {
         char,
         index,
         width: getWidth(state.colState, index),
      }
   }
}

export function createTable(rowsCount = 20, state = {}) {
   const countCols = CODES.Z - CODES.A + 1
   const rows = []

   const headlines = new Array(countCols)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

   rows.push(createRow(null, headlines, {}))

   for (let row = 0; row < rowsCount; row++) {
      const cells = new Array(countCols)
         .fill('')
         .map(toCell(row, state))
         .join('')
      rows.push(createRow(row + 1, cells, state.rowState))
   }
   return rows.join('')
}

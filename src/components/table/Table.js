import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.tamplate'
import { resizeHandler } from './table.resizeHandler'
import { shouldResize, isCell, matrix, nextSelect } from './table.functions'
import { TableSelection } from './TableSelection'
import { $ } from '../../core/dom'

export class Table extends ExcelComponent {
   static className = 'excel__table'

   constructor($root, options) {
      super($root, {
         name: 'Table',
         listeners: ['mousedown', 'keydown', 'input'],
         ...options,
      })
   }

   toHTML() {
      return createTable(100)
   }

   prepare() {
      this.selection = new TableSelection()
   }

   init() {
      super.init()

      const $cell = this.$root.find('[data-id="0:0"]')
      this.selectCell($cell)

      this._on('formula:input', (text) => {
         this.selection.current.text(text)
      })

      this._on('formula:done', () => {
         this.selection.current.focus()
      })
   }

   selectCell($cell) {
      this.selection.select($cell)
      this._emit('table:select', $cell)
   }

   onMousedown(event) {
      if (shouldResize(event)) {
         resizeHandler(this.$root, event)
      } else if (isCell(event)) {
         const $target = $(event.target)
         if (event.shiftKey) {
            const $cells = matrix($target, this.selection.current).map((id) =>
               this.$root.find(`[data-id="${id}"]`)
            )

            this.selection.selectGroup($cells)
         } else {
            this.selectCell($target)
         }
      }
   }

   onKeydown(event) {
      const keys = [
         'Enter',
         'Tab',
         'ArrowLeft',
         'ArrowRight',
         'ArrowUp',
         'ArrowDown',
      ]
      if (keys.includes(event.key) && !event.shiftKey) {
         event.preventDefault()
         const id = this.selection.current.id(true)
         const $next = this.$root.find(nextSelect(event.key, id)).focus()
         this.selectCell($next)
      }
   }

   onInput(event) {
      this._emit('table:input', $(event.target))
   }
}

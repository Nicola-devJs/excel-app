import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.tamplate'
import { resizeHandler } from './table.resizeHandler'
import { shouldResize, isCell, matrix, nextSelect } from './table.functions'
import { TableSelection } from './TableSelection'
import * as actions from '../../redux/actions'
import { $ } from '../../core/dom'
import { defaultStyles } from '../../constants'
import { parse } from '../../core/parse'

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
      return createTable(100, this.store.getState())
   }

   prepare() {
      this.selection = new TableSelection()
   }

   init() {
      super.init()

      const $cell = this.$root.find('[data-id="0:0"]')
      this.selectCell($cell)

      this._on('formula:input', (text) => {
         this.selection.current.attr('data-value', text).text(parse(text))

         this.updateTextInStore(text)
      })

      this._on('formula:done', () => {
         this.selection.current.focus()
      })

      this._on('toolbar:style', (value) => {
         this.selection.selectStyles(value)
         this._dispatch(
            actions.applyStyle({
               ids: this.selection.selectedIds,
               value,
            })
         )
      })
   }

   updateTextInStore(value) {
      return this._dispatch(
         actions.changeText({
            id: this.selection.current.id(),
            value,
         })
      )
   }

   selectCell($cell) {
      this.selection.select($cell)
      this._emit('table:select', $cell)
      const styles = $cell.getStyles(Object.keys(defaultStyles))
      this._dispatch(actions.changeStyles(styles))
   }

   async resizeTable(event) {
      try {
         const data = await resizeHandler(this.$root, event)
         this._dispatch(actions.tableResize(data))
      } catch (e) {
         console.warn('Resize error', e.message)
      }
   }

   onMousedown(event) {
      if (shouldResize(event)) {
         this.resizeTable(event)
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
      this.updateTextInStore($(event.target).text())
   }
}

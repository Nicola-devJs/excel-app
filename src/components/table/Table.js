import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.tamplate'
import { resizeHandler } from './table.resizeHandler'
import { shouldResize } from './table.shouldResize'

export class Table extends ExcelComponent {
   static className = 'excel__table'

   constructor($root) {
      super($root, {
         name: 'Table',
         listeners: ['mousedown'],
      })
   }

   toHTML() {
      return createTable(100)
   }

   onMousedown(event) {
      if (shouldResize(event)) {
         resizeHandler(this.$root, event)
      }
   }
}

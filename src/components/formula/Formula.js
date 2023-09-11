import { ExcelComponent } from '../../core/ExcelComponent'
import { $ } from '../../core/dom'

export class Formula extends ExcelComponent {
   static className = 'excel__formula'

   constructor($root, options) {
      super($root, {
         name: 'Formula',
         listeners: ['input', 'keydown'],
         subscribe: ['currentText'],
         ...options,
      })
   }

   toHTML() {
      return `
         <div class="info">fx</div>
         <div class="input" id="input" contenteditable></div>
      `
   }

   init() {
      super.init()
      this.$formula = this.$root.find('#input')
      this._on('table:select', ($cell) => {
         this.$formula.text($cell.data.value || $cell.text())
      })
   }

   storeChanged({ currentText }) {
      this.$formula.text(currentText)
   }

   onInput(event) {
      this._emit('formula:input', $(event.target).text())
   }

   onKeydown(event) {
      const keys = ['Tab', 'Enter']
      if (keys.includes(event.key)) {
         event.preventDefault()
         this._emit('formula:done')
      }
   }
}

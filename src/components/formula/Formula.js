import { ExcelComponent } from '../../core/ExcelComponent'
import { $ } from '../../core/dom'

export class Formula extends ExcelComponent {
   static className = 'excel__formula'

   constructor($root, options) {
      super($root, {
         name: 'Formula',
         listeners: ['input', 'keydown'],
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
      const $input = this.$root.find('#input')
      this._on('table:select', ($cell) => {
         $input.text($cell.text())
      })

      this._on('table:input', ($cell) => {
         $input.text($cell.text())
      })
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

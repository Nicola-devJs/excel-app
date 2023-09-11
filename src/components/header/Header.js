import { defaultTitle } from '../../constants'
import { ExcelComponent } from '../../core/ExcelComponent'
import { $ } from '../../core/dom'
import { debounce } from '../../core/utilits'
import * as actions from '../../redux/actions'

export class Header extends ExcelComponent {
   static className = 'excel__header'

   constructor($root, options) {
      super($root, {
         name: 'Header',
         listeners: ['input'],
         ...options,
      })
   }

   prepare() {
      this.onInput = debounce(this.onInput, 300)
   }

   toHTML() {
      const title = this.store.getState().titleState || defaultTitle

      return `
      <input type="text" data-type="input" class="input" value="${title}" />
      <div>
         <button class="button">
            <span class="material-icons"> logout </span>
         </button>
         <button class="button">
            <span class="material-icons"> delete_outline </span>
         </button>
      </div>
      `
   }

   onInput(event) {
      const $target = $(event.target)
      if ($target.data.type === 'input') {
         this._dispatch(actions.changeTitle($target.text()))
      }
   }
}

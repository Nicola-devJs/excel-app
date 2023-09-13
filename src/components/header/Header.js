import { defaultTitle } from '../../constants'
import { ExcelComponent } from '../../core/ExcelComponent'
import { $ } from '../../core/dom'
import { ActiveRoute } from '../../core/routes/ActiveRoute'
import { debounce } from '../../core/utilits'
import * as actions from '../../redux/actions'

export class Header extends ExcelComponent {
   static className = 'excel__header'

   constructor($root, options) {
      super($root, {
         name: 'Header',
         listeners: ['input', 'click'],
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
            <span data-type="logout" class="material-icons"> logout </span>
         </button>
         <button class="button">
            <span data-type="delete" class="material-icons"> delete_outline </span>
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

   onClick(event) {
      const $target = $(event.target)
      if ($target.data.type === 'logout') {
         console.log('exit')
         ActiveRoute.navigate('')
      }
      if ($target.data.type === 'delete') {
         const dicision = confirm(
            'Вы действительно хотите удалить эту таблицу ?'
         )
         if (dicision) {
            localStorage.removeItem('excel:' + ActiveRoute.param)
            ActiveRoute.navigate('')
         }
      }
   }
}

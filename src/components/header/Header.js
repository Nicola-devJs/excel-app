import { ExcelComponent } from '../../core/ExcelComponent'

export class Header extends ExcelComponent {
   static className = 'excel__header'

   constructor($root, options) {
      super($root, {
         name: 'Header',
         ...options,
      })
   }

   toHTML() {
      return `
      <input type="text" class="input" value="Новая таблица" />
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
}

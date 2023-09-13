import { storage } from '../core/utilits'

export function createRecordsTable() {
   const keys = getAllKeys()
   if (!keys.length) {
      return '<p class="pure_list-table">Список таблиц пока пустой</p>'
   }

   return `
      <div class="db__list-header">
         <span>Название</span>
         <span>Дата открытия</span>
      </div>

      <ul class="db__list">
         ${keys.map(toHTML).join('')}
      </ul>
   `
}

function toHTML(key) {
   const model = storage(key)
   const id = key.split(':')[1]
   console.log(model)
   return `
      <li class="db__record">
         <a href="#excel/${id}">${model.titleState}</a>
         <strong>
            ${new Date(model.openedDate).toLocaleDateString()}
            -
            ${new Date().toLocaleTimeString()}
         </strong>
      </li>
   `
}

function getAllKeys() {
   const keys = []
   for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key.includes('excel')) {
         continue
      }

      keys.push(key)
   }

   return keys
}

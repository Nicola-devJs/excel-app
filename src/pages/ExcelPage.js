import { Page } from '../core/Page'
import { CreateStore } from '../core/CreateStore'
import { rootReducer } from '../redux/rootReducer'
import { normalizeInitialState } from '../redux/initialState'
import { debounce, storage } from '../core/utilits'
import { Excel } from '../components/excel/Excel'
import { Header } from '../components/header/Header'
import { Toolbar } from '../components/toolbar/Toolbar'
import { Formula } from '../components/formula/Formula'
import { Table } from '../components/table/Table'

function storageName(param) {
   return 'excel:' + param
}

export class ExcelPage extends Page {
   getRoot() {
      const params = this.params ? this.params : Date.now().toString()
      const state = storage(storageName(params))
      const store = new CreateStore(rootReducer, normalizeInitialState(state))
      const storeListener = debounce((state) => {
         storage(storageName(params), state)
      }, 400)

      store.subscribe(storeListener)

      this.excel = new Excel({
         components: [Header, Toolbar, Formula, Table],
         store,
      })

      return this.excel.getRoot()
   }

   afterRender() {
      this.excel.init()
   }

   destroy() {
      this.excel.destroy()
   }
}

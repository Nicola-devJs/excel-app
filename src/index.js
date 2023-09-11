import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { CreateStore } from './core/createStore'
import { rootReducer } from './redux/rootReducer'
import { debounce, storage } from './core/utilits'
import { initialState } from './redux/initialState'
import './sass/index.scss'

const store = new CreateStore(rootReducer, initialState)
const storeListener = debounce((state) => {
   storage('excel-state', state)
}, 400)

store.subscribe(storeListener)

const excel = new Excel('#app', {
   components: [Header, Toolbar, Formula, Table],
   store,
})

excel.render()

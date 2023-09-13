import { Router } from './core/routes/Router'
import './sass/index.scss'
import { DashboardPage } from './pages/DashboardPage'
import { ExcelPage } from './pages/ExcelPage'

new Router('#app', {
   dashboard: DashboardPage,
   excel: ExcelPage,
})

import { DomListener } from './DomListener'

export class ExcelComponent extends DomListener {
   constructor($root, options = {}) {
      super($root, options.listeners)
      this.name = options.name || ''
      this.emitter = options.emitter
      this.unsubscribes = []

      this.prepare()
   }

   toHTML() {
      return ''
   }

   //! Создает экземпляр класа перед инициализацией компонента
   prepare() {}

   //! Уведомляет слушателя
   _emit(event, ...args) {
      this.emitter.emit(event, ...args)
   }

   //! Создает нового слушателя, и уведомляет его
   _on(event, fn) {
      const unsub = this.emitter.subscribe(event, fn)
      this.unsubscribes.push(unsub)
   }

   //!  Инициализирует слушатели компонент
   init() {
      this.initDOMListeners()
   }

   //! Удаляет слушатели компанента
   destroy() {
      this.removeDOMListeners()
      this.unsubscribes.forEach((unsub) => unsub())
   }
}

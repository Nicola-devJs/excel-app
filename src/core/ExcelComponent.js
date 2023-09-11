import { DomListener } from './DomListener'

export class ExcelComponent extends DomListener {
   constructor($root, options = {}) {
      super($root, options.listeners)
      this.name = options.name || ''
      this.emitter = options.emitter
      this.subscribe = options.subscribe || []
      this.unsubscribes = []

      this.store = options.store

      this.prepare()
   }

   toHTML() {
      return ''
   }

   //! Создает экземпляр класа перед инициализацией компонента
   prepare() {}

   //! Сюда приходят только изменения по тем полям на которые мы подписались
   storeChanged() {}

   isWatching(key) {
      return this.subscribe.includes(key)
   }

   //! Уведомляет слушателя
   _emit(event, ...args) {
      this.emitter.emit(event, ...args)
   }

   //! Создает нового слушателя, и уведомляет его
   _on(event, fn) {
      const unsub = this.emitter.subscribe(event, fn)
      this.unsubscribes.push(unsub)
   }

   _dispatch(action) {
      this.store.dispatch(action)
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

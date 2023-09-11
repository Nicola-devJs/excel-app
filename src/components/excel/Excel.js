import { $ } from '../../core/dom'
import { Emitter } from '../../core/Emitter'
import { storeSubscriber } from '../../core/storSubscriber'

export class Excel {
   constructor(selector, options) {
      this.$el = $(selector)
      this.components = options.components || []
      this.store = options.store
      this.emitter = new Emitter()
      //? Подписка корневого компанента приложения для контроля изменения состояния дочерних компонентов
      this.subscriber = new storeSubscriber(this.store)
   }

   getRoot() {
      //! Создает корневой узел

      const $root = $.create('div', 'excel')

      const componentOptions = {
         emitter: this.emitter,
         store: this.store,
      }

      this.components = this.components.map((Component) => {
         const $wrap_component = $.create('div', Component.className)
         const component = new Component($wrap_component, componentOptions)

         $wrap_component.html(component.toHTML())

         $root.append($wrap_component)
         return component
      })

      return $root
   }

   render() {
      //! Отображает корневой узел
      this.$el.append(this.getRoot())
      this.subscriber.subscribeComponents(this.components)
      this.components.forEach((component) => component.init())
   }

   destroy() {
      this.subscriber.unsubscribeFromStore()
      this.components.forEach((component) => component.destroy())
   }
}

import { $ } from '../../core/dom'
import { Emitter } from '../../core/Emitter'

export class Excel {
   constructor(selector, options) {
      this.$el = $(selector)
      this.components = options.components || []
      this.emitter = new Emitter()
   }

   getRoot() {
      //! Создает корневой узел

      const $root = $.create('div', 'excel')

      const componentOptions = {
         emitter: this.emitter,
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
      this.components.forEach((component) => component.init())
   }

   destroy() {
      this.components.forEach((component) => component.destroy())
   }
}

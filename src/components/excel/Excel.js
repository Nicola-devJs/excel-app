import { $ } from '../../core/dom'

export class Excel {
   constructor(selector, options) {
      this.$el = $(selector)
      this.components = options.components || []
   }

   getRoot() {
      //! Создает корневой узел

      const $root = $.create('div', 'excel')
      this.components = this.components.map((Component) => {
         const $wrap_component = $.create('div', Component.className)
         const component = new Component($wrap_component)
         // Debag
         // if (component.name) {
         //    window['c' + component.name] = component
         // }
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
}

import { capitalaze } from './utils'

export class DomListener {
   constructor($root, listeners = []) {
      if (!$root) {
         throw new Error('No $root provider for DomListener')
      }

      this.$root = $root
      this.listeners = listeners
      // this.name = name
   }

   initDomListeners() {
      this.listeners.forEach((listener) => {
         const method = getMethodName(listener)
         if (!this[method]) {
            throw new Error(`Not method ${method} in object ${this.name}`)
         }
         this[method] = this[method].bind(this)
         this.$root.on(listener, this[method])
      })
   }

   removeDomListeners() {
      this.listeners.forEach((listener) => {
         const method = getMethodName(listener)

         this.$root.off(listener, this[method])
      })
   }
}

// input => onInput
function getMethodName(eventName) {
   return 'on' + capitalaze(eventName)
}

export class Emitter {
   constructor() {
      this.listeners = {}
   }

   // Уведомляет слушателя если они есть
   // ('table:select', {a: 1})
   emit(event, ...args) {
      if (!Array.isArray(this.listeners[event])) {
         return false
      }

      this.listeners[event].forEach((listener) => {
         listener(...args)
      })

      return true
   }
   // Уведомляет слушателя
   // Подписывает нового слушателя
   // ('table:select', () => {})
   subscribe(event, fn) {
      this.listeners[event] = this.listeners[event] || []
      this.listeners[event].push(fn)

      return () => {
         this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== fn
         )
      }
   }
}

/*
const emitter = new Emitter()
const unsub = emitter.subscribe('formula:input', (text) =>
   console.log('Render text input for cells table', text)
)

emitter.emit('formula:input', 'B2:C7')

setTimeout(() => {
   unsub()
}, 2000)

setTimeout(() => {
   emitter.emit('formula:input', 'Node result on VS code')
}, 4000)
*/

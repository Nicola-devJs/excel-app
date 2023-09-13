import { isEqual } from './utilits'

export class storeSubscriber {
   constructor(store) {
      this.store = store
      this.sub = null
      this.prevState = {}
   }

   subscribeComponents(components) {
      //* Сохраняет текущий стейт
      this.prevState = this.store.getState()
      this.sub = this.store.subscribe((state) => {
         //* Обработка каждого состояния в сторе

         Object.keys(state).forEach((key) => {
            if (!isEqual(this.prevState[key], state[key])) {
               components.forEach((component) => {
                  if (component.isWatching(key)) {
                     const changes = { [key]: state[key] }
                     component.storeChanged(changes)
                  }
               })
            }
         })
         //* Обновляем старый стейт, после проверки компонентов на изменения
         this.prevState = this.store.getState()
      })
   }

   unsubscribeFromStore() {
      //* Деактивация всех состояний текущей подписки корневого компонента
      this.sub.unsubscribe()
   }
}

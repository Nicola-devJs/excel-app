class Dom {
   constructor(selector) {
      this.$elem =
         typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
   }

   html(html) {
      if (typeof html === 'string') {
         this.$elem.innerHTML = html
         return this
      }
      return this.$elem.outerHTML.trim()
   }

   text(text) {
      if (typeof text === 'string') {
         this.$elem.textContent = text
         return this
      }
      if (this.$elem.tagName.toLowerCase() === 'input') {
         return this.$elem.value.trim()
      }
      return this.$elem.textContent.trim()
   }

   clear() {
      this.html('')
      return this
   }

   on(eventType, callback) {
      this.$elem.addEventListener(eventType, callback)
   }

   off(eventType, callback) {
      this.$elem.removeEventListener(eventType, callback)
   }

   css(styles = {}) {
      Object.assign(this.$elem.style, styles)
      return this
   }

   append(node) {
      if (node instanceof Dom) {
         node = node.$elem
      }
      this.$elem.append(node)
      return this
   }

   get data() {
      return this.$elem.dataset
   }

   id(parse) {
      if (parse) {
         const parse = this.data.id.split(':')
         return {
            row: +parse[0],
            col: +parse[1],
         }
      }
      return this.data.id
   }

   focus() {
      this.$elem.focus()
      return this
   }

   closest(selector) {
      return $(this.$elem.closest(selector))
   }

   getCoords() {
      return this.$elem.getBoundingClientRect()
   }

   findAll(selector) {
      return this.$elem.querySelectorAll(selector)
   }

   find(selector) {
      return $(this.$elem.querySelector(selector))
   }

   classAdd(classes) {
      this.$elem.classList.add(classes)
      return this
   }

   classRemove(classes) {
      this.$elem.classList.remove(classes)
      return this
   }
}

export function $(selector) {
   return new Dom(selector)
}

$.create = function (tagName, classes) {
   const element = document.createElement(tagName)

   if (typeof classes === 'string') {
      element.classList.add(classes)
   } else if (Array.isArray(classes)) {
      element.classList.add(...classes)
   } else {
      return $(element)
   }

   return $(element)
}

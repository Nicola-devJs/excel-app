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

   append(node) {
      if (node instanceof Dom) {
         node = node.$elem
      }
      this.$elem.append(node)
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

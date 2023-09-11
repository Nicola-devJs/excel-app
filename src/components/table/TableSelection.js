export class TableSelection {
   static className = 'selected'

   constructor() {
      this.group = []
      this.current = null
   }

   select($el) {
      this.clear()
      $el.classAdd(TableSelection.className)
      this.group.push($el)
      this.current = $el
   }

   get selectedIds() {
      return this.group.map(($el) => $el.id())
   }

   clear() {
      this.group.forEach(($el) => $el.classRemove(TableSelection.className))
      this.group = []
   }

   selectGroup($group) {
      this.clear()

      this.group = $group
      this.group.forEach(($el) => $el.classAdd(TableSelection.className))
   }

   selectStyles(styles) {
      this.group.forEach(($el) => $el.css(styles))
   }
}

import { $ } from '../../core/dom'

export function resizeHandler($root, event) {
   const $resizer = $(event.target)
   const $parent = $resizer.closest('[data-type="resizable"]')
   const coords = $parent.getCoords()
   const cells = $root.$elem.querySelectorAll(
      `[data-col="${$parent.data.col}"]`
   )
   const resizeType = event.target.dataset.resize

   let valueCol
   let valueRow
   let coordsPageY = event.pageY
   let coordsPageX = event.pageX

   document.onmousemove = (e) => {
      e.preventDefault()
      if (resizeType === 'col') {
         const deltaX = e.pageX - coordsPageX
         valueCol = coords.width + deltaX
         $(event.target).css({ transform: `translateX(${deltaX}px)` })
      }
      if (resizeType === 'row') {
         const deltaY = e.pageY - coordsPageY
         valueRow = coords.height + deltaY
         $(event.target).css({ transform: `translateY(${deltaY}px)` })
      }

      event.target.classList.add('selected')
   }

   document.onmouseup = () => {
      document.onmousemove = null
      if (resizeType === 'col') {
         $parent.css({ width: valueCol + 'px' })
         cells.forEach((el) => $(el).css({ width: valueCol + 'px' }))
         $(event.target).css({ transform: 'translateX(0px)' })
      }
      if (resizeType === 'row') {
         $parent.css({ height: valueRow + 'px' })
         $(event.target).css({ transform: 'translateY(0px)' })
      }
      event.target.classList.remove('selected')
   }
}

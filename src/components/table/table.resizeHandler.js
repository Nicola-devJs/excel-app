import { $ } from '../../core/dom'

export function resizeHandler($root, event) {
   const resizeType = event.target.dataset.resize
   const $resizer = $(event.target)
   const $parent = $resizer.closest('[data-type="resizable"]')
   const coords = $parent.getCoords()

   let valueCol
   let valueRow
   let coordsPageY = event.pageY
   let coordsPageX = event.pageX

   document.onmousemove = (e) => {
      e.preventDefault()
      if (resizeType === 'col') {
         const deltaX = e.pageX - coordsPageX
         valueCol = coords.width + deltaX
         $resizer.css({
            transform: `translateX(${deltaX}px)`,
            opacity: 1,
            height: '100vh',
         })
      }
      if (resizeType === 'row') {
         const deltaY = e.pageY - coordsPageY
         valueRow = coords.height + deltaY
         $resizer.css({
            transform: `translateY(${deltaY}px)`,
            opacity: 1,
            width: '100vw',
         })
      }
   }

   document.onmouseup = () => {
      document.onmousemove = null
      if (resizeType === 'col') {
         $parent.css({ width: valueCol + 'px' })
         $root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach((el) => $(el).css({ width: valueCol + 'px' }))
         $resizer.css({
            transform: 'translateX(0px)',
            opacity: 0,
            height: '100%',
         })
      }
      if (resizeType === 'row') {
         $parent.css({ height: valueRow + 'px' })
         $resizer.css({
            transform: 'translateY(0px)',
            opacity: 0,
            width: '100%',
         })
      }
   }
}

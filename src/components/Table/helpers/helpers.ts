import React from 'react'

export const handleArrowKeyNavigation = (event: React.KeyboardEvent<HTMLTableCellElement>) => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    const allHeaders = Array.from(document.querySelectorAll<HTMLTableCellElement>('[role="cell"]'))
    const currentIndex = allHeaders.indexOf(event.currentTarget)
    let nextIndex = currentIndex

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % allHeaders.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + allHeaders.length) % allHeaders.length
    }

    const nextHeader = allHeaders[nextIndex]
    if (nextHeader) {
      nextHeader.focus()
    }
    event.preventDefault()
  }
}

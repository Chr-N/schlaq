import React from 'react'

export default ({ title, children }) => {
  return (
    <html>
      <head><title>{title}</title></head>
      <body>{children}</body>
    </html>
  )
}

import React from 'react'
import flushStyles from 'styled-jsx/server'

export default ({ title, children }) => {
  return (
    <>
    <style jsx global>{`
      body {
        display: grid;
        justify-content: center;
      }
    `}</style>

    <html>
      <head><title>{title}</title>{flushStyles()}</head>
      <body>{children}</body>
    </html>
    </>
  )
}

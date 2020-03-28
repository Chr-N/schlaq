import React from 'react'
import { css } from '@emotion/core'
import { colours as c } from '../styles/theme'

export default ({ title, children }) => (
  <html>
    <head>
      <title>{title}</title>
      <link rel='stylesheet' href='tw/base.min.css' />
      <link rel='shortcut icon' href='favicon.svg' type='image/svg+xml' />
    </head>
    <body css={css`color:${c.fgTxt};`}>
      {children}
    </body>
  </html>
)

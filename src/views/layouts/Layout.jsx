import React from 'react'
import { css } from '@emotion/core'
import theme from '../styles/theme'

const scrollbar = css`overflow:overlay;&::-webkit-scrollbar{width:0.6rem;height:0.6rem;};&::-webkit-scrollbar-thumb{background-color:${theme.overlay};border-radius:0.3rem;}&::-webkit-scrollbar-corner{background-color:${theme.bg};}`

export default ({ title, primusLib, children }) => (
  <html>
    <head>
      <title>{title}</title>
      <link rel='stylesheet' href='../tw/base.min.css' />
      <link rel='shortcut icon' href='../favicon.svg' type='image/svg+xml' />
      <script async dangerouslySetInnerHTML={{ __html: primusLib }} />
      <script async defer src='../script.js' />
    </head>
    <body css={[scrollbar,css`color:${theme.txt};background-color:${theme.bg};`]}>
      {children}
    </body>
  </html>
)

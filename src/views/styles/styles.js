import { css } from '@emotion/core'
import theme from '../styles/theme'

export const scrollbar = css`overflow:overlay;&::-webkit-scrollbar{width:0.6rem;background-color:transparent;};&::-webkit-scrollbar-thumb{background-color:${theme.overlay};border-radius:0.3rem;}`
export const hoverOutline = css`&:hover{box-shadow:${theme.hoverShadow};}`
export const outline = css`box-shadow:${theme.boxShadow};`

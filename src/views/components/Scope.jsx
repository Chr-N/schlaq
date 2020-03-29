import { css } from '@emotion/core'
import theme from '../styles/theme'

const hover = css`&:hover{cursor:pointer;background-color:${theme.hover};}`
const selected = css`color:${theme.txtBright};background-color:${theme.highlight};`
const selectable = css`line-height:1.8rem;font-size:0.9rem;background-color:transparent;color:${theme.txtSec};border:none;outline:none;padding-left:1.5rem;`
const styles = css`display:flex;align-items:center;`

export default ({ scope, currScope, type }) => (
  <a href={`/${scope}`} css={[styles,hover,selectable,currScope && selected]}>
    {type === 'user' ?
      <svg viewBox='0 0 24 24' width='10' height='10' stroke='currentColor' strokeWidth='3' fill='none' strokeLinecap='round' strokeLinejoin='round'><circle cx='12' cy='12' r='10'></circle></svg> :
      <svg viewBox='0 0 24 24' width='13' height='13' stroke='currentColor' strokeWidth='2.5' fill='none' strokeLinecap='round' strokeLinejoin='round'><line x1='4' y1='9' x2='20' y2='9'></line><line x1='4' y1='15' x2='20' y2='15'></line><line x1='10' y1='3' x2='8' y2='21'></line><line x1='16' y1='3' x2='14' y2='21'></line></svg>
    }
    <span css={css`text-indent:0.5rem;`}>{scope}</span>
  </a>
)

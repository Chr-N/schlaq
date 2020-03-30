import { css } from '@emotion/core'
import theme from '../styles/theme'

const hover = css`&:hover{cursor:pointer;background-color:${theme.hover};}`
const selected = css`color:${theme.txtBright};background-color:${theme.highlight};`
const selectable = css`line-height:1.8rem;font-size:0.9rem;background-color:transparent;color:${theme.txtSec};border:none;outline:none;padding-left:1.5rem;`
const styles = css`display:flex;align-items:center;padding:0.3rem 0;`

export default ({ workspace, workspacePic, currWorkspace }) => (
  <a href={`/${workspace}/general`} css={[styles,hover,selectable,currWorkspace && selected]}>
    <img css={css`width:1.5rem;border-radius:0.2rem;`} src={workspacePic} />
    <span css={css`text-indent:0.5rem;`}>{workspace}</span>
  </a>
)

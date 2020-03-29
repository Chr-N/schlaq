import { css } from '@emotion/core'
import theme from '../styles/theme'
import { outline, hoverOutline } from '../styles/styles'

export const header = css`grid-area: header;background-color:${theme.bgHeader};display:flex;justify-content:center;align-items:center;box-shadow:${theme.boxShadow};z-index:2;`

export default () => (
  <div css={[outline,header]}>
    <form>
      <input placeholder='Search' css={[hoverOutline, css`width:30rem;height:20px;text-indent:0.5rem;border:none;border-radius:0.1rem;box-shadow:${theme.boxShadowInput};background-color:${theme.bgInput};color:${theme.txtSec};outline:none;`]} />
    </form>
  </div>
)

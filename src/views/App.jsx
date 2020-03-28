import Layout from './layouts/Layout'
import React from 'react'
import { css } from '@emotion/core'
import theme from './theme/theme'

const slate = css`background-color:black;width:100vw;height:100vh;display:grid;grid-template-columns:260px 1fr;grid-template-rows:35px 1fr;grid-template-areas:'header header' 'sidebar main';`
const outline = css`box-shadow: 0 0 0 1px ${theme.outline};`
const header = css`grid-area: header;background-color:${theme.bgHeader};display:flex;justify-content:center;`
const sidebar = css`grid-area:sidebar;background-color:${theme.bgSidebar};text-indent:1rem;color:${theme.txtSec};`
const hover = css`&:hover{cursor:pointer;background-color:${theme.hover};}`
const focus = css`&:focus{background-color:${theme.highlight};}`;
const selectable = css`padding:0;line-height:1.8rem;font-size:0.9rem;background-color:transparent;color:${theme.txtSec};border:none;outline:none;text-align:start;padding-left:1.5rem;${hover};${focus}`;
const main = css`grid-area:main;background-color:${theme.bg};`

export default ({ title, msg, name, messages }) => (
  <Layout title={title}>
    <div css={slate}>
      <div css={outline,header}>
        <form>
          <input placeholder='Search' css={css`margin-top:0.3rem;width:30rem;height:20px;text-indent:0.5rem;border:none;border-radius:0.1rem;box-shadow:0 0 0 1px ${theme.outline};background-color:${theme.bgInput};color:${theme.txtSec};`} />
        </form>
      </div>
      <div css={outline,sidebar}>
        <div css={css`padding:0.5rem 0;display:grid;${hover}`}>
          <span css={css`margin:0;color:${theme.txt};`}>Workspace</span>
          <span css={css`margin:0;font-size:0.9rem;`}>🔵 User</span>
        </div>
        <div css={css`padding: 0.5rem 0;${hover}`}><span>💬 Threads</span></div>
        <div css={css`padding: 0.5rem 0;`}>
          <span>Starred</span>
          <div css={css`display:grid;`}>
            <button css={selectable}>🔵 Tim</button>
            <button css={selectable}>🟢 Tom</button>
          </div>
        </div>
        <div css={css`padding: 0.5rem 0;`}>
          <span>Channels</span>
          <div css={css`display:grid;`}>
            <button css={selectable}>#️ Channel1</button>
            <button css={selectable}>#️ Channel2</button>
            <button css={selectable}>#️ Channel3</button>
            <button css={selectable}>#️ Channel4</button>
            <button css={selectable}>#️ Channel5</button>
            <button css={selectable}>#️ Channel6</button>
          </div>
        </div>
        <div css={css`padding: 0.5rem 0;`}>
          <span>Direct Messages</span>
          <div css={css`display:grid;`}>
            <button css={selectable}>🟢 Bob</button>
            <button css={selectable}>🟢 David</button>
            <button css={selectable}>🔵 Sarah</button>
            <button css={selectable}>🔵 Tessa</button>
            <button css={selectable}>🟢 Carey</button>
            <button css={selectable}>🔵 Tim</button>
            <button css={selectable}>🟢 Tom</button>
          </div>
        </div>
      </div>
      <div css={outline,main}>main</div>
    </div>
  </Layout>
)

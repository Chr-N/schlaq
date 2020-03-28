import Layout from './layouts/Layout'

import React from 'react'
import { css } from '@emotion/core'
import { colours as c } from './styles/theme'

const slate = css`background-color:black;width:100vw;height:100vh;display:grid;grid-template-columns:260px 1fr;grid-template-rows:35px 1fr;grid-template-areas:'header header' 'sidebar main';`
const outline = css`box-shadow: 0 0 0 1px ${c.outline};`
const header = css`grid-area: header;background-color:${c.header};display:flex;justify-content:center;`
const sidebar = css`grid-area:sidebar;background-color:${c.sidebar};text-indent:1rem;color:${c.secFgTxt};`
const hover = css`&:hover{cursor:pointer;background-color:${c.hover};}`
const focus = css`&:focus{background-color:${c.highlight};}`;
const selectable = css`padding:0;line-height:1.8rem;font-size:0.9rem;background-color:transparent;color:${c.secFgTxt};border:none;outline:none;text-align:start;padding-left:1.5rem;${hover};${focus}`;
const main = css`grid-area:main;background-color:${c.bg};`

export default ({ title, msg, name, messages }) => (
  <Layout title={title}>
    <div css={slate}>
      <div css={outline,header}>
        <form>
          <input placeholder='Search' css={css`margin-top:0.3rem;width:30rem;height:20px;text-indent:0.5rem;border:none;border-radius:0.1rem;box-shadow:0 0 0 1px ${c.outline};background-color:${c.input};color:${c.secFgTxt};`} />
        </form>
      </div>
      <div css={outline,sidebar}>
        <div css={css`padding:0.5rem 0;display:grid;${hover}`}>
          <span css={css`margin:0;color:${c.fgTxt};`}>Workspace</span>
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

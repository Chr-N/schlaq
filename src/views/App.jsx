import Layout from './layouts/Layout'
import Scope from './components/Scope'
import React from 'react'
import { css } from '@emotion/core'
import theme from './theme/theme'

const slate = css`background-color:black;width:100vw;height:100vh;display:grid;grid-template-columns:260px 1fr;grid-template-rows:35px 1fr;grid-template-areas:'header header' 'sidebar main';`
const outline = css`box-shadow:${theme.boxShadow};`
const focusInputOutline = css`&:focus{box-shadow:${theme.focusShadowInput};}`
const header = css`grid-area: header;background-color:${theme.bgHeader};display:flex;justify-content:center;align-items:center;box-shadow:${theme.boxShadow};z-index:2;`
const sidebar = css`grid-area:sidebar;height:96vh;overflow-y:overlay; background-color:${theme.bgSidebar};text-indent:1rem;color:${theme.txtSec};box-shadow:${theme.boxShadow};z-index:1;padding-bottom:5rem;`
const hover = css`&:hover{cursor:pointer;background-color:${theme.hover};}`
const hoverStar = css`&:hover{cursor:pointer;}`
const hoverMessage = css`&:hover{background-color:${theme.hover};}`
const main = css`grid-area:main;background-color:${theme.bg};display:grid;grid-template-rows:3.8rem 1fr 3.8rem;height:96vh;`
const scrollbar = css`overflow:overlay;&::-webkit-scrollbar{width:0.6rem;background-color:transparent;};&::-webkit-scrollbar-thumb{background-color:${theme.overlay};border-radius:0.3rem;}`

export default ({ title, scope, scopeStarred, starred, channels, dms, messages }) => (
  <Layout title={title}>
    <div css={slate}>
      <div css={[outline,header]}>
        <form>
          <input placeholder='Search' css={css`width:30rem;height:20px;text-indent:0.5rem;border:none;border-radius:0.1rem;box-shadow:${theme.boxShadow};background-color:${theme.bgInput};color:${theme.txtSec};outline:none;`} />
        </form>
      </div>
      <div css={[outline,sidebar,scrollbar]}>
        <div css={[outline,css`padding:0.5rem 0;display:grid;${hover}`]}>
          <span css={css`margin:0;color:${theme.txt};`}>Workspace</span>
          <span css={css`margin:0;font-size:0.9rem;`}>🟢 Timothy</span>
        </div>
        <div css={css`padding: 0.5rem 0;${hover}`}><span>💬 Threads</span></div>
        <div css={css`padding: 0.5rem 0;`}>
          <span>Starred</span>
          <div css={css`display:grid;padding-top:0.5rem;`}>
            {starred.map(({starred}) => 
              <Scope type={'user'} scope={starred} currScope={starred === scope} />
            )}
          </div>
        </div>
        <div css={css`padding: 0.5rem 0;`}>
          <span>Channels</span>
          <div css={css`display:grid;padding-top:0.5rem;`}>
            {channels.map(({channel}) => 
              <Scope type={'channel'} scope={channel} currScope={channel === scope} />
            )}
          </div>
        </div>
        <div css={css`padding: 0.5rem 0;`}>
          <span>Direct Messages</span>
          <div css={css`display:grid;padding-top:0.5rem;`}>
            {dms.map(({dm}) => 
              <Scope type={'user'} scope={dm} currScope={dm === scope} />
            )}
          </div>
        </div>
      </div>
      <div css={[outline,main]}>
        <div css={[outline,css`display:flex;align-items:center;`]}>
          <span css={css`font-weight:bold;align-self:center;margin-left:1rem;`}>{scope}</span>
          <div css={[hoverStar, css`margin-left:0.5rem;`]}>
            {scopeStarred ?
            <svg viewBox="0 0 24 24" width="15" height="15" stroke={`${theme.highlight}`} stroke-width="2" fill={`${theme.highlight}`} stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> :
            <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            }
          </div>
        </div>
        <div css={[scrollbar,css`display:flex;flex-direction:column-reverse;overflow-y:overlay;`]}>
          {messages[scope] && messages[scope].map(({profilePic, username, message}) =>
            <div css={[hoverMessage, css`display:grid;grid-template-columns:2.8rem 1fr;grid-template-rows:1fr max-content;grid-template-areas:'profile-pic username' 'profile-pic message';padding:1rem 1.5rem;`]}>
              <img css={css`grid-area:profile-pic;border-radius:0.2rem;`} src={profilePic} />
              <div css={css`grid-area:username;text-indent:1rem;font-weight:bold;`}>{username}</div>
              <div css={css`grid-area:message;padding-left:1rem;width:95%;`}>{message}</div>
            </div>
          )}
        </div>
        <div css={[/* outline, */css`display:grid;justify-items:center;align-items:flex-start;padding-top:0.5px;`]}>
          <form css={css`width:96.5%;`}>
            <input placeholder={`Message ${scope}`} css={[focusInputOutline, css`width:100%;height:2.5rem;text-indent:1rem;border:none;box-shadow:${theme.boxShadowInput};background-color:${theme.bgInput};color:${theme.txtSec};outline:none;justify-self:center;align-self:center;border-radius:0.2rem;`]} />
          </form>
        </div>
      </div>
    </div>
  </Layout>
)

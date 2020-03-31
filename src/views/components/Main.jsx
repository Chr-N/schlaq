import { css } from '@emotion/core'
import theme from '../styles/theme'
import { outline, scrollbar, hoverOutline } from '../styles/styles'

const main = css`grid-area:main;background-color:${theme.bg};display:grid;grid-template-rows:3.8rem 1fr 3.8rem;height:96vh;`
const hoverMessage = css`&:hover{background-color:${theme.hover};}`
const hoverStar = css`&:hover{cursor:pointer;}`
const focusInputOutline = css`&:focus{box-shadow:${theme.focusShadowInput};}`

export default ({ scope, scopeStarred, messages }) => (
  <div css={[outline,main]}>
    <div css={[outline,css`display:flex;align-items:center;`]}>
      <span css={css`font-weight:bold;align-self:center;margin-left:1rem;`}>{scope}</span>
      <div css={[hoverStar, css`margin-left:0.5rem;`]}>
        {scopeStarred ?
        <svg viewBox="0 0 24 24" width="15" height="15" stroke={`${theme.highlight}`} strokeWidth="2" fill={`${theme.highlight}`} strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> :
        <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        }
      </div>
    </div>
    <div className='messages-scope' css={[scrollbar,css`display:flex;flex-direction:column-reverse;overflow-y:overlay;`]}>
      {messages[scope] && messages[scope].map(({profilePic, username, message},i) =>
        <div className='message-elem' css={[hoverMessage, css`display:grid;grid-template-columns:2.8rem 1fr;grid-template-rows:1fr max-content;grid-template-areas:'profile-pic username' 'profile-pic message';padding:1rem 1.5rem;`]} key={i} >
          <img css={css`grid-area:profile-pic;border-radius:0.2rem;`} src={profilePic} />
          <div css={css`grid-area:username;text-indent:1rem;font-weight:bold;`}>{username}</div>
          <div css={css`grid-area:message;padding-left:1rem;font-size:0.95rem;width:100%;`}>{message}</div>
        </div>
      )}
    </div>
    <div css={[/* outline, */css`display:grid;justify-items:center;align-items:flex-start;padding-top:0.5px;`]}>
      <form className='message-form' css={css`width:96.5%;`}>
        <input placeholder={`Message ${scope}`} css={[hoverOutline, focusInputOutline, css`width:100%;height:2.5rem;text-indent:1rem;border:none;box-shadow:${theme.boxShadowInput};background-color:${theme.bgInput};color:${theme.txtSec};outline:none;justify-self:center;align-self:center;border-radius:0.2rem;`]} />
      </form>
    </div>
  </div>
)

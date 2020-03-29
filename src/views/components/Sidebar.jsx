import Scope from './Scope'
import { css } from '@emotion/core'
import theme from '../styles/theme'
import { outline, scrollbar } from '../styles/styles'

const sidebar = css`grid-area:sidebar;height:96vh;overflow-y:overlay; background-color:${theme.bgSidebar};text-indent:1rem;color:${theme.txtSec};box-shadow:${theme.boxShadow};z-index:1;padding-bottom:5rem;`
const hover = css`&:hover{cursor:pointer;background-color:${theme.hover};}`

export default ({ scope, starred, channels, dms }) => (
  <div css={[outline,sidebar,scrollbar]}>
    <div css={[outline,css`padding:0.5rem 0;display:grid;${hover}`]}>
      <span css={css`margin:0;color:${theme.txt};`}>Workspace</span>
      <span css={css`margin:0;font-size:0.9rem;`}>🟢 Timothy</span>
    </div>
    <div css={css`padding: 0.5rem 0;${hover}`}><span>💬 Threads</span></div>
    <div css={css`padding: 0.5rem 0;`}>
      <span>Starred</span>
      <div css={css`display:grid;padding-top:0.5rem;`}>
        {starred.map(({starred,type},i) => 
          <Scope
            type={type}
            scope={starred}
            currScope={starred === scope}
            key={i}
          />
        )}
      </div>
    </div>
    <div css={css`padding: 0.5rem 0;`}>
      <span>Channels</span>
      <div css={css`display:grid;padding-top:0.5rem;`}>
        {channels.map(({channel},i) => 
          <Scope
            type={'channel'}
            scope={channel}
            currScope={channel === scope}
            key={i}
          />
        )}
      </div>
    </div>
    <div css={css`padding: 0.5rem 0;`}>
      <span>Direct Messages</span>
      <div css={css`display:grid;padding-top:0.5rem;`}>
        {dms.map(({dm},i) => 
          <Scope
          type={'user'}
          scope={dm}
          currScope={dm === scope}
          key={i}
          />
        )}
      </div>
    </div>
  </div>
)

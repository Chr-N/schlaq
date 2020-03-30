import Scope from './Scope'
import Workspace from './Workspace'
import { css } from '@emotion/core'
import theme from '../styles/theme'
import { outline, scrollbar } from '../styles/styles'

const sidebar = css`grid-area:sidebar;height:96vh;overflow-y:overlay; background-color:${theme.bgSidebar};text-indent:1rem;color:${theme.txtSec};box-shadow:${theme.boxShadow};z-index:1;padding-bottom:2rem;`
const hover = css`&:hover{cursor:pointer;background-color:${theme.hover};}`
const inputHover = css`&:hover{cursor:pointer;~.dropdown{background-color:${theme.hover};}}`
const popup = css`&:checked{~.popup{opacity:1;z-index:0;}}`

export default ({ user, workspaceScope, workspaces, scope, starred, channels, dms }) => (
  <div css={[sidebar,outline,scrollbar]}>
    <input css={[popup,inputHover,css`width:260px;height:63px;opacity:0;position:fixed;left:0;`]} type='checkbox' />
    <div className='dropdown' css={[outline,hover,css`padding:0.5rem 0;display:grid;outline:none;`]}>
      <span css={css`margin:0;color:${theme.txt};display:flex;align-items:center;font-weight:bold;color:${theme.txtBright};`}>{workspaceScope}<svg css={css`margin:0.1rem 0 0 0.2rem;`} viewBox='0 0 24 24' width='15' height='15' stroke='currentColor' strokeWidth='3.5' fill='none' strokeLinecap='round' strokeLinejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg></span>
      <span css={css`margin-left:1rem;font-size:0.9rem;display:flex;align-items:center;`}><svg css={css`margin-right:0.3rem;`} viewBox='0 0 24 24' width='10' height='10' stroke={`${theme.online}`} strokeWidth='3' fill={`${theme.online}`} strokeLinecap='round' strokeLinejoin='round'><circle cx='12' cy='12' r='10'></circle></svg>{user}</span>
    </div>
    <div className='popup' css={css`position:fixed;opacity:0;background-color:${theme.bgPopup};width:260px;border-radius:0.5rem;box-shadow:${theme.boxShadow};margin:-0.3rem 0 0 0.8rem;padding:0.5rem 0;z-index:-1;`}>
      {workspaces.map(({workspace,workspacePic},i) => 
        <Workspace
          workspace={workspace}
          workspacePic={workspacePic}
          currWorkspace={workspace === workspaceScope}
          key={i}
        />
      )}
    </div>
    {/* <div css={css`padding: 0.5rem 0;${hover}`}><span>💬 Threads</span></div> */}
    <div css={css`padding: 1.5rem 0 0.5rem 0;`}>
      <span>Starred</span>
      <div css={css`display:grid;padding-top:0.5rem;`}>
        {starred.map(({starred,type},i) => 
          <Scope
            workspaceScope={workspaceScope}
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
            workspaceScope={workspaceScope}
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
            workspaceScope={workspaceScope}
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

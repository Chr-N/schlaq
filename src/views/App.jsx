import Layout from './layouts/Layout'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

import React from 'react'
import { css } from '@emotion/core'

const styles = css`background-color:black;width:100vw;height:100vh;display:grid;grid-template-columns:260px 1fr;grid-template-rows:35px 1fr;grid-template-areas:'header header' 'sidebar main';`

export default ({ title, user, workspaceScope, workspaces, scope, scopeStarred, starred, channels, dms, messages, primusLib }) => (
  <Layout title={title} primusLib={primusLib}>
    <div css={styles}>
      <Header />
      <Sidebar
        scope={scope}
        user={user}
        workspaceScope={workspaceScope}
        workspaces={workspaces}
        starred={starred}
        channels={channels}
        dms={dms}
      />
      <Main
        scope={scope}
        scopeStarred={scopeStarred}
        messages={messages}
      />
    </div>
  </Layout>
)

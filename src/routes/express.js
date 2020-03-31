const { title } = require('../globals').props
const { starred, dms } = require('../db/db')
const starredArr = starred.map( ({ starred }) => starred )
const db = require('../sql/mysql-interface')

exports.index = (req,res) => res.redirect('/FSWD/general')

exports.workspaceScope = async (req,res) => {
  if (req.cookies && req.cookies.token) {
    const [ ,payload ] = req.cookies.token.split('.')
    const { user_name: user } = JSON.parse(`${Buffer.from( payload, 'base64' )}`)
  

    await db.createConnection()

  const userID = (await db.getUsers( 'id',
    `where user_name = '${user}'`
  )).map( ({id}) => id ).toString()

  const userWorkspaceIDs = (await db.getUserWorkspaces( 'workspace_id',
    `where user_id = ${userID}`
  )).map( ({workspace_id}) => workspace_id ).toString()

  const userWorkspaceMetas = await db.getWorkspaces( 'workspace_name, workspace_pic_link',
    `where workspace_id in (${userWorkspaceIDs});`
  )
  const workspaces = userWorkspaceMetas.map( ({workspace_name, workspace_pic_link}) => ({
    workspace: workspace_name,
    workspacePic: workspace_pic_link
  }))

  const workspaceID = (await db.getWorkspaces( 'workspace_id',
    `where workspace_name = '${req.params.workspace}'`
  )).map(({workspace_id}) => workspace_id).toString()

  const workspaceChannels = await db.getChannels( 'channel_name',
    `where workspace_id = ${workspaceID}`
  )

  const channels = workspaceChannels.map( ({channel_name}) => ({ channel: channel_name }) )

  const getUserName = async (id) => (await db.getUsers( 'user_name',
    `where id = ${id}`
  )).map(({user_name}) => user_name).toString()

  const getUserProfilePic = async (id) => (await db.getUsers( 'profile_picture_link',
    `where id = ${id}`
  )).map(({profile_picture_link}) => profile_picture_link).toString()

  const getChannelID = async (channelName) => (await db.getChannels( 'channel_id',
    `where channel_name = '${channelName}' and workspace_id = ${workspaceID}`
  )).map(({channel_id}) => channel_id).toString()

  const getChannelName = async (id) => (await db.getChannels( 'channel_name',
    `where channel_id = ${id}`
  )).map(({channel_name}) => channel_name).toString()

  const channelID = await getChannelID(req.params.scope)

  const posts = await db.getPosts( 'user_id, channel_id, post_text',
    `where channel_id = ${channelID}`
  )

  const messages = {}
  for ( post of posts ) {
    const channelName = await getChannelName(post.channel_id)
    const message = post.post_text
    const username = await getUserName(post.user_id)
    const profilePic = await getUserProfilePic(post.user_id)
    if ( messages[channelName] && messages[channelName].length ) {
      messages[channelName].push({ message, username, profilePic })
    }
    else {
      messages[channelName] = [{ message, username, profilePic }]
    }
  }

  // console.log( Object.keys(messages) )

  db.closeConnection()

  res.render( 'App', {
    title: `${title} | ${req.params.scope} | ${req.params.workspace}`,
    user,
    workspaceScope: req.params.workspace,
    workspaces,
    starred,
    channels,
    dms,
    messages,
    scope: req.params.scope,
    scopeStarred: starredArr.includes( req.params.scope ),
    primusLib: res.app.locals.primusLib
  })
  
  
  
  
  }
}

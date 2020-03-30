const { title } = require('../globals').props
const { users, starred, channels, dms, messages } = require('../db/db')
const starredArr = starred.map( ({ starred }) => starred )

exports.index = (req,res) => res.redirect('/FSWD/general')

exports.workspaceScope = (req,res) => {
  const user = 'Timothy'
  // console.log({ user, ...req.params })

  res.render( 'App', {
    title: `${title} | ${req.params.scope} | ${req.params.workspace}`,
    user,
    workspaceScope: req.params.workspace,
    workspaces: users[user],
    starred,
    channels,
    dms,
    messages,
    scope: req.params.scope,
    scopeStarred: starredArr.includes( req.params.scope ),
    primusLib: res.app.locals.primusLib
  })
}

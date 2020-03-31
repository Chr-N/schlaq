const primus = Primus.connect( `http://${dbHostAddress}:5001`, { manual: false } )
primus.on( 'open' , () => console.log( 'connected' ) )

document.querySelector('.message-form').onsubmit = (e) => {
  e.preventDefault()

  const message = e.target.children[1].value
  e.target.children[1].value = null
  primus.write( message )
}

const getMessageElem = (profilePic, username, message) => {
  const messageTemplate = document.querySelector('.message-elem').cloneNode(true)

  messageTemplate.children[1].src = profilePic
  messageTemplate.children[3].innerText = username
  messageTemplate.children[5].innerText = message

  return messageTemplate
}

const messagesScope = document.querySelector('.messages-scope')
primus.on( 'data', ({ profilePic, username, message }) => {
  messagesScope.prepend( getMessageElem( profilePic, username, message ) )
})

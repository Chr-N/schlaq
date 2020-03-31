const primus = Primus.connect( 'http://localhost:5001', { manual: false } )
primus.on( 'open' , () => console.log('connected') )

primus.on( 'data', (data) => {
  console.log( 'server:', data )
})

document.querySelector('.message-form').onsubmit = (e) => {
  e.preventDefault()

  const message = e.target.children[1].value
  e.target.children[1].value = null
  primus.write({ message })
}

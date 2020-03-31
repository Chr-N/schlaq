exports.connection = (spark) => {
  console.log(`${spark.address.ip} connected`)

  const [ ,payload ] = spark.request.headers.cookie.split('.')
  const {
    user_name: username,
    profile_picture_link: profilePic
  } = JSON.parse( Buffer.from( payload, 'base64' ) )

  spark.on( 'data', (message) => {
    console.log( `client ${username}:`, message )
    spark.write({ profilePic, username, message })
  })
}

exports.disconnection = (spark) => {
  console.log(`${spark.address.ip} disconnected`)
}

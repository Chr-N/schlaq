exports.connection = (spark) => {
  console.log(`${spark.address.ip} connected`)

  spark.on( 'data', (data) => {
    console.log( 'client:', data )
    spark.write( data )
  })
}

exports.disconnection = (spark) => {
  console.log(`${spark.address.ip} disconnected`)
}

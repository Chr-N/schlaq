import React from 'react'
import Layout from './layouts/Layout'

export default ({ title, msg, name }) => {
  return (
    <Layout title={title}>
      <h1>Hello 👋</h1>
      <p>{msg}</p>
      <p>{name}</p>
    </Layout>
  )
}

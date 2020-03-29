import React from 'react'
import Layout from './layouts/Layout'

export default ({ title, msg, name, messages }) => {
  return (
    <>
    <style jsx>{`
      h1 {
        color: salmon;
      }
    `}</style>

    <Layout title={title}>
      <h1>Hello 👋</h1>
      <p>{msg}</p>
      <p>{name}</p>
      <pre>
        <p>{JSON.stringify(messages, null, 2)}</p>
      </pre>
    </Layout>
    </>
  )
}

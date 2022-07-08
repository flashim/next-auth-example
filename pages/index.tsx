import Layout from "../components/layout"

export default function IndexPage() {
  return (
    <Layout>
      <h3>{`NextJs + Authentication => NextAuth.js`}</h3>
      <p>
        This is an example site to demonstrate how to use{" "}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.      
      </p>
      <hr/>
      <p>User: oktauser@persistent.com</p>
      <p>Pass: admin@123</p>
    </Layout>
  )
}

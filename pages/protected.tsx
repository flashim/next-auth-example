import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import AccessDenied from "../components/access-denied"

// import { GitHub } from "../components/github"
// import { GitHub2 } from "../components/github2"
      

const ProtectedPage = () => {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [content, setContent] = useState()

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected")
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    }
    fetchData()
  }, [session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
        <div>
        <p>
          <h3>Infinite scrolling</h3>
        </p>
        {/* <GitHub /> */}
        </div>
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>
        <strong>{content ?? "\u00a0"}</strong>
      </p>
      <hr/>
      <br/>
      <div >
        <h3>Infinite scrolling using shadowRoot</h3>
      {/* <GitHub2 /> */}
      {/* <GitHub /> */}
      </div>
    </Layout>
  )
}

export default ProtectedPage
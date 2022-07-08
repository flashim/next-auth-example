import React from "react"
import useSWRInfinite from "swr/infinite"
import InfiniteScroll from "react-swr-infinite-scroll"

const PAGE_SIZE = 3

export const GitHub: React.FC = () => {
  const swr = useSWRInfinite(
    (index, prev) =>
      `https://api.github.com/repos/reactjs/react-a11y/issues?per_page=${PAGE_SIZE}&page=${
        index + 1
      }`,
    {
      fetcher: async (key) => fetch(key).then((res) => res.json()),
    }
  )

  return (
    <div style={{ maxWidth: "700px" }}>
      <div className={"FixedHeightContainer"}>
        <h4>Title</h4>
        <div className={"Content"}>
          <InfiniteScroll
            swr={swr}
            loadingIndicator="Loading..."
            endingIndicator="No more issues! 🎉"
            isReachingEnd={(swr) =>
              swr.data?.[0]?.length === 0 ||
              swr.data?.[swr.data?.length - 1]?.length < PAGE_SIZE
            }
          >
            {(response: any) =>
              response?.map((issue: any) => (
                <div
                  key={issue.id}
                  style={{
                    padding: "20px",
                    borderRadius: "8px",
                    border: "solid #ccc 1px",
                    margin: "20px auto",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{issue.title}</div>
                  <div style={{ color: "#aaa", marginTop: "8px" }}>
                    {issue.user.login} •{" "}
                    {new Date(issue.created_at).toDateString()}
                  </div>
                </div>
              ))
            }
          </InfiniteScroll>
        </div>
      </div>
    </div>
  )
}

import useSWR, { mutate } from "swr"
import { useState, useEffect } from "react"

//https://pm3ufbxz99.execute-api.us-east-1.amazonaws.com/test/genome-variant/avellino/science/analyse?run_id=36b84013-5dc1-446e-ba32-1fb629f22e90&sample_id=srr16683907&offset_int=0&offset_str=ec29c9f1-d051-11ec-882d-c025a53ec2f8

let url =
  "https://pm3ufbxz99.execute-api.us-east-1.amazonaws.com/test/genome-variant/avellino/science/analyse"

export default function PostFetcher(props: any) {
  const [d, setD] = useState({})

  const fetcher1 = (url: string) =>
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJraWQiOiJZcm9heUZBY3JiWEtqUUhTVmpGT0lDT2J5Ynlwb29fSFNIMEY5M2ZXeE1VIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlRWZk5NdHhNWWxSUHlwbkxTV2w4M2NpUFZfOUxsdDh4aFJ3VjUySXViYzQiLCJpc3MiOiJodHRwczovL2F2ZWxsaW5vLm9rdGEuY29tIiwiYXVkIjoiaHR0cHM6Ly9hdmVsbGluby5va3RhLmNvbSIsInN1YiI6ImFzaGltLnNhaGFAYXZlbGxpbm8uY29tIiwiaWF0IjoxNjUyOTc4NDM5LCJleHAiOjE2NTI5ODIwMzksImNpZCI6IjBvYWdramZ5d3U1RnQwTnhTNjk2IiwidWlkIjoiMDB1YTQ3NDk3S05tYlpMeWE2OTYiLCJzY3AiOlsib3BlbmlkIiwicHJvZmlsZSIsImVtYWlsIiwiZ3JvdXBzIl0sImF1dGhfdGltZSI6MTY1Mjk0MzQwM30.mY6fSzWIpoVwy1evi2690TI3Kieg4zghKhJqq3BvvfzPI2fZzHoKI73sRPSb2P0ggjSF4jXxbO0Y1AWp2bWZ4aPP-AxRTy4Od218PelMQ3n4px1sNJxYt_4Iqdbj9czqEVzXEUIDbHHSRlpSKArxEgitR3MC8ZeEDgHBqa-ejBuBYZ76nCy4afi9SdFXOSAZabY8fvDKkxICOTPQzoQDgo0EOh8iuGmt3kZmIfnoaYAcwAZ3gCC6Q31lGs5QZui_Odm9vGRSlJYIl6P3sgIzfOYnZHusEjHWOx4vHoTrgUxFoF5sv_00_4GSVxyo-v1iQwdkkVNXWYKNaZCQoyvZgQ",
      },
      body: JSON.stringify({
        run_id: "36b84013-5dc1-446e-ba32-1fb629f22e90",
        sample_id: "srr16683907",
      }),
    }).then((res) => res.json())

  const { data } = useSWR(url, fetcher1)

  const postCall = async () => {
    let mutateData = await mutate("/fakeUrl", { ...d }, false)
    console.log("mutateData ", mutateData)
    //await
  }

  useEffect(() => {
    // first run

    setD(data)
  }, [])

  console.log("d -> ", d)

  /* mutate(url, async (todos: any) => {
    const updatedTodo = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJraWQiOiJZcm9heUZBY3JiWEtqUUhTVmpGT0lDT2J5Ynlwb29fSFNIMEY5M2ZXeE1VIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlRWZk5NdHhNWWxSUHlwbkxTV2w4M2NpUFZfOUxsdDh4aFJ3VjUySXViYzQiLCJpc3MiOiJodHRwczovL2F2ZWxsaW5vLm9rdGEuY29tIiwiYXVkIjoiaHR0cHM6Ly9hdmVsbGluby5va3RhLmNvbSIsInN1YiI6ImFzaGltLnNhaGFAYXZlbGxpbm8uY29tIiwiaWF0IjoxNjUyOTc4NDM5LCJleHAiOjE2NTI5ODIwMzksImNpZCI6IjBvYWdramZ5d3U1RnQwTnhTNjk2IiwidWlkIjoiMDB1YTQ3NDk3S05tYlpMeWE2OTYiLCJzY3AiOlsib3BlbmlkIiwicHJvZmlsZSIsImVtYWlsIiwiZ3JvdXBzIl0sImF1dGhfdGltZSI6MTY1Mjk0MzQwM30.mY6fSzWIpoVwy1evi2690TI3Kieg4zghKhJqq3BvvfzPI2fZzHoKI73sRPSb2P0ggjSF4jXxbO0Y1AWp2bWZ4aPP-AxRTy4Od218PelMQ3n4px1sNJxYt_4Iqdbj9czqEVzXEUIDbHHSRlpSKArxEgitR3MC8ZeEDgHBqa-ejBuBYZ76nCy4afi9SdFXOSAZabY8fvDKkxICOTPQzoQDgo0EOh8iuGmt3kZmIfnoaYAcwAZ3gCC6Q31lGs5QZui_Odm9vGRSlJYIl6P3sgIzfOYnZHusEjHWOx4vHoTrgUxFoF5sv_00_4GSVxyo-v1iQwdkkVNXWYKNaZCQoyvZgQ",
      },
      body: JSON.stringify(props.payload),
    })

    // filter the list, and return it with the updated item
    const filteredTodos = todos.filter((todo) => todo.id !== "1")
    return [...filteredTodos, updatedTodo]
  }) */

  return (
    <>
      Post fetcher <button onClick={postCall}>call</button>
      {/* <ul>
        {d?.data?.map((item: any, idx: number) => (
          <li key={idx}>{idx}</li>
        ))}
      </ul> */}
    </>
  )
}

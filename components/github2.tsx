import React, { useState, useEffect } from "react"
import useSWRInfinite from "swr/infinite"
import InfiniteScroll from "react-swr-infinite-scroll"
import ReactShadowRoot from "react-shadow-root"
import { StatefulTable } from "carbon-addons-iot-react"
import styled from "styled-components"

const PAGE_SIZE = 5

//.. the DataTable to come from common component for table
const StyledTable = styled(StatefulTable)`
     
  .bx--data-table-content {
    height: ${(props: { tableheight: number; selection: number }) =>
      props.tableheight - props.selection - 50 - 32 - 18 + "px"}};
  }

  .bx--batch-actions {
    background-color: rgb(244 129 32);
    height: 25px;
    border-radius: 2px;
  }

  .bx--btn--primary {
    background-color: rgb(244 129 32);
  }

  .bx--batch-summary {
    background-color: rgb(244 129 32);
  }

  .bx--checkbox-table-cell,
  .data-table-start {
    background: white;
  }

  .table-header-label-start,
  .iot--table-header-checkbox {
    background: #e9ecf3;
    font-family: "myriad-pro-semibold";
  }

  .bx--data-table {
    font-family: "myriad-pro";
  }

  .link {
    color: #0f62fe;
    cursor: pointer;
  }

  .data {
    color: "black";
  }

  .bx--table-toolbar {
    min-height: 1.8rem;
  }
  section.bx--table-toolbar {
    height: 1.8rem;
  }

  .bx--checkbox:checked + .bx--checkbox-label::before,
  .bx--checkbox:indeterminate + .bx--checkbox-label::before,
  .bx--checkbox-label[data-contained-checkbox-state="true"]::before,
  .bx--checkbox-label[data-contained-checkbox-state="mixed"]::before {
    outline: 2px solid rgb(244 129 32);
    outline-offset: -2px;
    border-width: 1px;
    border-color: rgb(244 129 32);
    background-color: rgb(244 129 32);
  }
  .bx--data-table th.iot--table-head--table-header {
    padding-left: 14px;
    padding-right: 0px;
  }
  .bx--data-table--sm th {
    height: 35px;
    position:sticky;
    top:0;
    z-index:1347;
  }

  .bx--data-table--sm .bx--table-header-label{
    padding-right: 0.3rem;
  }

  td.data-table-start {
    padding-left: 14px;
    padding-right: 0px;
    height: 35px;
  }

  div.active svg path {
    fill: #f48120;
  }
  div.nonactive svg path {
    fill: #a8a8a8;
  }
  div.nonactive:hover svg path {
    fill: #f48120;
  }
`

const style = `{
  .bx--data-table-content {
    height: ${(props: { tableheight: number; selection: number }) =>
      props.tableheight - props.selection - 50 - 32 - 18 + "px"}};
  }

  .bx--batch-actions {
    background-color: rgb(244 129 32);
    height: 25px;
    border-radius: 2px;
  }

  .bx--btn--primary {
    background-color: rgb(244 129 32);
  }

  .bx--batch-summary {
    background-color: rgb(244 129 32);
  }

  .bx--checkbox-table-cell,
  .data-table-start {
    background: white;
  }

  .table-header-label-start,
  .iot--table-header-checkbox {
    background: #e9ecf3;
    font-family: "myriad-pro-semibold";
  }

  .bx--data-table {
    font-family: "myriad-pro";
  }

  .link {
    color: #0f62fe;
    cursor: pointer;
  }

  .data {
    color: "black";
  }

  .bx--table-toolbar {
    min-height: 1.8rem;
  }
  section.bx--table-toolbar {
    height: 1.8rem;
  }

  .bx--checkbox:checked + .bx--checkbox-label::before,
  .bx--checkbox:indeterminate + .bx--checkbox-label::before,
  .bx--checkbox-label[data-contained-checkbox-state="true"]::before,
  .bx--checkbox-label[data-contained-checkbox-state="mixed"]::before {
    outline: 2px solid rgb(244 129 32);
    outline-offset: -2px;
    border-width: 1px;
    border-color: rgb(244 129 32);
    background-color: rgb(244 129 32);
  }
  .bx--data-table th.iot--table-head--table-header {
    padding-left: 14px;
    padding-right: 0px;
  }
  .bx--data-table--sm th {
    height: 35px;
    position:sticky;
    top:0;
    z-index:1347;
  }

  .bx--data-table--sm .bx--table-header-label{
    padding-right: 0.3rem;
  }

  td.data-table-start {
    padding-left: 14px;
    padding-right: 0px;
    height: 35px;
  }

  div.active svg path {
    fill: #f48120;
  }
  div.nonactive svg path {
    fill: #a8a8a8;
  }
  div.nonactive:hover svg path {
    fill: #f48120;
  }
}`

const DataTable = (props: any) => {
  return (
    <StyledTable
      columns={props.columns}
      data={props.data}
      size={props.size}
      actions={props?.actions ? props.actions : {}}
      view={props?.view ? props?.view : {}}
      options={props?.options ? props?.options : {}}
    />
  )
}

//.. Needs to come from table schema file
const columns = [
  {
    id: "id",
    name: "ID",
  },

  {
    id: "description",
    name: "Description",
  },
  {
    id: "first_brewed",
    name: "First Brewed on",
  },
  {
    id: "tagline",
    name: "Tagline",
  },
  {
    id: "contributed_by",
    name: "Contributed By",
  },

  /* {
    id: "name",
    name: "Name",
  },
  {
    id: "brewers_tips",
    name: "brewers_tips",
  },
  {
    id: "ebc",
    name: "EBC",
  },
  {
    id: "ph",
    name: "PH",
  }, */

  {
    id: "srm",
    name: "SRM",
  },
]

//.. to come from utils
const flatten:any = (_arr: any) => {
  let arr = [..._arr]
  return arr.reduce(function (flat: any, toFlatten: any) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    )
  }, [])
}

export const GitHub2: React.FC = (props) => {
  const [data, setData] = useState([])

  const swr = useSWRInfinite(
    (index, prev) => `https://api.punkapi.com/v2/beers?page=${index + 1}`,
    {
      fetcher: async (key) => fetch(key).then((res) => res.json()),
    }
  )

  const getDataFormat = (swr: any) => {
    let { data, error, isValidating, size } = swr
    console.log(data, isValidating, size)

    if (error || !data) return

    let pageData = flatten(data)
    //console.log("pageData2 ", pageData)

    let fdata = pageData.map((item: any) => {
      return {
        id: item.id,
        values: item,
      }
    })

    //console.log("fdata ", fdata)

    return fdata
  }

  useEffect(() => {
    if (!swr?.isValidating) {
      setData(getDataFormat(swr))
    }
  }, [swr?.isValidating])

  return (
    <>
      <div className={"FixedHeightContainer"}>
        {/* <h2>Title</h2> */}
        {swr?.data && (
          <ReactShadowRoot>
            <style>{style}</style>
            <div className={"Content"}>
              <InfiniteScroll
                swr={swr}
                loadingIndicator="Loading..."
                endingIndicator="No more issues! 🎉"
                isReachingEnd={(swr) =>
                  swr &&
                  (swr.data?.[0]?.length === 0 ||
                    swr.data?.[swr.data?.length - 1]?.length) < PAGE_SIZE
                }
              >
                <DataTable
                  id="table"
                  columns={columns}
                  data={data}
                  size={"sm"}
                />
              </InfiniteScroll>
            </div>
          </ReactShadowRoot>
        )}
      </div>
    </>
  )
}

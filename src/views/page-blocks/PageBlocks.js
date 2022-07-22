import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCol,
  CRow,
} from '@coreui/react'

import DataTableCard from 'src/reusable/DataTableCard';
import { useApi } from 'src/api/baseApi';

const PageBlocks = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const repo = useApi({
    url: 'page-blocks',
    option: {
      baseURL: 'https://whispering-coast-45921.herokuapp.com/',
      timeout: 10000,
      headers: { 
        'Access-Control-Allow-Origin': '*',
      },
    },
    getResponseCallback: (res) => (res.data)
  });

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/page-blocks?page=${newPage}`)
  }

  const handleDelete = (item) => {
    repo.remove(item._id)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={6}>
        <DataTableCard 
          title="PageBlocks"
          fields={[
            { key: 'id', _classes: 'font-weight-bold' },
            'title',
          ]}
          data={repo.data}
          page={page}
          pageSize={5}
          isLoading={repo.isLoading}
          onAddClick={() => history.push('/page-blocks/create')}
          onRowEditClick={(item) => history.push(`/page-blocks/${item.id}`)}
          onRowDeleteClick={handleDelete}
          onPageChange={pageChange}
        />
      </CCol>
    </CRow>
  )
}

export default PageBlocks

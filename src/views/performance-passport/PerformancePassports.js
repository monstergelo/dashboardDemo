import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCol,
  CRow,
} from '@coreui/react'

import DataTableCard from 'src/reusable/DataTableCard';
import { useApi } from 'src/api/baseApi';

const PerformancePassports = () => {
  const {data} = useApi({ url: 'profile'});
  const status = data ? data.status: null;
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const repo = useApi({
    url: 'pp',
  });

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/performance-passports?page=${newPage}`)
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

  const onSearch = (search) => {
    repo.fetch([
      {
        name: 'q',
        value: search,
      },
    ])
  }

  const addAllowed = status === 'system_admin' || status === 'event_producer';
  const deleteAllowed = status === 'system_admin' || status === 'event_producer';

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={12}>
        <DataTableCard 
          title="Performance Passports"
          fields={[
            { key: '_id', _classes: 'font-weight-bold' },
            'title'
          ]}
          data={repo.data}
          page={page}
          pageSize={5}
          isLoading={repo.isLoading}
          onAddClick={addAllowed ? () => history.push('/performance-passports/create') : null}
          onRowEditClick={(item) => history.push(`/performance-passports/${item._id}`)}
          onRowDeleteClick={deleteAllowed ? handleDelete : null}
          onPageChange={pageChange}
          onSearch={onSearch}
        />
      </CCol>
    </CRow>
  )
}

export default PerformancePassports

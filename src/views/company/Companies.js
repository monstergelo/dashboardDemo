import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCol,
  CRow,
} from '@coreui/react'

import DataTableCard from 'src/reusable/DataTableCard';
import useCompany from 'src/api/companyApi';
import moment from 'moment';

const Companies = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const repo = useCompany({}); console.log(repo.data)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/companies?page=${newPage}`)
  }

  const handleDelete = (item) => {
    repo.remove(item._id)
  }

  const onSearch = (search) => {
    repo.fetch([
      {
        name: 'q',
        value: search,
      },
    ])
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={12}>
        <DataTableCard 
          title="Companies"
          fields={[
            { key: '_id', _classes: 'font-weight-bold' },
            'code', 'name', 'address',
            'relevant_contract_date', 'contact_person', 'email', 'phone_number',
          ]}
          data={repo.data}
          page={page}
          pageSize={5}
          isLoading={repo.isLoading}
          scopedSlots={{
            'relevant_contract_date': (item) => (
              <td>
                {moment(item.relevant_contract_date).format("DD MMM YYYY")}
              </td>
            )
          }}
          onAddClick={() => history.push('/companies/create')}
          onRowEditClick={(item) => history.push(`/companies/${item._id}`)}
          onPageChange={pageChange}
          onRowDeleteClick={handleDelete}
          onSearch={onSearch}
        />
      </CCol>
    </CRow>
  )
}

export default Companies

import React, { useState, useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner } from '@coreui/react';
import { useForm } from 'react-hook-form';
import DataTableCard from 'src/reusable/DataTableCard';

const AdminImportModal = (props) => {
  const { onSubmit, isLoading, data } = props;
  const [page, setPage] = useState(1);

  const pageChange = (newPage) => {
    setPage(newPage)
  }

  const { handleSubmit } = useForm();

  useEffect(() => {
    setPage(1)
  }, [data])

  return (
    <>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              Import Admin
            </CCardHeader>
            <CCardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <DataTableCard 
                  title="Preview"
                  fields={[
                    { key: 'name', _classes: 'font-weight-bold' },
                    'email', 'password', 'status',
                  ]}
                  data={data}
                  page={page}
                  pageSize={5}
                  isLoading={false}
                  onPageChange={pageChange}
                />

                <CButton color="primary" type="submit">
                  {isLoading && (<CSpinner size="sm" color="secondary" />)}
                  <span>Submit</span>
                </CButton>
              </form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default AdminImportModal;
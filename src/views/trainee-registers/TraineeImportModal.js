import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import DataTableCard from 'src/reusable/DataTableCard';
import FormField from 'src/reusable/FormField';

const TraineeImportModal = (props) => {
  const { getOptionCompany, getOptionTraining, onSubmit, isLoading, data } = props;
  const [pages, setPage] = useState(1);

  const pageChange = (newPage) => {
    setPage(newPage)
  }

  const { handleSubmit, control } = useForm();

  useEffect(() => {
    setPage(1)
  }, [data])

  return (
    <>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              Import Trainee
            </CCardHeader>
            <CCardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  type="async-select"
                  name="training"
                  label="Event Code"
                  control={control}
                  isLoading={isLoading}
                  selectCallback={getOptionTraining}
                  getOptionLabel={(option) => (`${option.name} - ${option.event_code}`)}
                  getOptionValue={(option) => (option)}
                />

                <FormField
                  type="async-select"
                  name="company"
                  label="Company"
                  control={control}
                  isLoading={isLoading}
                  selectCallback={getOptionCompany}
                  getOptionLabel={(option) => (option.name)}
                  getOptionValue={(option) => (option)}
                />

                <DataTableCard 
                  title="Preview"
                  fields={[
                    { key: 'name', _classes: 'font-weight-bold' },
                    'email', 'password', 'position', 'phone_number', 'department',
                  ]}
                  data={data}
                  page={pages}
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

export default TraineeImportModal;
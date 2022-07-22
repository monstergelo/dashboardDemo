import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner, CToast, CToaster, CToastHeader } from '@coreui/react'
import { useForm } from "react-hook-form";
import FormField from 'src/reusable/FormField';

const TrainerCreate = (props) => {
  const { getOption, onSubmit, isLoading } = props
  const [toasts] = useState([])

  const { handleSubmit, control } = useForm();

  return (
    <>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              New Trainer
            </CCardHeader>
            <CCardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  type="async-select"
                  name="trainer"
                  label="Trainer"
                  control={control}
                  isLoading={isLoading}
                  loadOptions={getOption}
                  getOptionLabel={(option) => (option.name)}
                  getOptionValue={(option) => (option)}
                />

                <CButton color="primary" type="submit">
                  {isLoading && (<CSpinner size="sm" color="secondary" />)}
                  <span>Submit</span>
                </CButton>
              </form>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="12" lg="6">
          <CToaster position="bottom-right">
            {
              toasts.map((toast, key)=>{
                return(
                  <CToast
                    key={'toast' + key}
                    show
                    autohide={5000}
                    fade
                    color="success"
                  >
                    <CToastHeader closeButton>
                      {toast.message}
                    </CToastHeader>
                  </CToast>
                )
              })
            }
          </CToaster>
        </CCol>
      </CRow>
    </>
  )
}

export default TrainerCreate

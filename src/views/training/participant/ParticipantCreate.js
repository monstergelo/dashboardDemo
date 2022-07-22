import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner, CToast, CToaster, CToastHeader } from '@coreui/react'
import { useForm } from "react-hook-form";
import FormField from 'src/reusable/FormField';

const statusOption = [
  {
    value: 'digital_talent',
    label: 'Digital Talent',
  },
  {
    value: 'work_team_leader',
    label: 'Work Team Leader',
  }
]

const ParticipantCreate = (props) => {
  const { getOption, onSubmit, isLoading } = props
  const [toasts] = useState([])

  const { handleSubmit, control } = useForm();

  return (
    <>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              New Participant
            </CCardHeader>
            <CCardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  type="async-select"
                  name="trainee_id_to_add"
                  label="Trainee"
                  control={control}
                  isLoading={isLoading}
                  loadOptions={getOption}
                  getOptionLabel={(option) => (option.name)}
                  getOptionValue={(option) => (option)}
                />

                <FormField
                  type="select"
                  name="status"
                  label="Status"
                  control={control}
                  isLoading={isLoading}
                  defaultValue={statusOption[0].value}
                  options={statusOption}
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

export default ParticipantCreate

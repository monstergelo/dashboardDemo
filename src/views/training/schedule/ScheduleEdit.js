import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner, CToast, CToaster, CToastHeader } from '@coreui/react'
import { useForm } from "react-hook-form";
import moment from 'moment'
import FormField from 'src/reusable/FormField';

const ScheduleEdit = (props) => {
  const { data, onSubmit, isLoading } = props;
  const [toasts] = useState([])

  const { handleSubmit, control, reset } = useForm();

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        date: moment(data.date).format('YYYY-MM-DD HH:mm:ss')
      });
    }
  }, [reset, data]);

  return (
    <>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              Edit Schedule
            </CCardHeader>
            <CCardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
              <FormField
                  type="text"
                  name="_id"
                  label="ID"
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />

                <FormField
                  type="datetime"
                  name="date"
                  label="Date"
                  control={control}
                  isLoading={isLoading}
                />

                <FormField
                  type="text"
                  name="program"
                  label="Program"
                  control={control}
                  isLoading={isLoading}
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

export default ScheduleEdit

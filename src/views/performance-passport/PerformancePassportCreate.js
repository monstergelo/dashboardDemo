import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner, CToast, CToaster, CToastHeader } from '@coreui/react'
import { useForm } from "react-hook-form";
import FormField from 'src/reusable/FormField';
import { useHistory } from 'react-router-dom';
import { useApi } from 'src/api/baseApi';

const PerformancePassportCreate = () => {
  const history = useHistory();
  const { data, post, isLoading } = useApi({url: 'pp'});
  const [toasts, setToasts] = useState([]);
  
  const sendToast = (message, color) => {
    setToasts((prev) => [...prev, {message, color}])
  }
  
  const { handleSubmit, control, reset } = useForm();

  const onSubmit = (formData) => {
    const submitData = {
      ...formData,
    };
    
    post(submitData)
      .then((res) => {
        history.push(`/performance-passports/${res.data.data._id}`)
      })
      .catch((err) => {
        sendToast(err.response ? err.response.data.message : err.message , 'danger')
      });
  };

  useEffect(() => {
    reset(data);
  }, [reset, data]);

  return (
    <>
      <CRow>
        <CCol xl={6}>
          <CCard>
            <CCardHeader>
              New Performance Passport
            </CCardHeader>
            <CCardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  type="text"
                  name="title"
                  label="Title"
                  control={control}
                  isLoading={isLoading}
                />
                
                <FormField
                  type="text"
                  name="version"
                  label="Version"
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
                    color={toast.color}
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

export default PerformancePassportCreate

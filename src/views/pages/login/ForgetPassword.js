import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
  CSpinner,
  CToast,
  CToaster,
  CToastHeader
} from '@coreui/react'
import FormField from 'src/reusable/FormField'
import { useForm } from 'react-hook-form'
import { useApi } from 'src/api/baseApi'
import { useHistory } from 'react-router'

const ForgetPassword = () => {
  const history = useHistory();
  const { handleSubmit, control } = useForm();
  const { post, isLoading } = useApi({
    url: 'forget-password',
    noFetch: true,
  })

  const [toasts, setToasts] = useState([])
  const [done, setDone] = useState(false)

  const sendToast = (message, color) => {
    setToasts((prev) => [...prev, {message, color}])
  }

  const onSubmit = (data) => {
    post(data)
      .then(() => {
        setDone(true)
      })
      .catch((err) => {
        sendToast(err.response ? err.response.data.message : err.message , 'danger')
      })
  }

  const handleGoToLogin = () => {
    history.push('/login')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="4">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <h1>Forget Password</h1>
                    {done && (
                      <span>Please check email to reset password</span>
                    )}

                    {!done && (
                      <>
                        <p className="text-muted">Email</p>
                        <FormField
                          type="text"
                          name="email"
                          control={control}
                          isLoading={isLoading}
                        />
                        <CRow>
                          <CCol xs="8">
                            <CButton color="primary" type="submit" className="px-4">
                              {isLoading && (<CSpinner size="sm" color="secondary" />)}
                              <span>Forget Password</span>
                            </CButton>
                          </CCol>
                        </CRow>
                      </>
                    )}
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={handleGoToLogin} color="link" className="px-0">Login</CButton>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>

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
          </CRow>
        </CContainer>
      </div>
    </form>
  )
}

export default ForgetPassword

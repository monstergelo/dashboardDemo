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

const Login = () => {
  const history = useHistory();
  const { handleSubmit, control } = useForm();
  const { post, isLoading } = useApi({
    url: 'login',
    noFetch: true,
  })

  const [toasts, setToasts] = useState([])

  const sendToast = (message, color) => {
    setToasts((prev) => [...prev, {message, color}])
  }

  const onSubmit = (data) => {
    post(data)
      .then((res) => {
        localStorage.setItem('access_token', res.data.data.access_token);
        history.push('/dashboard')
        history.go('/dashboard')
      })
      .catch((err) => {
        sendToast(err.response ? err.response.data.message : err.message , 'danger')
      })
  }

  const handleForgetPassword = () => {
    history.push('/forget-password')
  }

  // const instaLogin = () => {
  //   onSubmit({
  //     email: 'admin@aa.aa',
  //     password: '123123'
  //   })
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="4">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <FormField
                      type="text"
                      name="email"
                      control={control}
                      isLoading={isLoading}
                    />
                    <FormField
                      type="password"
                      name="password"
                      control={control}
                      isLoading={isLoading}
                    />
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" type="submit" className="px-4">
                          {isLoading && (<CSpinner size="sm" color="secondary" />)}
                          <span>Login</span>
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton onClick={handleForgetPassword} color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                      {/* <CCol xs="6">
                        <CButton onClick={instaLogin} color="primary" type="submit" className="px-4">
                          <span>Insta-Login</span>
                        </CButton>
                      </CCol> */}
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

export default Login

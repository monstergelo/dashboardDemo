import React, { useState, useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormGroup, CModal, CRow, CSpinner, CToast, CToaster, CToastHeader } from '@coreui/react'
import { useForm } from "react-hook-form";
import FormField from 'src/reusable/FormField';
import ProfileChangePasswordModal from './ProfileChangePasswordModal'
import { useApi } from 'src/api/baseApi';

const Profile = ({match}) => {
  const { data, isLoadingData } = useApi({
    url: 'profile'
  });
  const { post, isLoading: isLoadingSubmit } = useApi({
    url: 'change-password',
  })
  const isLoading = isLoadingData || isLoadingSubmit;
  const [toasts, setToasts] = useState([])
  const [open, setOpen] = useState(false);

  const sendToast = (message, color) => {
    setToasts((prev) => [...prev, {message, color}])
  }

  const { handleSubmit, control, reset } = useForm();

  const onSubmit = (formData) => {
    // const submitData = {
    //   ...formData
    // }
    
    // put(submitData)
    //   .then(() => {
    //     sendToast('Success Editing Admin Register', 'success')
    //   })
    //   .catch((err) => {
    //     sendToast(err.response ? err.response.data.message : err.message , 'danger')
    //   });
  };

  const closeConfirm = () => {
    setOpen(false);
  }

  const openConfirm = () => {
    setOpen(true);
  }

  const handleChangePassword = (modalData) => {
    const submitData = {
      ...modalData
    }
    
    post(submitData)
      .then(() => {
        sendToast('Success Editing Password', 'success')
      })
      .catch((err) => {
        sendToast(err.response ? err.response.data.message : err.message , 'danger')
      });
    setOpen(false);
  }

  useEffect(() => {
    if (data) {
      reset({
        ...data,
      });
    } 
  }, [reset, data]);

  return (
    <>
      <CRow>
        <CCol xl={6}>
          <CCard>
            <CCardHeader>
              Profile
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
                  type="text"
                  name="name"
                  label="Name"
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />

                <FormField
                  type="text"
                  name="email"
                  label="Email"
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />

                <FormField
                  type="text"
                  name="status"
                  label="Status"
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />

                <CFormGroup>
                  {isLoading && (<CSpinner size="sm" color="secondary" />)}
                  <CButton onClick={openConfirm} id="form-password" color="info">Change Password</CButton>
                </CFormGroup>

                {/* <CButton color="primary" type="submit">
                  {isLoading && (<CSpinner size="sm" color="secondary" />)}
                  <span>Submit</span>
                </CButton> */}
              </form>
            </CCardBody>
          </CCard>
        </CCol>

        <CModal
          show={open}
          onClose={closeConfirm}
          centered
        >
          <ProfileChangePasswordModal
            onSubmit={handleChangePassword}
          />
        </CModal>

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

export default Profile

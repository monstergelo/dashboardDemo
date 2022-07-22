import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormGroup, CModal, CModalBody, CModalFooter, CModalHeader, CRow, CSpinner, CToast, CToaster, CToastHeader } from '@coreui/react'
import { useForm } from "react-hook-form";
import FormField from 'src/reusable/FormField';
import useAdminRegister from 'src/api/adminRegisterApi';

const AdminRegisterEdit = ({match}) => {
  const id = match.params.id
  const { data, put, isLoading, sendPassword } = useAdminRegister({id});

  const [toasts, setToasts] = useState([])
  const [open, setOpen] = useState(false);

  const sendToast = (message, color) => {
    setToasts((prev) => [...prev, {message, color}])
  }

  const { handleSubmit, control, reset } = useForm();

  const onSubmit = (formData) => {
    const submitData = {
      ...formData,
    }

    if (id) {
      put(submitData)
        .then(() => {
          sendToast('Success Editing Admin Register', 'success')
        })
        .catch((err) => {
          sendToast(err.response ? err.response.data.message : err.message , 'danger')
        });
    }
  };

  const closeConfirm = () => {
    setOpen(false);
  }

  const openConfirm = () => {
    setOpen(true);
  }

  const handleSendPassword = () => {
    if (id) {
      sendPassword()
        .then(() => {
          sendToast('Success Sending Password', 'success')
        })
        .catch((err) => {
          sendToast(err.response ? err.response.data.message : err.message , 'danger')
        });
    }

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
              Admin Register Edit
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
                  label="Admin Name"
                  control={control}
                  isLoading={isLoading}
                />

                <FormField
                  type="select"
                  name="status"
                  label="Status"
                  control={control}
                  isLoading={isLoading}
                  options={[
                    {
                      value: 'system_admin',
                      label: 'system admin',
                    },
                    {
                      value: 'event_producer',
                      label: 'event producer',
                    },
                    {
                      value: 'facilitator',
                      label: 'facilitator',
                    }
                  ]}
                />

                <FormField
                  type="email"
                  name="email"
                  label="Email"
                  control={control}
                  isLoading={isLoading}
                />

                <CFormGroup>
                  <CButton onClick={openConfirm} id="form-password" color="info">Send Password</CButton>
                </CFormGroup>

                <CModal
                  show={open}
                  onClose={closeConfirm}
                >
                  <CModalHeader closeButton>Send</CModalHeader>
                  <CModalBody>
                    Confirm Send Password?
                  </CModalBody>
                  <CModalFooter>
                    <CButton
                      color="primary"
                      onClick={handleSendPassword}
                    >
                      Send
                    </CButton>{' '}
                    <CButton
                      color="secondary"
                      onClick={closeConfirm}
                    >Cancel</CButton>
                  </CModalFooter>
                </CModal>

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

export default AdminRegisterEdit

import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner, CToast, CToaster, CToastHeader } from '@coreui/react'
import { useForm } from "react-hook-form";
import FormField from 'src/reusable/FormField';
import { useHistory } from 'react-router-dom';
import useCompany from 'src/api/companyApi';
import moment from 'moment';

const CompanyCreate = () => {
  const history = useHistory();
  const { data: user, post, isLoading } = useCompany({});
  const [toasts, setToasts] = useState([])
  
  const sendToast = (message, color) => {
    setToasts((prev) => [...prev, {message, color}])
  }

  const { handleSubmit, control, reset } = useForm();

  const onSubmit = (formData) => {
    const submitData = {
      ...formData,
      relevant_contract_date: moment(formData.relevant_contract_date).format('DD-MM-YYYY').toString(),
    };

    post(submitData)
      .then((res) => {
        console.log(res)
        history.push(`/companies/${res.data.data._id}`)
      })
      .catch((err) => {
        sendToast(err.response ? err.response.data.message : err.message , 'danger')
      });
  };

  useEffect(() => {
    reset(user);
  }, [reset, user]);

  return (
    <>
      <CRow>
        <CCol xl={6}>
          <CCard>
            <CCardHeader>
              New Company
            </CCardHeader>
            <CCardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  type="text"
                  name="code"
                  label="Code"
                  control={control}
                  isLoading={isLoading}
                />

                <FormField
                  type="text"
                  name="name"
                  label="Company Name"
                  control={control}
                  isLoading={isLoading}
                />

                <FormField
                  type="text"
                  name="address"
                  label="Address"
                  control={control}
                  isLoading={isLoading}
                />

                <FormField
                  type="date"
                  name="relevant_contract_date"
                  label="Contract Date"
                  control={control}
                  isLoading={isLoading}
                />

                <FormField
                  type="text"
                  name="contact_person"
                  label="Contact Person"
                  control={control}
                  isLoading={isLoading}
                />

                <FormField
                  type="email"
                  name="email"
                  label="Email"
                  control={control}
                  isLoading={isLoading}
                />

                <FormField
                  type="text"
                  name="phone_number"
                  label="Phone Number"
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

export default CompanyCreate

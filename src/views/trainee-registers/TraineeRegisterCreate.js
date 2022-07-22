import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner, CToast, CToaster, CToastHeader } from '@coreui/react'
import { useForm } from "react-hook-form";
import FormField from 'src/reusable/FormField';
import { useHistory } from 'react-router-dom';
import useTraineeRegister from 'src/api/traineeRegisterApi';
import { useApi } from 'src/api/baseApi';

const TraineeRegisterCreate = () => {
  const history = useHistory();
  const { data: user, post, isLoading } = useTraineeRegister({});
  const { getOption } = useApi({url: 'company'});

  const [toasts, setToasts] = useState([]);

  const sendToast = (message, color) => {
    setToasts((prev) => [...prev, {message, color}])
  }
  
  const { handleSubmit, control, reset } = useForm();

  const onSubmit = (formData) => {
    const submitData = {
      ...formData,
      company_id: formData.company._id
    }
    
    post(submitData)
      .then((res) => {
        history.push(`/trainee-registers/${res.data.data._id}`)
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
              New Trainee Register
            </CCardHeader>
            <CCardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  type="text"
                  name="name"
                  label="Trainee Name"
                  control={control}
                  isLoading={isLoading}
                />

                <FormField
                  type="text"
                  name="position"
                  label="Trainee Position"
                  control={control}
                  isLoading={isLoading}
                />

                <FormField
                  type="text"
                  name="department"
                  label="Department"
                  control={control}
                  isLoading={isLoading}
                />

                <FormField
                  type="async-select"
                  name="company"
                  label="Company"
                  control={control}
                  isLoading={isLoading}
                  selectCallback={getOption}
                  getOptionLabel={(option) => (option.name)}
                  getOptionValue={(option) => (option)}
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

                {/* <FormField
                  type="select"
                  name="status"
                  label="Status"
                  control={control}
                  isLoading={isLoading}
                  defaultValue="individual"
                  options={[
                    {
                      value: 'leader',
                      label: 'leader',
                    },
                    {
                      value: 'individual',
                      label: 'individual',
                    }
                  ]}
                /> */}

                <FormField
                  type="text"
                  name="password"
                  label="password"
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

export default TraineeRegisterCreate

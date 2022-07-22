import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormGroup, CLabel, CModal, CModalBody, CRow, CSelect, CSpinner, CToast, CToaster, CToastHeader } from '@coreui/react'
import { useFieldArray, useForm } from "react-hook-form";
import FormField from 'src/reusable/FormField';
import { useHistory } from 'react-router-dom';
import { useApi } from 'src/api/baseApi';
import { IoAdd, IoTrash } from 'react-icons/io5';
import DraggableList, { DraggableCardItem } from 'src/reusable/DraggableList';
import TrainerCreate from './trainer/TrainerCreate';
import useUploadApi from 'src/api/uploadApi';

const TrainingCreate = () => {
  const history = useHistory();
  const { data, post, isLoading } = useApi({
    url: 'training',
  });
  const uploadRepo = useUploadApi()
  const { getOption: getOptionTrainer } = useApi({
    url: 'admin'
  });

  const [toasts, setToasts] = useState([])
  const [openTrainerCreate, setOpenTrainerCreate] = useState(false);

  const { handleSubmit, control, reset } = useForm();
  const { fields: trainerFields, move, remove, append } = useFieldArray({control, name: 'trainer'});

  const sendToast = (message, color) => {
    setToasts((prev) => [...prev, {message, color}])
  }

  const onSubmit = (data) => {
    const submitData = {
      ...data,
      trainer: data.trainer ? data.trainer.map((item) => (item._id)) : [],
    }

    post(submitData)
      .then((res) => {
        history.push(`/trainings/${res.data.data._id}`)
      })
      .catch((err) => {
        sendToast(err.response ? err.response.data.message : err.message , 'danger')
      });
  };

  const handleUpload = (file) => {
    return uploadRepo.upload(file);
  }

  const handleTrainerDelete = (index) => {
    remove(index)
  }

  const onTrainerCreateSubmit = (data) => {
    append(data.trainer)
  }

  const onDrop = (result) => {
    const indexA = result.source.index
    const indexB = result.destination.index

    if (indexA !== indexB) {
      move(indexA, indexB);
    }
  }

  useEffect(() => {
    reset(data);
  }, [reset, data]);

  return (
    <>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <CRow xs={3}>
                <CCol>
                  <h3>New Training</h3>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <form id="training-form" onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  type="text"
                  name="name"
                  label="Name"
                  control={control}
                  isLoading={isLoading}
                />

                <FormField
                  type="text"
                  name="event_code"
                  label="Event Code"
                  control={control}
                  isLoading={isLoading}
                />

                <FormField
                  type="text"
                  name="batch"
                  label="Batch"
                  control={control}
                  isLoading={isLoading}
                />

                <FormField
                  type="select"
                  name="default_lang"
                  label="Default Language"
                  control={control}
                  isLoading={isLoading}
                  defaultValue="ina"
                  options={[
                    {
                      value: 'ina',
                      label: 'ina',
                    },
                    {
                      value: 'eng',
                      label: 'eng',
                    },
                  ]}
                />

                <FormField
                  type="imageurl"
                  name="logo"
                  label="Logo"
                  control={control}
                  isLoading={isLoading}
                  upload={handleUpload}
                />

                {trainerFields && trainerFields.map((field, index) => (
                  <FormField
                    type="empty"
                    name={`trainer[${index}]._id`}
                    defaultValue={field._id}
                    control={control}
                    readOnly
                  />
                ))}

              </form>

              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol>
                      <h3>Trainer</h3>
                    </CCol>
                    <CCol>
                      <CButton
                        size="lg"
                        className="float-right"
                        onClick={() => { setOpenTrainerCreate(true); }}
                      >
                        <IoAdd />
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <DraggableList id="blockList" onDrop={onDrop}>
                    {trainerFields && trainerFields.map((field, index) => (
                      <DraggableCardItem
                        id={field.id}
                        index={index}
                        key={field.id}
                      >
                        <CRow>
                          <CCol>
                            {field.name}
                          </CCol>
                          <CCol>
                            <CButton
                              size="sm"
                              onClick={() => { handleTrainerDelete(index); }}
                              className="float-right"
                            >
                              <IoTrash />
                            </CButton>
                          </CCol>
                        </CRow>
                      </DraggableCardItem>
                    ))}
                  </DraggableList>
                </CCardBody>
              </CCard>

              <CModal centered show={openTrainerCreate} onClose={() => { setOpenTrainerCreate(false); }}>
                <CModalBody>
                  <TrainerCreate
                    onSubmit={onTrainerCreateSubmit}
                    getOption={getOptionTrainer}
                    isLoading={isLoading}
                  />
                </CModalBody>
              </CModal>

              <CButton color="primary" type="submit" form="training-form">
                {isLoading && (<CSpinner size="sm" color="secondary" />)}
                <span>Submit</span>
              </CButton>
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

export default TrainingCreate

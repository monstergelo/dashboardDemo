import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormGroup, CModal, CModalBody, CModalFooter, CModalHeader, CRow, CSpinner, CToast, CToaster, CToastHeader } from '@coreui/react'
import { useFieldArray, useForm } from "react-hook-form";
import moment from 'moment'
import FormField from 'src/reusable/FormField';
import { baseApiConfig, useApi } from 'src/api/baseApi';
import DataTableCard from 'src/reusable/DataTableCard';
import ScheduleCreate from './schedule/ScheduleCreate';
import ScheduleEdit from './schedule/ScheduleEdit';
import ParticipantCreate from './participant/ParticipantCreate';
import ParticipantEdit from './participant/ParticipantEdit';
import DraggableList, { DraggableCardItem } from 'src/reusable/DraggableList';
import { IoAdd, IoTrash } from 'react-icons/io5';
import TrainerCreate from './trainer/TrainerCreate';
import useTraining from 'src/api/trainingApi';
import useUploadApi from 'src/api/uploadApi';
import { useHistory } from 'react-router';
import axios from 'axios';

const TrainingEdit = ({match}) => {
  //states/props-----------------------------------------------------------------------
  const id = match.params.id
  const history = useHistory();
  const [toasts, setToasts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [pageSchedule, setPageSchedule] = useState(1);
  const [pageParticipant, setPageParticipant] = useState(1);
  const [openScheduleCreate, setOpenScheduleCreate] = useState(false);
  const [openScheduleEdit, setOpenScheduleEdit] = useState(null);
  const [openParticipantEdit, setOpenParticipantEdit] = useState(null);
  const [openParticipantCreate, setOpenParticipantCreate] = useState(false);
  const [openTrainerCreate, setOpenTrainerCreate] = useState(false);
  const [isLoadingExport, setIsLoadingExport] = useState(false);
  
  const { data, put, isLoading: isLoadingTraining, fetch, sendPassword } = useTraining({id});
  const repoSchedule = useApi({
    url: `training/${id}/schedule`,
    id: openScheduleEdit ? openScheduleEdit._id : null,
  });
  const repoParticipant = useApi({
    url: `training/${id}/participant`,
    id: openParticipantEdit ? openParticipantEdit._id : null,
  });
  const { getOption: getOptionTrainee } = useApi({
    url: 'trainee'
  });
  const { getOption: getOptionTrainer } = useApi({
    url: 'admin'
  });
  const { getOption: getOptionPP } = useApi({
    url: 'pp'
  });
  const uploadRepo = useUploadApi()
  const { handleSubmit, control, reset } = useForm();
  const { fields: trainerFields, move, append, remove } = useFieldArray({control, name: 'trainer'});
  const isLoading = isLoadingTraining || repoParticipant.isLoading || repoSchedule.isLoading || isLoadingExport;

  const sendToast = (message, color) => {
    setToasts((prev) => [...prev, {message, color}])
  }

  //form functions-----------------------------------------------------------------------
  const onSubmit = (data) => {
    const submitData = {
      ...data,
      trainer: data.trainer ? data.trainer.map((item) => (item._id)) : [],
      performance_passport_id: data.performance_passport ? data.performance_passport._id : data.performance_passport,
    }

    if (id) {
      put(submitData)
        .then(() => {
          sendToast('Success Editing Training', 'success')
          fetch();
        })
        .catch((err) => {
          sendToast(err.response ? err.response.data.message : err.message , 'danger')
        });
    }
  };

  const onParticipantCreateSubmit = (formData) => {
    const submittedData = {
      ...formData,
      trainee_id_to_add: formData.trainee_id_to_add._id
    }

    repoParticipant.post(submittedData)
      .then((res) => {
        sendToast('Success Adding Participant', 'success')
        fetch();
      })
      .catch((err) => {
        sendToast(err.response ? err.response.data.message : err.message , 'danger')
        fetch();
      });
  }

  const onParticipantEditSubmit = (formData) => {
    const submittedData = {
      ...formData,
    }

    repoParticipant.put(submittedData)
      .then((res) => {
        sendToast('Success Editing Participant', 'success')
        fetch();
      })
      .catch((err) => {
        sendToast(err.response ? err.response.data.message : err.message , 'danger')
        fetch();
      });
  }

  const onScheduleCreateSubmit = (formData) => {
    const submittedData = {
      ...formData,
    }

    repoSchedule.post(submittedData)
      .then((res) => {
        sendToast('Success Adding Schedule', 'success')
        fetch();
      });
  }

  const onScheduleEditSubmit = (formData) => {
    const submittedData = {
      ...formData,
    }

    repoSchedule.put(submittedData)
      .then((res) => {
        sendToast('Success Editing Schedule', 'success')
        fetch();
      });
  }

  const pageChangeSchedule = newPage => {
    setPageSchedule(newPage)
  }

  const handleDeleteSchedule = (item) => {
    repoSchedule.remove(item._id)
      .then(() => {
        sendToast('Success Removing Schedule', 'success')
        fetch();
      })
  }

  const pageChangeParticipant = newPage => {
    setPageParticipant(newPage)
  }

  const handleDeleteParticipant = (item) => {
    repoParticipant.remove(item._id)
      .then(() => {
        sendToast('Success Removing Participant', 'success')
        fetch();
      })
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

  const closeConfirm = () => {
    setOpenModal(false);
  }

  const openConfirm = () => {
    setOpenModal(true);
  }

  const handleUpload = (file) => {
    return uploadRepo.upload(file);
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

    setOpenModal(false);
  }

  const handleAnswerClick = (traineeId) => () =>
  {
    history.push(`/trainings/${id}/answer/${traineeId}/${data.performance_passport._id}`)
  }

  const handleExcelClick = (training_id) =>
  {
    setIsLoadingExport(true);
    const url = `/training-answers/xlsx/${training_id}`
    const api = axios.create(baseApiConfig);
    api.get(url)
    .then( (response) => {
      console.log('response: ', response);
      const { data: {data: url} } = response;
      console.log(url)
      window.open(url).focus();
    })
    .catch( (error) => {
      console.log(error);
    })
    .then(() => {
      setIsLoadingExport(false);
    })
  }

  const handlePDFClick = (training_id, participant_id) =>
  {
    setIsLoadingExport(true);
    const url = `/training-answers/pdf/${training_id}/${participant_id}`
    const api = axios.create(baseApiConfig);
    api.get(url)
    .then( (response) => {
      const { data: {data: url} } = response;
      console.log(url)
      window.open(url).focus();
    })
    .catch( (error) => {
      console.log(error);
    })
    .then(() => {
      setIsLoadingExport(false);
    })
  }

  const handleSendOnePassword = (training_id, participant_id) =>
  {
    setIsLoadingExport(true);
    const url = `/training/${training_id}/send-password/${participant_id}`
    const api = axios.create(baseApiConfig);
    api.post(url)
    .then( (response) => {
      const { data: {data: url} } = response;
      console.log(url)
    })
    .catch( (error) => {
      console.log(error);
    })
    .then(() => {
      setIsLoadingExport(false);
    })
  }

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        participants: data.participants.map((item) => ({
          ...item,
          name: item.trainee.name
        }))
      });
    } 
  }, [reset, data]);

  //render----------------------------------------------------------------------------------------
  return (
    <>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <CRow xs={3}>
                <CCol>
                  <h3>Training Edit</h3>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <form id="training-form" onSubmit={handleSubmit(onSubmit)}>
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
                  type="async-select"
                  name="performance_passport"
                  label="Performance Passport"
                  control={control}
                  isLoading={isLoading}
                  loadOptions={getOptionPP}
                  getOptionLabel={(option) => (option.title)}
                  getOptionValue={(option) => (option)}
                />

                <FormField
                  type="select"
                  name="default_lang"
                  label="Default Language"
                  control={control}
                  isLoading={isLoading}
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

                <CModal
                  show={openModal}
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

              <CFormGroup>
                <CButton onClick={openConfirm} id="form-password" color="info">Send Password</CButton>
              </CFormGroup>

              <CFormGroup>
                <CButton color="primary" type="submit" form="training-form">
                  {isLoading && (<CSpinner size="sm" color="secondary" />)}
                  <span>Submit</span>
                </CButton>
              </CFormGroup>
            </CCardBody>
          </CCard>
          
          <CCard>
            <CCardBody>
              <CModal centered show={openTrainerCreate} onClose={() => { setOpenTrainerCreate(false); }}>
                <CModalBody>
                  <TrainerCreate
                    onSubmit={onTrainerCreateSubmit}
                    getOption={getOptionTrainer}
                    isLoading={isLoading}
                  />
                </CModalBody>
              </CModal>

              <CFormGroup>
                <CButton onClick={() => handleExcelClick(id)} id="form-password" color="info">Get Excel Summary</CButton>
              </CFormGroup>
              <DataTableCard 
                title="Participants"
                fields={[
                  { key: '_id', _classes: 'font-weight-bold' },
                  'name', 'status', 'answer', 'export_pdf', 'send_password'
                ]}
                scopedSlots={{
                  'name': (item) => (
                    <td>
                      {item.trainee.name}
                    </td>
                  ),
                  'answer': (item) => (
                    <td>
                      {item && item.training_answer && (
                        <CButton
                          color="info"
                          onClick={handleAnswerClick(item && item.training_answer ? item.training_answer._id : null)}
                        >
                          Answer
                        </CButton>
                      )}
                    </td>
                  ),
                  'export_pdf': (item) => (
                    <td>
                      {item && item.trainee && (
                        <CButton
                          color="info"
                          onClick={() => {
                            handlePDFClick(id, item._id)
                          }
                        }
                        >
                          Export PDF
                        </CButton>
                      )}
                    </td>
                  ),
                  'send_password': (item) => (
                    <td>
                      {item && item.trainee && (
                        <CButton
                          color="info"
                          onClick={() => {
                            handleSendOnePassword(id, item._id)
                          }
                        }
                        >
                          Send Passowrd
                        </CButton>
                      )}
                    </td>
                  )
                }}
                data={data ? data.participants : []}
                isLoading={isLoading}
                onAddClick={() => { setOpenParticipantCreate(true); }}
                page={pageParticipant}
                pageSize={5}
                onPageChange={pageChangeParticipant}
                onRowDeleteClick={handleDeleteParticipant}
                onRowEditClick={(item) => {
                  setOpenParticipantEdit(item);
                }}
              />

              <CModal centered show={openParticipantCreate} onClose={() => { setOpenParticipantCreate(false); }}>
                <CModalBody>
                  <ParticipantCreate
                    onSubmit={onParticipantCreateSubmit}
                    getOption={getOptionTrainee}
                    isLoading={repoParticipant.isLoading}
                  />
                </CModalBody>
              </CModal>

              <CModal centered show={openParticipantEdit} onClose={() => { setOpenParticipantEdit(false); }}>
                <CModalBody>
                  <ParticipantEdit
                    data={openParticipantEdit}
                    onSubmit={onParticipantEditSubmit}
                    isLoading={repoParticipant.isLoading}
                  />
                </CModalBody>
              </CModal>

              <DataTableCard 
                title="Schedules"
                fields={[
                  { key: '_id', _classes: 'font-weight-bold' },
                  'program', 'date',
                ]}
                scopedSlots={{
                  'date': (item) => (
                    <td>
                      {moment(item.date).format("DD MMM YYYY (HH:mm)")}
                    </td>
                  )
                }}
                data={data ? data.schedules : []}
                isLoading={isLoading}
                onAddClick={() => { setOpenScheduleCreate(true); }}
                onRowEditClick={(item) => {
                  setOpenScheduleEdit(item);
                }}
                page={pageSchedule}
                pageSize={5}
                onPageChange={pageChangeSchedule}
                onRowDeleteClick={handleDeleteSchedule}
              />

              <CModal centered show={openScheduleCreate} onClose={() => { setOpenScheduleCreate(false); }}>
                <CModalBody>
                  <ScheduleCreate
                    onSubmit={onScheduleCreateSubmit}
                    isLoading={isLoading}
                  />
                </CModalBody>
              </CModal>

              <CModal centered show={openScheduleEdit} onClose={() => { setOpenScheduleEdit(null); }}>
                <CModalBody>
                  <ScheduleEdit
                    data={openScheduleEdit}
                    onSubmit={onScheduleEditSubmit}
                    isLoading={isLoading}
                  />
                </CModalBody>
              </CModal>
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

export default TrainingEdit

import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner, CToast, CToaster, CToastHeader } from '@coreui/react'
import { useFieldArray, useForm } from "react-hook-form";
import FormField from 'src/reusable/FormField';
import { useApi } from 'src/api/baseApi';
import DraggableList, { DraggableCardItem } from 'src/reusable/DraggableList';
import { IoAdd, IoPencil, IoTrash } from 'react-icons/io5';
import { useHistory } from 'react-router';

const PerformancePassportEdit = ({match}) => {
  const id = match.params.id;
  const history = useHistory();
  const {data: loginData} = useApi({ url: 'profile'});
  const status = loginData ? loginData.status : null;
  const { data, put, isLoading } = useApi({url: 'pp', id});
  const [toasts, setToasts] = useState([])

  const sendToast = (message, color) => {
    setToasts((prev) => [...prev, {message, color}])
  }

  const submitAllowed = status === 'system_admin' || status === 'event_producer';
  const addAllowed = status === 'system_admin' || status === 'event_producer';
  const deleteAllowed = status === 'system_admin' || status === 'event_producer';

  const { handleSubmit, control, reset } = useForm();
  const { fields: pageFields, move, remove } = useFieldArray({control, name: 'pages'});

  const onSubmit = (formData) => {
    const submitData = {
      ...formData,
      pages: formData.pages.map((item) => (item._id)),
    };

    if (id && submitAllowed) {
      put(submitData)
        .then(() => {
          sendToast('Success Editing Performance Passport Register', 'success')
        })
        .catch((err) => {
          sendToast(err.response ? err.response.data.message : err.message , 'danger')
        });
    }
  };

  const handlePageEdit = (item) => {
    history.push(`/performance-passports/${id}/page/${item._id}`);
  }

  const handlePageDelete = (index) => {
    remove(index);
  }

  const onDrop = (result) => {
    const indexA = result.source.index
    const indexB = result.destination.index

    if (indexA !== indexB) {
      move(indexA, indexB);
    }
  }

  const handleAddPP = () => {
    if (addAllowed) {
      history.push(`/performance-passports/${id}/page/create`);
    }
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
              Performance Passport Edit
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

                <CCard>
                  <CCardHeader>
                    <CRow>
                      <CCol>
                        <h3>Pages</h3>
                      </CCol>
                      <CCol>
                        {addAllowed && (
                          <CButton
                            size="lg"
                            className="float-right"
                            onClick={handleAddPP}
                          >
                            <IoAdd />
                          </CButton>
                        )}
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <DraggableList id="blockList" onDrop={onDrop}>
                      {pageFields && pageFields.map((field, index) => (
                        <DraggableCardItem
                          id={field.id}
                          index={index}
                          key={field.id}
                        >
                          <CRow>
                            <CCol>
                              {field.title.ina}
                            </CCol>
                            <CCol>
                              {deleteAllowed && (
                                <CButton
                                  size="sm"
                                  onClick={() => { handlePageDelete(index); }}
                                  className="float-right"
                                >
                                  <IoTrash />
                                </CButton>
                              )}
                              <CButton
                                size="sm"
                                onClick={() => { handlePageEdit(field); }}
                                className="float-right"
                              >
                                <IoPencil />
                              </CButton>
                              <FormField
                                type="empty"
                                name={`pages[${index}]._id`}
                                defaultValue={field._id}
                                control={control}
                                readOnly
                              />
                            </CCol>
                          </CRow>
                        </DraggableCardItem>
                      ))}
                    </DraggableList>
                  </CCardBody>
                </CCard>
                
                {submitAllowed && (
                  <CButton color="primary" type="submit">
                    {isLoading && (<CSpinner size="sm" color="secondary" />)}
                    <span>Submit</span>
                  </CButton>
                )}
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

export default PerformancePassportEdit

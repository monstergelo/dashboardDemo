import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner, CToast, CToaster, CToastHeader } from '@coreui/react'
import { useFieldArray, useForm } from "react-hook-form";
import FormField from 'src/reusable/FormField';
import { useApi } from 'src/api/baseApi';
import DraggableList, { DraggableCardItem } from 'src/reusable/DraggableList';
import { IoPencil } from 'react-icons/io5';
import { useHistory } from 'react-router';

const AnswerPageList = ({match}) => {
  const { id, traineeid, ppid } = match.params;
  const history = useHistory();

  const { data } = useApi({url: 'pp', id: ppid});
  const [toasts] = useState([])

  const { control, reset } = useForm();
  const { fields: pageFields, move } = useFieldArray({control, name: 'pages'});

  const handlePageEdit = (item) => {
    history.push(`/trainings/${id}/answer/${traineeid}/${ppid}/page/${item._id}`);
  }

  const onDrop = (result) => {
    const indexA = result.source.index
    const indexB = result.destination.index

    if (indexA !== indexB) {
      move(indexA, indexB);
    }
  }

  useEffect(() => {
    // if (data) {
    //   reset({
    //     ...data,
    //   });
    // } 
  }, [reset, data]);

  return (
    <>
      <CRow>
        <CCol xl={6}>
          <CCard>
            <CCardHeader>
              Answer
            </CCardHeader>
            <CCardBody>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol>
                      <h3>Pages</h3>
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

export default AnswerPageList

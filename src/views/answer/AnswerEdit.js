import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormGroup, CLabel, CRow, CSelect, CSpinner, CToast, CToaster, CToastHeader } from '@coreui/react'
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import DraggableList from 'src/reusable/DraggableList';
import { useApi } from 'src/api/baseApi';
import AnswerBlockItem from './AnswerBlockItem'

const langOptionList = [
  'ina',
  'eng',
] 

const combineAnswer = (data, answerData) => {
  const answerBlocks = answerData.answer_blocks;
  const compositeBlock = data.blocks.map((item) => {
    const { request_id, sub_type } = item;
    const answer = answerBlocks.find((obj) => (
      (obj.request_id === request_id)
      && (obj.sub_type === sub_type)
    ))

    return {
      ...item,
      answer: answer ? answer.value : null
    }
  });

  return compositeBlock
}

const AnswerEdit = ({match}) => {
  const {id, ppid, traineeid, pageid} = match.params

  const { data: answerData, put, isLoading: isLoadingAnswer } = useApi({
    url: `training-answers/${id}`,
    id: traineeid,
  });

  const { data, isLoading: isLoadingData } = useApi({
    url: `pp/${ppid}/page`,
    id: pageid,
  });

  const [toasts, setToasts] = useState([])
  const langOptions = langOptionList;
  const [selectedLang, setSelectedLang] = useState(null);
  const [blockLang, setBlockLang] = useState([]);

  const sendToast = (message, type) => {
    setToasts((prev) => [...prev, {message, type}])
  }

  const methods = useForm();
  const { handleSubmit, control, reset, } = methods;
  const { fields: blockFields, move } = useFieldArray({control, name: 'blocks'});

  const onSubmit = (formData) => {
    const formAnswerBlocks = formData.blocks.reduce((blocks, curr) => {
      if (curr.value && curr.request_id) {
        return [...blocks, curr];
      }

      return [...blocks]
    }, []);

    const oldAnswerBlocks = [...answerData.answer_blocks];

    formAnswerBlocks.forEach((curr) => {
      const rmindex = oldAnswerBlocks.findIndex((item) => (item.request_id === curr.request_id))
      if (rmindex >= 0) {
        oldAnswerBlocks.splice(rmindex, 1)
      }
    })

    const newAnswerBlocks = [...oldAnswerBlocks, ...formAnswerBlocks];

    const submitData = {
      trainee_id: traineeid,
      answer_blocks: newAnswerBlocks
    }


    if (id && traineeid) {
      put(submitData)
        .then(() => {
          sendToast('Success Editing Answer Block', 'success')
        })
        .catch((err) => {
          sendToast(err.response ? err.response.data.message : err.message , 'danger')
        });
    }
  };

  const onDrop = (result) => {
    const indexA = result.source.index
    const indexB = result.destination.index

    if (indexA !== indexB) {
      move(indexA, indexB);
    }
  }

  const handleBlockLangChange = (index) => (newLang) => {
    setBlockLang((prev) => {
      const newArr = [...prev];
      newArr[index] = newLang;

      return newArr;
    })
  }

  const handleChangeAllBlockLang = (newLang) => {
    setSelectedLang(newLang)

    if (blockFields) {
      setBlockLang(Array(blockFields.length).fill(newLang))
    }
  }

  useEffect(() => {
    if (data && answerData) {
      const compositeBlock = combineAnswer(data, answerData);

      reset({
        ...data,
        blocks: compositeBlock,
      });
    } 
  }, [reset, data, answerData]);

  return (
    <>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <CRow xs={3}>
                <CCol>
                  <span>Answer</span>
                </CCol>
                <CCol xs={3}>
                  <CFormGroup row>
                    <CLabel col md={4}>Language:</CLabel>
                    <CCol md={8}>
                      <CSelect onChange={(e) => { handleChangeAllBlockLang(e.target.value); }}>
                        {langOptions && langOptions.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <FormProvider {...methods} >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <CLabel>Answer Blocks</CLabel>
                  <CCard>
                    <CCardBody>
                      <DraggableList id="blockList" onDrop={onDrop}>
                        {blockFields && blockFields.map((block, index) => (
                          <AnswerBlockItem
                            key={block.id}
                            block={block}
                            index={index}
                            control={control}
                            isLoading={isLoadingData || isLoadingAnswer}
                            langOptions={langOptions}
                            lang={blockLang[index] || langOptions[0]}
                            onLangChange={handleBlockLangChange(index)}
                          />
                        ))}
                      </DraggableList>
                    </CCardBody>
                  </CCard>
                  
                  <CButton color="primary" type="submit">
                    {(isLoadingData  || isLoadingAnswer) && (<CSpinner size="sm" color="secondary" />)}
                    <span>Submit</span>
                  </CButton>
                </form>
              </FormProvider>
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
                    color={toast.type}
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

export default AnswerEdit

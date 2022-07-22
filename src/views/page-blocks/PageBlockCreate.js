import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CFormGroup, CInputGroup, CInputGroupAppend, CLabel, CRow, CSelect, CSpinner, CToast, CToaster, CToastHeader } from '@coreui/react'
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import FormField from 'src/reusable/FormField';
import { useHistory } from 'react-router-dom';
import { IoAdd } from 'react-icons/io5';
import DraggableList from 'src/reusable/DraggableList';
import PageBlockItem from './component/PageBlockItem';
import blockOptionList from './component/BlockOptionList'
import { useApi } from 'src/api/baseApi';
import useUploadApi from 'src/api/uploadApi';

const getRmIds = (blocks) => {
  if (blocks) {
    const rmBlocks = blocks.filter((item) => (item.sub_type === 'rm_5_point_rating'));
    return rmBlocks.map((item) => ({
      value: item.request_id,
      label: item.request_id,
    }))
  }
}

const langOptionList = [
  'ina',
  'eng',
] 

const PageBlockCreate = ({match}) => {
  const {id} = match.params
  const history = useHistory();
  const [blockOption, setBlockOption] = useState(0);
  const { data, post, isLoading: isLoadingData } = useApi({
    url: `pp/${id}/page`,
  });

  const { data: ppData } = useApi({
    url: `pp`,
    id: id
  });

  const uploadRepo = useUploadApi()

  const [isLoading, setIsLoading] = useState(false);
  const langOptions = langOptionList;
  const [selectedLang, setSelectedLang] = useState('ina');
  const [blockLang, setBlockLang] = useState([]);

  const [toasts, setToasts] = useState([])

  const sendToast = (message, type) => {
    setToasts((prev) => [...prev, {message, type}])
  }

  const methods = useForm();
  const { handleSubmit, control, reset, watch } = methods;
  const { fields: blockFields, append, move, remove } = useFieldArray({control, name: 'blocks'});

  const rmIds = getRmIds(watch().blocks);

  const onSubmit = (formData) => {
    const submitData = {
      ...formData
    };

    console.log(submitData)

    langOptions.forEach((lang) => {
      if (!submitData.title[lang]) submitData.title[lang] = '-'
    })

    post(submitData)
      .then((res) => {
        history.push(`/performance-passports/${id}/page/${res.data.data._id}`)
      })
      .catch((err) => {
        console.log(JSON.stringify(err.response))
        sendToast(err.response ? err.response.data.message : err.message , 'danger')
        getRmIds();
      });
  };

  const onDrop = (result) => {
    const indexA = result.source.index
    const indexB = result.destination.index

    if (indexA !== indexB) {
      move(indexA, indexB);
    }
  }

  const handleAdd = () => {
    const selected = blockOptionList[blockOption]
    append({
      type: selected.value,
      sub_type: selected.subvalue,
      text: {
        ina: "",
        eng: "",
      },
      data: '',
    })
  }

  const handleDelete = (index) => {
    remove(index)
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

  const handleUpload = (file) => {
    return uploadRepo.upload(file);
  }

  useEffect(() => {
    reset(data);
  }, [reset, data]);

  useEffect(() => {
    setIsLoading(isLoadingData || uploadRepo.isLoading);
  }, [isLoadingData, uploadRepo.isLoading]);

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              <CRow xs={3}>
                <CCol>
                  <span>New Page Block</span>
                </CCol>
                <CCol xs={3}>
                  <CFormGroup row>
                    <CLabel col md={4}>Language:</CLabel>
                    <CCol md={8}>
                      <CSelect onChange={(e) => { handleChangeAllBlockLang(e.target.value); }}>
                        {langOptions && langOptions.map((item) => (
                          <>
                            <option key={item} value={item}>{item}</option>
                          </>
                        ))}
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <FormProvider {...methods} rmIds={rmIds}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {langOptions && langOptions.map((langOption) => (
                    <FormField
                      type={selectedLang === langOption ? "text" : "empty"}
                      name={`title.${langOption}`}
                      label={`Title`}
                      control={control}
                      isLoading={isLoading}
                      defaultValue=""
                    />
                  ))}
                  
                  {langOptions && langOptions.map((langOption) => (
                    <FormField
                      type={selectedLang === langOption ? "text" : "empty"}
                      name={`menu_title.${langOption}`}
                      label={`Menu Title`}
                      control={control}
                      isLoading={isLoading}
                      defaultValue=""
                    />
                  ))}

                  <FormField
                    type="select"
                    name="type"
                    label="Type"
                    control={control}
                    isLoading={isLoading}
                    options={[{value:'worksheet', label: 'Worksheet'}, {value:'menu', label: 'Menu'}]}
                  />

                  <FormField
                    type="boolean"
                    name="is_displayed_on_nav"
                    label="Displayed On Navigation Bar?"
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

                  <FormField
                    type="text"
                    name="tag"
                    label="Tag"
                    control={control}
                    isLoading={isLoading}
                  />

                  <CLabel>Blocks</CLabel>
                  <CCard>
                    <CCardBody>
                      <DraggableList id="blockList" onDrop={onDrop}>
                        {blockFields && blockFields.map((block, index) => (
                          <PageBlockItem
                            key={block.id}
                            block={block}
                            index={index}
                            control={control}
                            isLoading={isLoading}
                            onDelete={handleDelete}
                            langOptions={langOptions}
                            lang={blockLang[index] || langOptions[0]}
                            onLangChange={handleBlockLangChange(index)}
                            upload={handleUpload}
                            optionData={ppData.pages.map(x => {return {value: x._id, label: x.title.ina}})}
                          />
                        ))}
                      </DraggableList>
                    </CCardBody>
                    <CCardFooter>
                      <CRow>
                        <CCol xs="6" lg="3">
                          <CInputGroup>
                            <CSelect
                              disabled={isLoading}
                              value={blockOption}
                              onChange={(e) => { setBlockOption(e.target.value); }}
                            >
                              {blockOptionList.map((option, index) => (
                                <option
                                  key={option.subvalue || option.value}
                                  value={index}>{option.label || option.value}
                                </option>
                              ))}
                            </CSelect>
                            <CInputGroupAppend>
                              <CButton
                                onClick={handleAdd}
                                color="secondary"
                              >
                                <IoAdd />
                              </CButton>
                            </CInputGroupAppend>
                          </CInputGroup>    
                        </CCol>
                      </CRow>
                    </CCardFooter>
                  </CCard>

                  <CButton color="primary" type="submit">
                    {isLoading && (<CSpinner size="sm" color="secondary" />)}
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

export default PageBlockCreate

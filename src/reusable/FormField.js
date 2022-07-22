import React, { useRef, useState }  from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { CButton, CButtonClose, CCol, CFormGroup, CInput, CInputCheckbox, CInputFile, CInputGroup, CInputGroupAppend, CLabel, CRow, CSelect, CTextarea } from '@coreui/react';
import AsyncSelect from 'react-select/async';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

const defaultProps = {
  label: undefined,
  isLoading: false,
  options: [],
  timeout: 1000,
  selectCallback: (inputValue) => { console.log(inputValue); },
}

const getYoutubeId = (youtubeString) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = youtubeString.match(regExp);
    return (match&&match[7].length === 11)? match[7] : youtubeString;
}

const FormField = props => {
  const {
    type,
    control,
    name,
    label,
    isLoading,
    options,
    dense,
    defaultValue,
    timeout,
    selectCallback,
    upload,
    ...rest
  } = props;

  const [temporary, setTemporary] = useState(null);
  const uploadRef = useRef(null);

  //for imageurl
  const handlePreviewImage = (onChange) => () => {
    onChange(temporary);
  }

  //for imageurl/video
  const handleRemovePreview = (onChange) => () => {
    onChange("");
  }

  //for video
  const handlePreviewVideo = (onChange) => () => {
    onChange(getYoutubeId(temporary));
  }


  const handleClickUpload = () => {
    if (uploadRef) {
      const upBtn = uploadRef.current
      upBtn.click();
    }
  }

  const handleImageSelected = (onChange) => (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0]
    const formData = new FormData();
    formData.append('file', file)

    upload(formData)
      .then((res) => {
        const imageurl = res.data.data;
        console.log('imageURL: ', res.data.data)
        onChange(imageurl);
      }).catch((err) => {
        console.log('error di sini', err)
      });
  }

  switch (type) {
    case 'text':
      return (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || undefined}
          render={({onChange, name, value}) => (
            <CFormGroup 
              className={dense ? 'dense-form-group' : undefined}
            >
              {label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}
              <CInput
                type="text"
                id={`form-${name}`}
                name={name}
                placeholder={`enter-${name}`}
                autoComplete={`current-${name}`}
                disabled={isLoading}
                value={value}
                onChange={(e) => { onChange(e.target.value); }}
                {...rest}
              />
            </CFormGroup>
          )}
        />
      );

    case 'number':
      return (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || undefined}
          render={({onChange, name, value}) => (
            <CFormGroup className={dense ? 'dense-form-group' : undefined}>
              {label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}
              <CInput
                type="number"
                id={`form-${name}`}
                name={name}
                placeholder={`enter-${name}`}
                autoComplete={`current-${name}`}
                disabled={isLoading}
                value={value}
                onChange={(e) => { onChange(e.target.value); }}
                {...rest}
              />
            </CFormGroup>
          )}
        />
      );

    case 'boolean':
      return (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || undefined}
          render={({onChange, name, value}) => (
            <CFormGroup className={dense ? 'dense-form-group' : ''}>
              {label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}
              <CInputCheckbox 
                type="checkbox"
                id={`form-${name}`}
                name={name}
                placeholder={`enter-${name}`}
                autoComplete={`current-${name}`}
                disabled={isLoading}
                value={value}
                checked={value}
                onChange={(e) => { onChange(e.target.checked); }}
                {...rest}
              />
            </CFormGroup>
          )}
        />
      );

    case 'email':
      return (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || undefined}
          render={({onChange, name, value}) => (
            <CFormGroup className={dense ? 'dense-form-group' : undefined}>
              {label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}
              <CInput
                type="email"
                id={`form-${name}`}
                name={name}
                placeholder={`enter-${name}`}
                autoComplete={`current-${name}`}
                disabled={isLoading}
                value={value}
                onChange={(e) => { onChange(e.target.value); }}
                {...rest}
              />
            </CFormGroup>
          )}
        />
      );

    case 'password':
      return (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || undefined}
          render={({onChange, name, value}) => (
            <CFormGroup className={dense ? 'dense-form-group' : undefined}>
              {label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}
              <CInput
                type="password"
                id={`form-${name}`}
                name={name}
                placeholder={`enter-${name}`}
                autoComplete={`current-${name}`}
                disabled={isLoading}
                value={value}
                onChange={(e) => { onChange(e.target.value); }}
                {...rest}
              />
            </CFormGroup>
          )}
        />
      );

    case 'textarea':
      return (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || undefined}
          render={({onChange, name, value}) => (
            <CFormGroup className={dense ? 'dense-form-group' : undefined}>
              {label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}
              <CTextarea
                id={`form-${name}`}
                name={name}
                placeholder={`enter-${name}`}
                autoComplete={`current-${name}`}
                disabled={isLoading}
                value={value}
                onChange={(e) => { onChange(e.target.value); }}
                rows={3}
                {...rest}
              />
            </CFormGroup>
          )}
        />
      );

    case 'date':
      return (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || undefined}
          render={({onChange, name, value}) => (
            <CFormGroup className={dense ? 'dense-form-group' : undefined}>
              {label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}
              <CInput
                type="date"
                id={`form-${name}`}
                name={name}
                placeholder={`enter-${name}`}
                autoComplete={`current-${name}`}
                disabled={isLoading}
                value={value}
                onChange={(e) => { onChange(e.target.value); }}
                {...rest}
              />
            </CFormGroup>
          )}
        />
      )

    case 'datetime':
      return (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || undefined}
          render={({onChange, name, value}) => (
            <CFormGroup className={dense ? 'dense-form-group' : undefined}>
              {label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}
              <Datetime
                id={`form-${name}`}
                name={name}
                placeholder={`enter-${name}`}
                autoComplete={`current-${name}`}
                disabled={isLoading}
                value={new Date(value)}
                onChange={(e) => {
                  console.log('abc', e, typeof e);
                  onChange(e.format('YYYY-MM-DD HH:mm:ss')); 
                }}
                {...rest}
              />
            </CFormGroup>
          )}
        />
      )

    case 'select':
      return (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || undefined}
          render={({onChange, name, value}) => (
            <CFormGroup className={dense ? 'dense-form-group' : undefined}>
              {label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}
              <CSelect
                custom
                name={name}
                id={`form-${name}`}
                disabled={isLoading}
                value={value}
                defaultValue={options && options[0] ? options[0].value : null}
                onChange={(e) => { onChange(e.target.value); }}
                {...rest}
              >
                {options.map((option) => (
                  option && option.value && <option key={option.value} value={option.value}>{option.label || option.value}</option>
                ))}
              </CSelect>
            </CFormGroup>
          )}
        />
      )

    case 'async-select':
      return (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || undefined}
          render={({onChange, name, value}) => (
            <CFormGroup className={dense ? 'dense-form-group' : undefined}>
              {label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}
              <AsyncSelect
                cacheOptions
                value={value}
                loadOptions={selectCallback}
                defaultOptions
                onChange={(selected) => { 
                  onChange(selected); 
                }}
                isDisabled={isLoading}
                {...rest}
              />
            </CFormGroup>
          )}
        />
      )

    case 'imageurl':
      return (
          <Controller
            control={control}
            name={name}
            defaultValue={defaultValue || undefined}
            render={({onChange, name, value}) => (
              <CFormGroup className={dense ? 'dense-form-group' : undefined}>
                {!value && (
                  <>
                    {label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}
                    <CInputGroup>
                      <CInput
                        type="text"
                        id={`form-${name}`}
                        name={name}
                        placeholder={`enter-${name}`}
                        autoComplete={`current-${name}`}
                        disabled={isLoading}
                        value={temporary}
                        onChange={(e) => setTemporary(e.target.value)}
                        {...rest}
                      />
                      <CInputGroupAppend>
                        <CButton color="primary" onClick={handlePreviewImage(onChange)}>save</CButton>
                        <CButton color="secondary" onClick={handleClickUpload}>upload</CButton>
                        <CInputFile custom hidden onChange={handleImageSelected(onChange)} innerRef={uploadRef} />
                      </CInputGroupAppend>
                    </CInputGroup>
                  </>
                )}

                {value && (
                  <>
                    {!rest.readOnly && (
                      <CRow>
                        <CCol>{label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}</CCol>
                      </CRow>
                    )}
                    <CRow>
                      <CCol>
                        <CButtonClose onClick={handleRemovePreview(onChange)} />
                        <img src={value} alt="preview" />
                      </CCol>
                    </CRow>
                  </>
                )}
              </CFormGroup>
            )}
          />
      );

    case 'file':
      return (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || undefined}
          render={({onChange, name, value}) => (
            <CFormGroup className={dense ? 'dense-form-group' : undefined}>
              {!value && (
                <>
                  {label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}
                  <CInputGroup>
                    {/* <CInput
                      type="text"
                      id={`form-${name}`}
                      name={name}
                      placeholder={`enter-${name}`}
                      autoComplete={`current-${name}`}
                      disabled={isLoading}
                      value={temporary}
                      onChange={(e) => setTemporary(e.target.value)}
                      {...rest}
                    /> */}
                    <CInputGroupAppend>
                      {/* <CButton color="primary" onClick={handlePreviewImage(onChange)}>save</CButton> */}
                      <CButton color="primary" onClick={handleClickUpload}>upload</CButton>
                      <CInputFile custom hidden onChange={handleImageSelected(onChange)} innerRef={uploadRef} />
                    </CInputGroupAppend>
                  </CInputGroup>
                </>
              )}

              {value && (
                <>
                  {!rest.readOnly && (
                    <CRow>
                      <CCol>{label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}</CCol>
                    </CRow>
                  )}
                  <CRow>
                    <CCol>
                      <CButtonClose onClick={handleRemovePreview(onChange)} />
                      <img src={value} alt="preview" />
                    </CCol>
                  </CRow>
                </>
              )}
            </CFormGroup>
          )}
        />
      );

    case 'videourl':
      return (
          <Controller
            control={control}
            name={name}
            defaultValue={defaultValue || undefined}
            render={({onChange, name, value}) => (
              <CFormGroup className={dense ? 'dense-form-group' : undefined}>
                {!value && (
                  <>
                    {label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}
                    <CInputGroup>
                      <CInput
                        type="text"
                        id={`form-${name}`}
                        name={name}
                        placeholder={`enter-${name}`}
                        autoComplete={`current-${name}`}
                        disabled={isLoading}
                        value={temporary}
                        onChange={(e) => setTemporary(e.target.value)}
                        {...rest}
                      />
                      <CInputGroupAppend>
                        <CButton color="primary" onClick={handlePreviewVideo(onChange)}>save</CButton>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </>
                )}

                {value && (
                  <>
                    <CRow>
                      <CCol>{label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}</CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        {!rest.readOnly && (
                          <CButtonClose onClick={handleRemovePreview(onChange)} />
                        )}
                        <iframe
                          width="853"
                          height="480"
                          src={`https://www.youtube.com/embed/${value}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title="Embedded youtube"
                        />
                      </CCol>
                    </CRow>
                  </>
                )}
              </CFormGroup>
            )}
          />
      );

    case 'empty':
      return (
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          {...rest}
        />
      )

    default: break;
  }
}

FormField.propTypes = {
  type: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  isLoading: PropTypes.bool,
  timeout: PropTypes.number,
  selectCallback: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
}

FormField.defaultProps = defaultProps;

export default FormField;

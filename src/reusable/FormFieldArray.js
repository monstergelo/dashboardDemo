import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Controller, useFieldArray } from 'react-hook-form';
import { CButton, CCard, CCardBody, CCardFooter, CCol, CFormGroup, CInput, CInputGroup, CInputGroupAppend, CLabel, CListGroup, CRow } from '@coreui/react';
import AsyncSelect from 'react-select/async';
import { IoAdd, IoTrash } from 'react-icons/io5';

const defaultProps = {
  type: 'empty',
}

const FormFieldArray = props => {
  const {
    type,
    name,
    control,
    listValueProperty,
    properties,
    dense,
    label,
    selectCallback,
    isLoading,
    readOnly,
    ...rest
  } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name
  });

  const [selected, setSelected] = useState(null);

  const handleSelectChange = (item) => {
    setSelected(item);
  }

  const handleAppend = () => {
    append(selected)
  }

  const handleDelete = (index) => {
    remove(index);
  }

  const handleAppendTextInput = () => {
    if (selected) {
      append({
        [listValueProperty]: selected
      })
  
      setSelected('')
    }
  }

  switch (type) {
    case 'list':
      return (
        <CFormGroup className={dense ? 'dense-form-group' : undefined}>
          {label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}
          <CCard>
            <CCardBody>
              <CListGroup accent>      
                {fields && fields.map((item, index) => (
                  <div key={item.id}>
                    {properties && properties.map((property) => (
                      <Controller
                        key={item.id}
                        control={control}
                        defaultValue={item[property]}
                        name={`${name}[${index}].${property}`}
                      />
                    ))}
                    <ul>
                      <li>{item[listValueProperty]}</li>
                    </ul>
                  </div>
                ))}
              </CListGroup>
            </CCardBody>
            <CCardFooter>
              <CInputGroup>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  styles={{
                    container: (css) => ({
                      ...css,
                      flex: 'auto'
                    })
                  }}
                  loadOptions={selectCallback}
                  getOptionLabel={(item) => (item.name)}
                  getOptionValue={(item) => (item)}
                  isLoading={isLoading}
                  onChange={handleSelectChange}
                />
                <CInputGroupAppend>
                  <CButton
                    onClick={handleAppend}
                    color="secondary"
                  >
                    <IoAdd />
                  </CButton>
                </CInputGroupAppend>
              </CInputGroup>  
            </CCardFooter>
          </CCard>
        </CFormGroup>
      )

    case 'textInput':
      return (
        <CFormGroup className={dense ? 'dense-form-group' : undefined}>
          {label && (<CLabel htmlFor={`form-${name}`}>{label}</CLabel>)}
          <CCard>
            <CCardBody>
              <CListGroup accent>      
                {fields && fields.map((item, index) => (
                  <div key={item.id}>
                    {properties && properties.map((property) => (
                      <Controller
                        key={item.id}
                        control={control}
                        defaultValue={item[property]}
                        name={`${name}[${index}].${property}`}
                      />
                    ))}
                    <ul>
                      <li>
                        <CRow>
                          <CCol>
                            {item[listValueProperty]}
                          </CCol>
                          {!readOnly && (
                            <CCol>
                              <CButton
                                size="sm"
                                onClick={() => { handleDelete(index); }}
                                className="float-right"
                              >
                                <IoTrash />
                              </CButton>
                            </CCol>
                          )}
                        </CRow>
                      </li>
                    </ul>
                  </div>
                ))}
              </CListGroup>
              {!readOnly && (
                <>
                  <hr />
                  <CInputGroup>
                    <CInput
                      type="text"
                      id={`form-${name}`}
                      name={name}
                      placeholder={`enter-${name}`}
                      autoComplete={`current-${name}`}
                      disabled={isLoading}
                      value={selected}
                      onChange={(e) => { setSelected(e.target.value); }}
                    />
                    <CInputGroupAppend>
                      <CButton
                        onClick={handleAppendTextInput}
                        color="secondary"
                      >
                        <IoAdd />
                      </CButton>
                    </CInputGroupAppend>
                  </CInputGroup>  
                </>
              )}
            </CCardBody>
          </CCard>
        </CFormGroup>
      )

    case 'empty':
      return (
        <>
        {fields && fields.map((item, index) => (
          <div key={item.id}>
            {properties && properties.map((property) => (
              <Controller
                key={item.id}
                control={control}
                defaultValue={item[property]}
                name={`${name}[${index}].${property}`}
              />
            ))}
          </div>
        ))}
        </>
      )

    default: break;
  }
}

FormFieldArray.propTypes = {
  type: PropTypes.string.isRequired,
}

FormFieldArray.defaultProps = defaultProps;

export default FormFieldArray;

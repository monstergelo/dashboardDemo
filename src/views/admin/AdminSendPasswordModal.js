import { CButton, CModalBody, CModalFooter, CModalHeader, CSpinner } from '@coreui/react';
import React from 'react'

const AdminSendPasswordModal = (props) => {
  const { onSubmit, isLoading, data } = props;

  return (
    <>
      <CModalHeader>
        <h3>Send Password</h3>
      </CModalHeader>
      <CModalBody>
        {`Confirm send password ${data? data.name : ''}`}
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={onSubmit}>
          {isLoading && (<CSpinner size="sm" color="secondary" />)}
          <span>Submit</span>
        </CButton>
      </CModalFooter>
    </>
  )
}

export default AdminSendPasswordModal;
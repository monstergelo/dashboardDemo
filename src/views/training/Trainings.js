import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CSpinner,
  CToast,
  CToaster,
  CToastHeader,
} from '@coreui/react'

import DataTableCard from 'src/reusable/DataTableCard';
import useTraining from 'src/api/trainingApi';

const Trainings = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [send, setSend] = useState(null);
  const [toasts, setToasts] = useState([])

  const sendToast = (message, color) => {
    setToasts((prev) => [...prev, {message, color}])
  }


  const repo = useTraining({});

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/trainings?page=${newPage}`)
  }

  const handleDelete = (item) => {
    repo.remove(item._id)
  }

  const onSearch = (search) => {
    repo.fetch([
      {
        name: 'q',
        value: search,
      },
    ])
  }

  const handleClickSend = (item) => () => {
    setSend(item)
  }

  const handleSendPassword = () => {
    repo.sendPassword(send._id)
      .then(() => {
        sendToast('success send password', 'success')
        setSend(null)
      })
      .catch((err) => {
        sendToast(err.response ? err.response.data.message : err.message , 'danger')
        setSend(null)
      })
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={12}>
        <DataTableCard 
          title="Trainings"
          fields={[
            { key: '_id', _classes: 'font-weight-bold' },
            'name', 'event_code', 'trainer', 'send password'
          ]}
          data={repo.data}
          page={page}
          pageSize={5}
          isLoading={repo.isLoading}
          onAddClick={() => history.push('/trainings/create')}
          onRowEditClick={(item) => history.push(`/trainings/${item._id}`)}
          onPageChange={pageChange}
          onRowDeleteClick={handleDelete}
          onSearch={onSearch}
          scopedSlots={{
            'send password': (item) => (
              <td>
                <CButton color="info" onClick={handleClickSend(item)}>Send Password</CButton>
              </td>
            ),
            'trainer': (item) => (
              <td>
                {item.trainer && item.trainer.length > 0 ? item.trainer[0].name : ""}
              </td>
            )
          }}
        />
      </CCol>

      <CCol sm="12" lg="6">
        <CModal centered show={send} onClose={() => { setSend(null); }}>
          <CModalHeader>
            <h3>Send Password</h3>
          </CModalHeader>
          <CModalBody>
            {`Confirm send password ${send? send.name : ''}`}
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={handleSendPassword}>
              {repo.isLoading && (<CSpinner size="sm" color="secondary" />)}
              <span>Submit</span>
            </CButton>
          </CModalFooter>
        </CModal>

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
  )
}

export default Trainings

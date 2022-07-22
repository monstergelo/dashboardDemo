import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CRow,
  CToast,
  CToaster,
  CToastHeader,
} from '@coreui/react'
import Papa from 'papaparse';
import DataTableCard from 'src/reusable/DataTableCard';
import useAdminRegister from 'src/api/adminRegisterApi';
import AdminImportModal from './AdminImportModal';
import AdminSendPasswordModal from './AdminSendPasswordModal';

const AdminRegisters = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [open, setOpen] = useState(false);
  const [send, setSend] = useState(null);
  const [csvData, setCSVdata] = useState(null);
  const [toasts, setToasts] = useState([])

  const sendToast = (message, color) => {
    setToasts((prev) => [...prev, {message, color}])
  }

  const repo = useAdminRegister({});
  const { fetch, bulkPost } = repo;

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/admins?page=${newPage}`)
  }

  const handleUpload = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setCSVdata(result.data)
        setOpen(true);
      }
    })
  }

  const handleImportSubmit = (formData) => {
    if (csvData) {
      const submitData = csvData.map((row) => ({
        ...row
      }));

      bulkPost({
        data: submitData
      }).then(() => {
        setOpen(false);
        fetch();
      });
    }
    
  }

  const handleDelete = (item) => {
    repo.remove(item._id)
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

  const onSearch = (search) => {
    fetch([
      {
        name: 'q',
        value: search,
      },
    ])
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={12}>
        <DataTableCard 
          title="Admin Register"
          fields={[
            { key: '_id', _classes: 'font-weight-bold' },
            "name","email","status","send password"
          ]}
          data={repo.data}
          page={page}
          pageSize={5}
          isLoading={repo.isLoading}
          onAddClick={() => history.push('/admins/create')}
          onRowEditClick={(item) => history.push(`/admins/${item._id}`)}
          onRowDeleteClick={handleDelete}
          onUpload={handleUpload}
          onPageChange={pageChange}
          onSearch={onSearch}
          scopedSlots={{
            'send password': (item) => (
              <td>
                <CButton color="info" onClick={handleClickSend(item)}>Send Password</CButton>
              </td>
            )
          }}
        />

        <CModal centered size="lg" show={open} onClose={() => { setOpen(false); setCSVdata(null); }}>
          <CModalBody>
            <AdminImportModal 
              onSubmit={handleImportSubmit}
              isLoading={repo.isLoading}
              data={csvData}
            />
          </CModalBody>
        </CModal>

        <CModal centered show={send} onClose={() => { setSend(null); }}>
          <AdminSendPasswordModal
            onSubmit={handleSendPassword}
            data={send}
            isLoading={repo.isLoading}
          />
        </CModal>
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
  )
}

export default AdminRegisters

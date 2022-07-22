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
import Papa from 'papaparse';
import DataTableCard from 'src/reusable/DataTableCard';
import useTraineeRegister from 'src/api/traineeRegisterApi';
import TraineeImportModal from './TraineeImportModal';
import { useApi } from 'src/api/baseApi';

const TraineeRegisters = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [open, setOpen] = useState(false);
  const [csvData, setCSVdata] = useState(null);
  const [send, setSend] = useState(null);
  const [toasts, setToasts] = useState([])

  const sendToast = (message, color) => {
    setToasts((prev) => [...prev, {message, color}])
  }

  const repo = useTraineeRegister({});
  const { fetch, bulkPost } = repo;
  const { getOption: getOptionCompany } = useApi({
    url: 'company'
  });
  const { getOption: getOptionTraining } = useApi({
    url: 'training'
  });

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/trainee-registers?page=${newPage}`)
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
    console.log(formData);
    if (csvData) {
      const submitData = csvData.map((row) => ({
        company_id: formData.company._id,
        ...row
      }));

      bulkPost({
        data: submitData,
        training_id: formData.training._id
      }).then(() => {
        setOpen(false);
        fetch();
      }).catch((err) => {
        sendToast(err.response ? err.response.data.message : err.message , 'danger')
      });
    }
  }

  const onSearch = (search) => {
    fetch([
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
          title="Trainee Register"
          fields={[
            { key: 'name', _classes: 'font-weight-bold' },
            'position',
            'department', 'company', 'email', 'phone_number',
            'send password'
          ]}
          data={repo.data}
          page={page}
          pageSize={5}
          isLoading={repo.isLoading}
          onAddClick={() => history.push('/trainee-registers/create')}
          onRowEditClick={(item) => history.push(`/trainee-registers/${item._id}`)}
          onUpload={handleUpload}
          onPageChange={pageChange}
          onSearch={onSearch}
          scopedSlots={{
            'send password': (item) => (
              <td>
                <CButton color="info" onClick={handleClickSend(item)}>Send Password</CButton>
              </td>
            ),
            'company': (item) => (
              <td>
                {item.company? item.company.name : ""}
              </td>
            )
          }}
        />

        <CModal centered size="lg" show={open} onClose={() => { setOpen(false); }}>
          <CModalBody>
            <TraineeImportModal 
              getOptionCompany={getOptionCompany}
              getOptionTraining={getOptionTraining}
              onSubmit={handleImportSubmit}
              isLoading={repo.isLoading}
              data={csvData}
            />
          </CModalBody>
        </CModal>
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

export default TraineeRegisters

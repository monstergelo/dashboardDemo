import React, { useRef, useState }  from 'react';
import PropTypes from 'prop-types';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CInput, CInputGroup, CInputGroupAppend, CModal, CModalBody, CModalFooter, CModalHeader, CPagination, CRow } from '@coreui/react';
import { IoAdd, IoPencil, IoSearch, IoTrash } from 'react-icons/io5';
import { MdFileUpload } from "react-icons/md";

const defaultProps = {
  title: 'title',
  page: 1,
  pageSize: 5,
  isLoading: false,
  data: [],
  onRowEditClick: null,
  onPageChange: (newpage) => { console.log(newpage); },
  onRowDeleteClick: null,
  scopedSlots: {},
}

const DataTableCard = (props) => {
  const {
    title,
    fields,
    data,
    page,
    pageSize,
    isLoading,
    onAddClick,
    onRowEditClick,
    onRowDeleteClick,
    onPageChange,
    onUpload,
    onSearch,
    scopedSlots,
  } = props;

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelecteditem] = useState(null);
  const [search, setSearch] = useState('');
  const uploadRef = useRef(null);

  const closeConfirm = () => {
    setOpen(false);
  }

  const openConfirm = (item) => {
    setOpen(true);
    setSelecteditem(item);
  }

  const handleDeleteClick = ()  => {
    onRowDeleteClick(selectedItem)
    setOpen(false);
  }

  const handleUploadClick = () => {
    if (uploadRef) {
      uploadRef.current.click()
    }
  }

  const handleFileLoad = (e) => {
    const file = e.target.files[0];

    if (file) {
      onUpload(file)
    }
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSearch = () => {
    onSearch(search);
  }

  const actualScotpedSlots = {
    ...scopedSlots,
    'edit': onRowEditClick ? (item) => (
      <td>
        <CButton
          size="sm"
          onClick={(e) => { onRowEditClick(item); }}
        >
          <IoPencil />
        </CButton>
      </td>
    ) : undefined,
    'delete': onRowDeleteClick ? (item) => (
      <td>
        <CButton
          size="sm"
          onClick={(e) => { openConfirm(item); }}
        >
          <IoTrash />
        </CButton>
      </td>
    ) : undefined,
  }

  const actualField = [
    ...fields,
  ]

  if (onRowEditClick) actualField.push('edit');
  if (onRowDeleteClick) actualField.push('delete');

  return (
    <CCard>
      <CCardHeader>
        <h3>{title}</h3>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol>
            {onSearch && (
              <form onSubmit={handleSearch}>
                <CInputGroup>
                  <CInput value={search} onChange={handleSearchChange} />
                  <CInputGroupAppend>
                    <CButton type="submit">
                      <IoSearch/>
                    </CButton>
                  </CInputGroupAppend>
                </CInputGroup>
              </form>
            )} 
          </CCol>
          <CCol>
            {onAddClick && (
              <CButton
                size="lg"
                className="float-right"
                onClick={onAddClick}
              >
                <IoAdd />
              </CButton>
            )}
            {onUpload && (
              <CButton
                size="lg"
                className="float-right"
                onClick={handleUploadClick}
              >
                <MdFileUpload />
                <input onChange={handleFileLoad} ref={uploadRef} style={{"display": "none"}} type="file" accept=".csv"/>
              </CButton>
            )}
          </CCol>
        </CRow>
        <CDataTable
          items={data}
          fields={actualField}
          hover
          striped
          loading={isLoading}
          itemsPerPage={pageSize}
          activePage={page}
          scopedSlots={actualScotpedSlots}
        />
        <CPagination
          activePage={page}
          onActivePageChange={onPageChange}
          pages={data ? Math.ceil(data.length/pageSize) : null}
          doubleArrows={false} 
          align="center"
        />
      </CCardBody>

      <CModal
        show={open}
        onClose={closeConfirm}
      >
        <CModalHeader closeButton>Delete</CModalHeader>
        <CModalBody>
          Confirm Delete?
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={handleDeleteClick}
          >
            delete
          </CButton>{' '}
          <CButton
            color="secondary"
            onClick={closeConfirm}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

DataTableCard.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  fields: PropTypes.array,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  isLoading: PropTypes.bool,
  onAddClick: PropTypes.func,
  onRowEditClick: PropTypes.func,
  onRowDeleteClick: PropTypes.func,
  onPageChange: PropTypes.func,
  scopedSlots: PropTypes.object,
}

DataTableCard.defaultProps = defaultProps;

export default DataTableCard;

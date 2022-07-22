import { CButton, CCard, CCardBody, CCardText, CCol, CLabel, CRow, CSelect } from '@coreui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { IoTrash } from 'react-icons/io5';
import { DraggableCardItem } from 'src/reusable/DraggableList';
import FormField from 'src/reusable/FormField';
import FormFieldArray from 'src/reusable/FormFieldArray';

const AnswerBlockItem = (props) => {
  const {
    id,
    block,
    index,
    control,
    isLoading,
    onDelete,
    lang,
    langOptions,
    onLangChange,
    upload,
    ...rest
  } = props;

  // const { rmIds } = useFormContext();

  const handleDelete = () => {
    onDelete(index);
  }

  const renderHeader = ({multiLanguange} = {multiLanguange: true}) => (
    <CRow alignVertical="items-center" alignHorizontal="between">
      <CCol xs={6}>
        <CRow alignVertical="items-center">
          <CCol xs={4}>
            <CCardText>{block.sub_type || block.type}</CCardText>
          </CCol>
          <CCol xs={6}>
            <FormField
              type="text"
              name={`blocks[${index}].request_id`}
              defaultValue={block.request_id}
              control={control}
              dense
              placeholder="insert block id"
              readOnly
            />
            <FormField
              type="empty"
              name={`blocks[${index}].type`}
              defaultValue={block.type}
              control={control}
            />
            <FormField
              type="empty"
              name={`blocks[${index}].sub_type`}
              defaultValue={block.sub_type}
              control={control}
            />
          </CCol>
        </CRow>
      </CCol>
      {multiLanguange && (
        <CCol xs={2}>
          <CSelect
            value={lang}
            onChange={(e) => { onLangChange(e.target.value); }}
          >
            {langOptions.map((langOption) => (
              langOption && (
                <option key={langOption} value={langOption}>
                  {langOption}
                </option>
              ) 
            ))}
          </CSelect>
        </CCol>
      )}
      {onDelete && (
        <CCol xs={1}>
          <CButton
            onClick={handleDelete}
          >
            <IoTrash />
          </CButton>
        </CCol>
      )}
    </CRow>
  )

  switch (block.type) {
    case 'text':
      return (
        <DraggableCardItem
          id={block.id}
          index={index}
          key={block.id}
          noMargin
          header={renderHeader({multiLanguange: true})}
          {...rest}
        >
          <FormField
            type="empty"
            name={`blocks[${index}].data`}
            defaultValue={block.data}
            control={control}
          />
          
          {langOptions && langOptions.map((option) => (
            <FormField
              key={option}
              type={lang === option ? "textarea" : "empty"}
              name={`blocks[${index}].text.${option}`}
              defaultValue={block.text[option]}
              dense
              control={control}
              isLoading={isLoading}
              readOnly
            />
          ))}
        </DraggableCardItem>
      )

    case 'header1':
      return (
        <DraggableCardItem
          id={block.id}
          index={index}
          key={block.id}
          noMargin
          header={renderHeader({multiLanguange: true})}
          {...rest}
        >
          <FormField
            type="empty"
            name={`blocks[${index}].data`}
            defaultValue={block.sub_type}
            control={control}
          />

          {langOptions && langOptions.map((option) => (
            <FormField
              key={option}
              type={lang === option ? "textarea" : "empty"}
              name={`blocks[${index}].text.${option}`}
              defaultValue={block.text[option]}
              dense
              control={control}
              isLoading={isLoading}
              readOnly
            />
          ))}
        </DraggableCardItem>
      )

    case 'header2':
      return (
        <DraggableCardItem
          id={block.id}
          index={index}
          key={block.id}
          noMargin
          header={renderHeader({multiLanguange: true})}
          {...rest}
        >
          <FormField
            type="empty"
            name={`blocks[${index}].data`}
            defaultValue={block.sub_type}
            control={control}
          />

          {langOptions && langOptions.map((option) => (
            <FormField
              key={option}
              type={lang === option ? "textarea" : "empty"}
              name={`blocks[${index}].text.${option}`}
              defaultValue={block.text[option]}
              dense
              control={control}
              isLoading={isLoading}
              readOnly
            />
          ))}
        </DraggableCardItem>
      )

    case 'imageurl':
      return (
        <DraggableCardItem
          id={block.id}
          index={index}
          key={block.id}
          header={renderHeader({multiLanguange: true})}
          {...rest}
        >
          <FormField
            type="empty"
            name={`blocks[${index}].data`}
            defaultValue={block.sub_type}
            control={control}
          />

          {langOptions && langOptions.map((option) => (
            <FormField
              key={option}
              type={lang === option ? "imageurl" : "empty"}
              name={`blocks[${index}].text.${option}`}
              defaultValue={block.text[option] || ""}
              dense
              control={control}
              isLoading={isLoading}
              upload={upload}
              readOnly
            />
          ))}
        </DraggableCardItem>
      )

    case 'videourl':
      return (
        <DraggableCardItem
          id={block.id}
          index={index}
          key={block.id}
          header={renderHeader({multiLanguange: true})}
          {...rest}
        >
          <FormField
            type="empty"
            name={`blocks[${index}].data`}
            defaultValue={block.sub_type}
            control={control}
          />

          {langOptions && langOptions.map((option) => (
            <FormField
              key={option}
              type={lang === option ? "videourl" : "empty"}
              name={`blocks[${index}].text.${option}`}
              defaultValue={block.text[option]}
              dense
              control={control}
              isLoading={isLoading}
              upload={upload}
              readOnly
            />
          ))}
        </DraggableCardItem>
      )
    
    case 'question':
      switch (block.sub_type) {
        case 'text_input':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              header={renderHeader()}
              {...rest}
            >
              <FormField
                type="empty"
                name={`blocks[${index}].type`}
                defaultValue={block.type}
                control={control}
              />
          
              <FormField
                type="empty"
                name={`blocks[${index}].sub_type`}
                defaultValue={block.sub_type}
                control={control}
              />

              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.field.${option}`}
                  label="Field"
                  defaultValue={block.data && block.data.field ? block.data.field[option] : null}
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}

              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.placeholder.${option}`}
                  label="Placeholder"
                  defaultValue={block.data && block.data.placeholder ? block.data.placeholder[option]: null}
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}

              <hr />
              
              <CCard color="info">
                <CCardBody>
                  <FormField
                    type="text"
                    name={`blocks[${index}].value`}
                    label="Value"
                    defaultValue={block.answer}
                    control={control}
                    isLoading={isLoading}
                  />
                </CCardBody>
              </CCard>
              
            </DraggableCardItem>
          )

        case 'rm_5_point_rating':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              header={renderHeader()}
              {...rest}
            >

              <FormField
                type="number"
                name={`blocks[${index}].data.max_member`}
                label="Maximum Member"
                defaultValue={block.data && block.data.max_member ? block.data.max_member: null}
                control={control}
                isLoading={isLoading}
                readOnly
              />

              <CCard color="info">
                <CCardBody>
                  <CLabel>Value</CLabel>
                  <FormField
                    type="text"
                    name={`blocks[${index}].value.name`}
                    label="Name"
                    defaultValue={block.answer ? block.answer.name : null}
                    control={control}
                    isLoading={isLoading}
                  />
                  <FormField
                    type="text"
                    name={`blocks[${index}].value.position`}
                    label="Position"
                    defaultValue={block.answer ? block.answer.position : null}
                    control={control}
                    isLoading={isLoading}
                  />
                  <FormField
                    type="text"
                    name={`blocks[${index}].value.department`}
                    label="Department"
                    defaultValue={block.answer ? block.answer.department : null}
                    control={control}
                    isLoading={isLoading}
                  />
                  <FormField
                    type="number"
                    name={`blocks[${index}].value.base`}
                    label="Base"
                    defaultValue={block.answer ? block.answer.base : null}
                    control={control}
                    isLoading={isLoading}
                  />
                  <FormField
                    type="number"
                    name={`blocks[${index}].value.finish`}
                    label="Finish"
                    defaultValue={block.answer ? block.answer.finish : null}
                    control={control}
                    isLoading={isLoading}
                  />
                </CCardBody>
              </CCard>
            </DraggableCardItem>
          )

        case 'text_area':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              header={renderHeader()}
              {...rest}
            >

              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "textarea" : "empty"}
                  name={`blocks[${index}].data.placeholder.${option}`}
                  label="Field"
                  defaultValue={block.data && block.data.placeholder ? block.data.placeholder[option]: null}
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}

              <CCard color="info">
                <CCardBody>
                  <FormField
                    type="text"
                    name={`blocks[${index}].value`}
                    label="Value"
                    defaultValue={block.answer}
                    control={control}
                    isLoading={isLoading}
                  />
                </CCardBody>
              </CCard>
            </DraggableCardItem>
          )

        case 'qmli_table':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              noMargin
              header={renderHeader()}
              {...rest}
            >

              <CCard color="info">
                <CCardBody>
                  <CLabel><b>Value</b></CLabel> <br/>
                  <hr />
                  <CRow>
                    <CCol>
                      <CLabel><b>Manage By Head (TEAM)</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>PER 1</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>PER 1 Convertion</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>KET</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>PER 2</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>PER 2 Convertion</b></CLabel>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CLabel>Planner</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.planner.per1`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.planner 
                          ? block.answer.manage_by_head.planner.per1 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.planner.per1_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.planner 
                          ? block.answer.manage_by_head.planner.per1_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="text"
                        name={`blocks[${index}].value.manage_by_head.planner.ket`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.planner 
                          ? block.answer.manage_by_head.planner.ket 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.planner.per2`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.planner 
                          ? block.answer.manage_by_head.planner.per2 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.planner.per2_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.planner 
                          ? block.answer.manage_by_head.planner.per2_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CLabel>Coordinator</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.coordinator.per1`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.coordinator 
                          ? block.answer.manage_by_head.coordinator.per1 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.coordinator.per1_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.coordinator 
                          ? block.answer.manage_by_head.coordinator.per1_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="text"
                        name={`blocks[${index}].value.manage_by_head.coordinator.ket`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.coordinator 
                          ? block.answer.manage_by_head.coordinator.ket 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.coordinator.per2`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.coordinator 
                          ? block.answer.manage_by_head.coordinator.per2 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.coordinator.per2_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.coordinator 
                          ? block.answer.manage_by_head.coordinator.per2_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CLabel>Instructor</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.instructor.per1`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.instructor 
                          ? block.answer.manage_by_head.instructor.per1 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.instructor.per1_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.instructor 
                          ? block.answer.manage_by_head.instructor.per1_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="text"
                        name={`blocks[${index}].value.manage_by_head.instructor.ket`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.instructor 
                          ? block.answer.manage_by_head.instructor.ket 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.instructor.per2`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.instructor 
                          ? block.answer.manage_by_head.instructor.per2 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.instructor.per2_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.instructor 
                          ? block.answer.manage_by_head.instructor.per2_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CLabel>Evaluator</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.evaluator.per1`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.evaluator 
                          ? block.answer.manage_by_head.evaluator.per1 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.evaluator.per1_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.evaluator 
                          ? block.answer.manage_by_head.evaluator.per1_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="text"
                        name={`blocks[${index}].value.manage_by_head.evaluator.ket`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.evaluator 
                          ? block.answer.manage_by_head.evaluator.ket 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.evaluator.per2`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.evaluator 
                          ? block.answer.manage_by_head.evaluator.per2 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.evaluator.per2_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.evaluator 
                          ? block.answer.manage_by_head.evaluator.per2_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CLabel>Problem Solver</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.problem_solver.per1`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.problem_solver 
                          ? block.answer.manage_by_head.problem_solver.per1 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.problem_solver.per1_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.problem_solver 
                          ? block.answer.manage_by_head.problem_solver.per1_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="text"
                        name={`blocks[${index}].value.manage_by_head.problem_solver.ket`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.problem_solver 
                          ? block.answer.manage_by_head.problem_solver.ket 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.problem_solver.per2`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.problem_solver 
                          ? block.answer.manage_by_head.problem_solver.per2 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.problem_solver.per2_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.problem_solver 
                          ? block.answer.manage_by_head.problem_solver.per2_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CLabel>Quality of Management</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.quality_of_management.per1`}
                        defaultValue={block.answer
                          && block.answer.quality_of_management 
                          ? block.answer.quality_of_management.per1 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.quality_of_management.per1_conversion`}
                        defaultValue={block.answer
                          && block.answer.quality_of_management 
                          ? block.answer.quality_of_management.per1_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>

                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.quality_of_management.per2`}
                        defaultValue={block.answer
                          && block.answer.quality_of_management 
                          ? block.answer.quality_of_management.per2 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.quality_of_management.per2_conversion`}
                        defaultValue={block.answer
                          && block.answer.quality_of_management 
                          ? block.answer.quality_of_management.per2_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>
                  <hr />
                  <CRow>
                    <CCol>
                      <CLabel><b>Lead By Heart (TEAM)</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>PER 1</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>PER 1 Convertion</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>KET</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>PER 2</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>PER 2 Convertion</b></CLabel>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CLabel>Inspirer</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.inspirer.per1`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.inspirer 
                          ? block.answer.manage_by_head.inspirer.per1 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.inspirer.per1_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.inspirer 
                          ? block.answer.manage_by_head.inspirer.per1_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="text"
                        name={`blocks[${index}].value.manage_by_head.inspirer.ket`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.inspirer 
                          ? block.answer.manage_by_head.inspirer.ket 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.inspirer.per2`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.inspirer 
                          ? block.answer.manage_by_head.inspirer.per2 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.inspirer.per2_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.inspirer 
                          ? block.answer.manage_by_head.inspirer.per2_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CLabel>Motivator</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.motivator.per1`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.motivator 
                          ? block.answer.manage_by_head.motivator.per1 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.motivator.per1_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.motivator 
                          ? block.answer.manage_by_head.motivator.per1_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="text"
                        name={`blocks[${index}].value.manage_by_head.motivator.ket`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.motivator 
                          ? block.answer.manage_by_head.motivator.ket 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.motivator.per2`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.motivator 
                          ? block.answer.manage_by_head.motivator.per2 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.motivator.per2_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.motivator 
                          ? block.answer.manage_by_head.motivator.per2_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CLabel>Coach</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.coach.per1`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.coach 
                          ? block.answer.manage_by_head.coach.per1 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.coach.per1_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.coach 
                          ? block.answer.manage_by_head.coach.per1_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="text"
                        name={`blocks[${index}].value.manage_by_head.coach.ket`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.coach 
                          ? block.answer.manage_by_head.coach.ket 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.coach.per2`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.coach 
                          ? block.answer.manage_by_head.coach.per2 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.coach.per2_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.coach 
                          ? block.answer.manage_by_head.coach.per2_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CLabel>Catalyst</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.catalyst.per1`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.catalyst 
                          ? block.answer.manage_by_head.catalyst.per1 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.catalyst.per1_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.catalyst 
                          ? block.answer.manage_by_head.catalyst.per1_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="text"
                        name={`blocks[${index}].value.manage_by_head.catalyst.ket`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.catalyst 
                          ? block.answer.manage_by_head.catalyst.ket 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.catalyst.per2`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.catalyst 
                          ? block.answer.manage_by_head.catalyst.per2 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.catalyst.per2_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.catalyst 
                          ? block.answer.manage_by_head.mentor.per2_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CLabel>Mentor</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.mentor.per1`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.mentor 
                          ? block.answer.manage_by_head.mentor.per1 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.mentor.per1_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.mentor 
                          ? block.answer.manage_by_head.mentor.per1_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="text"
                        name={`blocks[${index}].value.manage_by_head.mentor.ket`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.mentor 
                          ? block.answer.manage_by_head.mentor.ket 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.mentor.per2`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.mentor 
                          ? block.answer.manage_by_head.mentor.per2 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.manage_by_head.mentor.per2_conversion`}
                        defaultValue={block.answer
                          && block.answer.manage_by_head 
                          && block.answer.manage_by_head.mentor 
                          ? block.answer.manage_by_head.mentor.per2_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CLabel>Quality of Leadership</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.quality_of_leadership.per1`}
                        defaultValue={block.answer
                          && block.answer.quality_of_leadership 
                          ? block.answer.quality_of_leadership.per1 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.quality_of_leadership.per1_conversion`}
                        defaultValue={block.answer
                          && block.answer.quality_of_leadership 
                          ? block.answer.quality_of_leadership.per1_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>

                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.quality_of_leadership.per2`}
                        defaultValue={block.answer
                          && block.answer.quality_of_leadership 
                          ? block.answer.quality_of_leadership.per2 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.quality_of_leadership.per2_conversion`}
                        defaultValue={block.answer
                          && block.answer.quality_of_leadership 
                          ? block.answer.quality_of_leadership.per2_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>

                  <hr />
                  <CRow>
                    <CCol>
                      <CLabel><b>QMLI</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>PER 1</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>PER 1 Convertion</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>KET</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>PER 2</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>PER 2 Convertion</b></CLabel>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CLabel>QMLI Score</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.qmli_score.per1`}
                        defaultValue={block.answer
                          && block.answer.qmli_score 
                          ? block.answer.qmli_score.per1 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.qmli_score.per1_conversion`}
                        defaultValue={block.answer
                          && block.answer.qmli_score 
                          ? block.answer.qmli_score.per1_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>

                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.qmli_score.per2`}
                        defaultValue={block.answer
                          && block.answer.qmli_score 
                          ? block.answer.qmli_score.per2 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.qmli_score.per2_conversion`}
                        defaultValue={block.answer
                          && block.answer.qmli_score 
                          ? block.answer.qmli_score.per2_conversion 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </DraggableCardItem>
          )

        case 'date':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              header={renderHeader()}
              {...rest}
            >

              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.field.${option}`}
                  label="Field"
                  defaultValue={block.data && block.data.field ? block.data.field[option] : null}
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}

              <CCard color="info">
                <CCardBody>
                  <FormField
                    type="date"
                    name={`blocks[${index}].value`}
                    label="Value"
                    defaultValue={block.answer}
                    control={control}
                    isLoading={isLoading}
                  />
                </CCardBody>
              </CCard>
            </DraggableCardItem>
          )

        case 'time':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              header={renderHeader()}
              {...rest}
            >

              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.field.${option}`}
                  label="Field"
                  defaultValue={block.data && block.data.field ? block.data.field[option] : null}
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}

              <CCard color="info">
                <CCardBody>
                  <FormField
                    type="datetime"
                    name={`blocks[${index}].value`}
                    label="Value"
                    defaultValue={block.answer}
                    control={control}
                    isLoading={isLoading}
                  />
                </CCardBody>
              </CCard>
            </DraggableCardItem>
          )

        case 'list_mom':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              noMargin
              header={renderHeader()}
              {...rest}
            >
              <CCard color="info">
                <CCardBody>
                  <FormField
                    type="text"
                    name={`blocks[${index}].value`}
                    label="Value"
                    defaultValue={block.answer}
                    control={control}
                    isLoading={isLoading}
                  />
                </CCardBody>
              </CCard>
            </DraggableCardItem>
          )

        case 'rating_5_point':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              header={renderHeader()}
              {...rest}
            >

              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.helper_1.${option}`}
                  label="Helper 1"
                  defaultValue={block.data && block.data.helper_1 ? block.data.helper_1[option]: null}
                  dense
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}

              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.helper_2.${option}`}
                  label="Helper 2"
                  defaultValue={block.data && block.data.helper_2 ? block.data.helper_2[option]: null}
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}
              
              <CCard color="info">
                <CCardBody>
                  <FormField
                    type="number"
                    name={`blocks[${index}].value`}
                    label="Value"
                    defaultValue={block.answer}
                    control={control}
                    isLoading={isLoading}
                  />
                </CCardBody>
              </CCard>
            </DraggableCardItem>
          )

        case 'rating_5_point_table':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              header={renderHeader()}
              {...rest}
            >
              { [0,1,2,3,4].map((labelIndex) => (
                <FormField
                  key={labelIndex}
                  type="text"
                  name={`blocks[${index}].data[${labelIndex}].label`}
                  label={`label-${labelIndex+1}`}
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}
              
              <CCard color="info">
                <CCardBody>
                  <FormField
                    type="text"
                    name={`blocks[${index}].value`}
                    label="Value"
                    defaultValue={block.answer}
                    control={control}
                    isLoading={isLoading}
                  />
                </CCardBody>
              </CCard>
            </DraggableCardItem>
          )

        case 'motivating_factor':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              header={renderHeader()}
              {...rest}
            >

              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.salary_increase.${option}`}
                  label="Salary Increase"
                  defaultValue={block.data && block.data.salary_increase ? block.data.salary_increase[option]: null}
                  dense
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}
              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.promotion.${option}`}
                  label="Promotion"
                  defaultValue={block.data && block.data.promotion ? block.data.promotion[option]: null}
                  dense
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}
              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.recognition.${option}`}
                  label="Recognition"
                  defaultValue={block.data && block.data.recognition ? block.data.recognition[option]: null}
                  dense
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}
              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.stability.${option}`}
                  label="Stability"
                  defaultValue={block.data && block.data.stability ? block.data.stability[option]: null}
                  dense
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}
              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.training.${option}`}
                  label="Training"
                  defaultValue={block.data && block.data.training ? block.data.training[option]: null}
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}
              
              <CCard color="info">
                <CCardBody>
                  <CLabel>Value</CLabel>
                  <FormField
                    type="text"
                    name={`blocks[${index}].value.salary_increase`}
                    label="Salary Increase"
                    defaultValue={block.answer ? block.answer.salary_increase : null}
                    control={control}
                    isLoading={isLoading}
                  />
                  <FormField
                    type="text"
                    name={`blocks[${index}].value.promotion`}
                    label="Promotion"
                    defaultValue={block.answer ? block.answer.promotion : null}
                    control={control}
                    isLoading={isLoading}
                  />
                  <FormField
                    type="text"
                    name={`blocks[${index}].value.stability`}
                    label="Stability"
                    defaultValue={block.answer ? block.answer.stability : null}
                    control={control}
                    isLoading={isLoading}
                  />
                  <FormField
                    type="text"
                    name={`blocks[${index}].value.recognition`}
                    label="Recognition"
                    defaultValue={block.answer ? block.answer.recognition : null}
                    control={control}
                    isLoading={isLoading}
                  />
                  <FormField
                    type="text"
                    name={`blocks[${index}].value.training`}
                    label="Training"
                    defaultValue={block.answer ? block.answer.training : null}
                    control={control}
                    isLoading={isLoading}
                  />
                </CCardBody>
              </CCard>
            </DraggableCardItem>
          )

        case 'rm_5_point_rating_summary':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              header={renderHeader()}
              {...rest}
            >

              <CCard color="info">
                <CCardBody>
                  <CLabel><b>Value</b></CLabel> <br/>
                  <hr />
                  <CLabel>Internal Average</CLabel>
                  <FormField
                    type="number"
                    name={`blocks[${index}].value.internalAvg.base`}
                    label="Base"
                    defaultValue={block.answer && block.answer.internalAvg ? block.answer.internalAvg.base : null}
                    control={control}
                    isLoading={isLoading}
                  />
                  <FormField
                    type="number"
                    name={`blocks[${index}].value.internalAvg.finish`}
                    label="Finish"
                    defaultValue={block.answer && block.answer.internalAvg ? block.answer.internalAvg.finish : null}
                    control={control}
                    isLoading={isLoading}
                  />
                  <hr />
                  <CLabel>External Average</CLabel>
                  <FormField
                    type="text"
                    name={`blocks[${index}].value.externalAvg.base`}
                    label="Base"
                    defaultValue={block.answer && block.answer.externalAvg ? block.answer.externalAvg.base : null}
                    control={control}
                    isLoading={isLoading}
                  />
                  <FormField
                    type="text"
                    name={`blocks[${index}].value.externalAvg.finish`}
                    label="Finish"
                    defaultValue={block.answer && block.answer.externalAvg ? block.answer.externalAvg.finish : null}
                    control={control}
                    isLoading={isLoading}
                  />
                  <hr />
                  <CLabel>Overall Average</CLabel>
                  <FormField
                    type="text"
                    name={`blocks[${index}].value.overallAvg.base`}
                    label="Base"
                    defaultValue={block.answer && block.answer.overallAvg ? block.answer.overallAvg.base : null}
                    control={control}
                    isLoading={isLoading}
                  />
                  <FormField
                    type="text"
                    name={`blocks[${index}].value.overallAvg.finish`}
                    label="Finish"
                    defaultValue={block.answer && block.answer.overallAvg ? block.answer.overallAvg.finish : null}
                    control={control}
                    isLoading={isLoading}
                  />
                  
                </CCardBody>
              </CCard>
            </DraggableCardItem>
          )

        case 'file':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              header={renderHeader()}
              {...rest}
            >

              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.field.${option}`}
                  label="Field"
                  defaultValue={block.data && block.data.field ? block.data.field[option] : null}
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}

              <CCard color="info">
                <CCardBody>
                  <FormField
                    type="text"
                    name={`blocks[${index}].value`}
                    label="Value"
                    defaultValue={block.answer}
                    control={control}
                    isLoading={isLoading}
                  />
                </CCardBody>
              </CCard>
            </DraggableCardItem>
          )

        case 'five_dictum_summary':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              noMargin
              header={renderHeader()}
              {...rest}
            >
              <CCard color="info">
                <CCardBody>
                  <FormField
                    type="text"
                    name={`blocks[${index}].value`}
                    label="Value"
                    defaultValue={block.answer}
                    control={control}
                    isLoading={isLoading}
                  />
                </CCardBody>
              </CCard>
            </DraggableCardItem>
          )

        case 'base_and_finish_score':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              header={renderHeader()}
              {...rest}
            >

              <FormField
                type="number"
                name={`blocks[${index}].data.score_base`}
                label="Score Base"
                defaultValue={block.data ? block.data.score_base : null}
                control={control}
                isLoading={isLoading}
                readOnly
              />

              <CCard color="info">
                <CCardBody>
                  <CLabel>Value</CLabel>
                  <FormField
                    type="number"
                    name={`blocks[${index}].value.base`}
                    label="Base"
                    defaultValue={block.answer ? block.answer.base : null}
                    control={control}
                    isLoading={isLoading}
                  />
                  <FormField
                    type="number"
                    name={`blocks[${index}].value.finish`}
                    label="Finish"
                    defaultValue={block.answer ? block.answer.finish : null}
                    control={control}
                    isLoading={isLoading}
                  />
                </CCardBody>
              </CCard>
            </DraggableCardItem>
          )

        case 'rating_5_slider':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              header={renderHeader()}
              {...rest}
            >

              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.helper1.${option}`}
                  label="Helper 1"
                  defaultValue={block.data && block.data.helper1 ? block.data.helper1[option] : null}
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}

              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.helper2.${option}`}
                  label="Helper 2"
                  defaultValue={block.data && block.data.helper2 ? block.data.helper2[option] : null}
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}

              <CCard color="info">
                <CCardBody>
                  <FormField
                    type="number"
                    name={`blocks[${index}].value`}
                    label="Value"
                    defaultValue={block.answer}
                    control={control}
                    isLoading={isLoading}
                  />
                </CCardBody>
              </CCard>
            </DraggableCardItem>
          )

        case 'five_dictum':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              header={renderHeader()}
              {...rest}
            >

              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.meaning_helper.${option}`}
                  label="Meaning Helper"
                  defaultValue={block.data && block.data.meaning_helper ? block.data.meaning_helper[option] : null}
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}

              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.result_helper.${option}`}
                  label="Result Helper"
                  defaultValue={block.data && block.data.result_helper ? block.data.result_helper[option] : null}
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}

              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.process_helper.${option}`}
                  label="Process Helper"
                  defaultValue={block.data && block.data.process_helper ? block.data.process_helper[option] : null}
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}

              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.growth_helper.${option}`}
                  label="Growth Helper"
                  defaultValue={block.data && block.data.growth_helper ? block.data.growth_helper[option] : null}
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}

              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.mindset_helper.${option}`}
                  label="Mindset Helper"
                  defaultValue={block.data && block.data.mindset_helper ? block.data.mindset_helper[option] : null}
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}

              <CCard color="info">
                <CCardBody>
                  <CLabel><b>Value</b></CLabel> <br/>
                  <hr />
                  <CRow>
                    <CCol>
                      <CLabel><b>Work Team</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>Base Line</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>Finish Line</b></CLabel>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CLabel>Member ID</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="text"
                        name={`blocks[${index}].value.work_team.base.member_id`}
                        defaultValue={block.answer
                          && block.answer.work_team 
                          && block.answer.work_team.base 
                          ? block.answer.work_team.base.member_id 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="text"
                        name={`blocks[${index}].value.work_team.finish.member_id`}
                        defaultValue={block.answer
                          && block.answer.work_team 
                          && block.answer.work_team.finish 
                          ? block.answer.work_team.finish.member_id
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CLabel>Meaning</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.work_team.base.meaning`}
                        defaultValue={block.answer
                          && block.answer.work_team 
                          && block.answer.work_team.base 
                          ? block.answer.work_team.base.meaning 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.work_team.finish.meaning`}
                        defaultValue={block.answer
                          && block.answer.work_team 
                          && block.answer.work_team.finish 
                          ? block.answer.work_team.finish.meaning
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CLabel>Result</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.work_team.base.result`}
                        defaultValue={block.answer
                          && block.answer.work_team
                          && block.answer.work_team.base
                          ? block.answer.work_team.base.result
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.work_team.finish.result`}
                        defaultValue={block.answer
                          && block.answer.work_team
                          && block.answer.work_team.finish
                          ? block.answer.work_team.finish.result
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CLabel>Process</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.work_team.base.process`}
                        defaultValue={block.answer
                          && block.answer.work_team
                          && block.answer.work_team.base
                          ? block.answer.work_team.base.process
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.work_team.finish.process`}
                        defaultValue={block.answer
                          && block.answer.work_team
                          && block.answer.work_team.finish
                          ? block.answer.work_team.finish.process
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CLabel>Growth</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.work_team.base.growth`}
                        defaultValue={block.answer
                          && block.answer.work_team
                          && block.answer.work_team.base
                          ? block.answer.work_team.base.growth
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.work_team.finish.growth`}
                        defaultValue={block.answer
                          && block.answer.work_team
                          && block.answer.work_team.finish
                          ? block.answer.work_team.finish.growth
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CLabel>Mindset</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.work_team.base.mindset`}
                        defaultValue={block.answer
                          && block.answer.work_team
                          && block.answer.work_team.base
                          ? block.answer.work_team.base.mindset
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.work_team.finish.mindset`}
                        defaultValue={block.answer
                          && block.answer.work_team
                          && block.answer.work_team.finish
                          ? block.answer.work_team.finish.mindset
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CLabel>Winning Team Score</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.work_team.base.winning_team_score`}
                        defaultValue={block.answer
                          && block.answer.work_team
                          && block.answer.work_team.base
                          ? block.answer.work_team.base.winning_team_score
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.work_team.finish.winning_team_score`}
                        defaultValue={block.answer
                          && block.answer.work_team
                          && block.answer.work_team.finish
                          ? block.answer.work_team.finish.winning_team_score
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>
                  
                  <hr />
                  <CRow>
                    <CCol>
                      <CLabel><b>Journey Team</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>Base Line</b></CLabel>
                    </CCol>
                    <CCol>
                      <CLabel><b>Finish Line</b></CLabel>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CLabel>Member ID</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="text"
                        name={`blocks[${index}].value.journey_team.base.member_id`}
                        defaultValue={block.answer
                          && block.answer.journey_team
                          && block.answer.journey_team.base
                          ? block.answer.journey_team.base.member_id
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="text"
                        name={`blocks[${index}].value.journey_team.finish.member_id`}
                        defaultValue={block.answer
                          && block.answer.journey_team
                          && block.answer.journey_team.finish
                          ? block.answer.journey_team.finish.member_id
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CLabel>Meaning</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.journey_team.base.meaning`}
                        defaultValue={block.answer
                          && block.answer.journey_team 
                          && block.answer.journey_team.base 
                          ? block.answer.journey_team.base.meaning 
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.journey_team.finish.meaning`}
                        defaultValue={block.answer
                          && block.answer.journey_team 
                          && block.answer.journey_team.finish 
                          ? block.answer.journey_team.finish.meaning
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CLabel>Result</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.journey_team.base.result`}
                        defaultValue={block.answer
                          && block.answer.journey_team
                          && block.answer.journey_team.base
                          ? block.answer.journey_team.base.result
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.journey_team.finish.result`}
                        defaultValue={block.answer
                          && block.answer.journey_team
                          && block.answer.journey_team.finish
                          ? block.answer.journey_team.finish.result
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CLabel>Process</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.journey_team.base.process`}
                        defaultValue={block.answer
                          && block.answer.journey_team
                          && block.answer.journey_team.base
                          ? block.answer.journey_team.base.process
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.journey_team.finish.process`}
                        defaultValue={block.answer
                          && block.answer.journey_team
                          && block.answer.journey_team.finish
                          ? block.answer.journey_team.finish.process
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CLabel>Growth</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.journey_team.base.growth`}
                        defaultValue={block.answer
                          && block.answer.journey_team
                          && block.answer.journey_team.base
                          ? block.answer.journey_team.base.growth
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.journey_team.finish.growth`}
                        defaultValue={block.answer
                          && block.answer.journey_team
                          && block.answer.journey_team.finish
                          ? block.answer.journey_team.finish.growth
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CLabel>Mindset</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.journey_team.base.mindset`}
                        defaultValue={block.answer
                          && block.answer.journey_team
                          && block.answer.journey_team.base
                          ? block.answer.journey_team.base.mindset
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.journey_team.finish.mindset`}
                        defaultValue={block.answer
                          && block.answer.journey_team
                          && block.answer.journey_team.finish
                          ? block.answer.journey_team.finish.mindset
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol>
                      <CLabel>Winning Team Score</CLabel>
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.journey_team.base.winning_team_score`}
                        defaultValue={block.answer
                          && block.answer.journey_team
                          && block.answer.journey_team.base
                          ? block.answer.journey_team.base.winning_team_score
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                    <CCol>
                      <FormField
                        type="number"
                        name={`blocks[${index}].value.journey_team.finish.winning_team_score`}
                        defaultValue={block.answer
                          && block.answer.journey_team
                          && block.answer.journey_team.finish
                          ? block.answer.journey_team.finish.winning_team_score
                          : null}
                        control={control}
                        isLoading={isLoading}
                      />
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </DraggableCardItem>
          )

        case 'select':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              header={renderHeader()}
              {...rest}
            >

              {langOptions && langOptions.map((option) => (
                <FormField
                  key={option}
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.field.${option}`}
                  label="Field"
                  defaultValue={block.data && block.data.field ? block.data.field[option] : null}
                  control={control}
                  isLoading={isLoading}
                  readOnly
                />
              ))}

              <FormField
                type="boolean"
                name={`blocks[${index}].data.multiple`}
                label="Multiple"
                defaultValue={block.answer}
                control={control}
                isLoading={isLoading}
              />

              {langOptions && langOptions.map((option) => (
                <FormFieldArray
                  key={option}
                  type={lang === option ? "textInput" : "empty"}
                  name={`blocks[${index}].data.options.${option}`}
                  label="Options"
                  defaultValue={block.data && block.data.options ? block.data.options[option] : null}
                  control={control}
                  listValueProperty="value"
                  properties={['value']}
                  isLoading={isLoading}
                  readOnly
                />
              ))}

              <CCard color="info">
                <CCardBody>
                  <FormField
                    type="select"
                    name={`blocks[${index}].value`}
                    label="Value"
                    defaultValue={block.answer}
                    control={control}
                    isLoading={isLoading}
                    options={block.data.options.ina}
                  />
                </CCardBody>
              </CCard>
            </DraggableCardItem>
          )
      
        default:
          return (<></>)
      }

    default:
      return (<></>)
  }
}

DraggableCardItem.propTypes = {
  block: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    content: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
  control: PropTypes.object,
  isLoading: PropTypes.bool,
  onDelete: PropTypes.func,
}
DraggableCardItem.defaultProps = {
  isLoading: false,
  block: null,
  control: null,
  onDelete: (index) => { console.log(index); }
};

export default AnswerBlockItem;

import { CButton, CCardText, CCol, CRow, CSelect } from '@coreui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { IoTrash } from 'react-icons/io5';
import { DraggableCardItem } from 'src/reusable/DraggableList';
import FormField from 'src/reusable/FormField';
import FormFieldArray from 'src/reusable/FormFieldArray';

const PageBlockItem = (props) => {
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
    optionData,
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
              type={lang === option ? "textarea" : "empty"}
              name={`blocks[${index}].text.${option}`}
              defaultValue={block.text[option]}
              dense
              control={control}
              isLoading={isLoading}
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
              type={lang === option ? "textarea" : "empty"}
              name={`blocks[${index}].text.${option}`}
              defaultValue={block.text[option]}
              dense
              control={control}
              isLoading={isLoading}
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
              type={lang === option ? "textarea" : "empty"}
              name={`blocks[${index}].text.${option}`}
              defaultValue={block.text[option]}
              dense
              control={control}
              isLoading={isLoading}
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
              type={lang === option ? "imageurl" : "empty"}
              name={`blocks[${index}].text.${option}`}
              defaultValue={block.text[option] || ""}
              dense
              control={control}
              isLoading={isLoading}
              upload={upload}
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
              type={lang === option ? "videourl" : "empty"}
              name={`blocks[${index}].text.${option}`}
              defaultValue={block.text[option]}
              dense
              control={control}
              isLoading={isLoading}
              upload={upload}
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
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.field.${option}`}
                  label="Field"
                  defaultValue={block.data && block.data.field ? block.data.field[option] : null}
                  control={control}
                  isLoading={isLoading}
                />
              ))}

              {langOptions && langOptions.map((option) => (
                <FormField
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.placeholder.${option}`}
                  label="Placeholder"
                  defaultValue={block.data && block.data.placeholder ? block.data.placeholder[option]: null}
                  control={control}
                  isLoading={isLoading}
                />
              ))}
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
                dense
                control={control}
                isLoading={isLoading}
              />
            </DraggableCardItem>
          )

        case 'text_area':
          return (
            <DraggableCardItem
              id={block.id}
              index={index}
              key={block.id}
              noMargin
              header={renderHeader()}
              {...rest}
            >

              {langOptions && langOptions.map((option) => (
                <FormField
                  type={lang === option ? "textarea" : "empty"}
                  name={`blocks[${index}].data.placeholder.${option}`}
                  defaultValue={block.data && block.data.placeholder ? block.data.placeholder[option]: null}
                  dense
                  control={control}
                  isLoading={isLoading}
                />
              ))}
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
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.field.${option}`}
                  label="Field"
                  defaultValue={block.data && block.data.field ? block.data.field[option] : null}
                  control={control}
                  isLoading={isLoading}
                />
              ))}
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
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.field.${option}`}
                  label="Field"
                  defaultValue={block.data && block.data.field ? block.data.field[option] : null}
                  control={control}
                  isLoading={isLoading}
                />
              ))}
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
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.field.${option}`}
                  label="Field"
                  defaultValue={block.data && block.data.field ? block.data.field[option] : null}
                  control={control}
                  isLoading={isLoading}
                />
              ))}

              {langOptions && langOptions.map((option) => (
                <FormField
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.helper_1.${option}`}
                  label="Helper 1"
                  defaultValue={block.data && block.data.helper_1 ? block.data.helper_1[option]: null}
                  dense
                  control={control}
                  isLoading={isLoading}
                />
              ))}

              {langOptions && langOptions.map((option) => (
                <FormField
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.helper_2.${option}`}
                  label="Helper 2"
                  defaultValue={block.data && block.data.helper_2 ? block.data.helper_2[option]: null}
                  dense
                  control={control}
                  isLoading={isLoading}
                />
              ))}
              
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

              {langOptions && langOptions.map((option) => (
                <FormField
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.field.${option}`}
                  label="Field"
                  defaultValue={block.data && block.data.field ? block.data.field[option] : null}
                  control={control}
                  isLoading={isLoading}
                />
              ))}

              { [0,1,2,3,4].map((labelIndex) => (
                <FormField
                  type="text"
                  name={`blocks[${index}].data[${labelIndex}].label`}
                  label={`label-${labelIndex+1}`}
                  control={control}
                  isLoading={isLoading}
                />
              ))}
              
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
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.salary_increase.${option}`}
                  label="Salary Increase"
                  defaultValue={block.data && block.data.salary_increase ? block.data.salary_increase[option]: null}
                  dense
                  control={control}
                  isLoading={isLoading}
                />
              ))}
              {langOptions && langOptions.map((option) => (
                <FormField
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.promotion.${option}`}
                  label="Promotion"
                  defaultValue={block.data && block.data.promotion ? block.data.promotion[option]: null}
                  dense
                  control={control}
                  isLoading={isLoading}
                />
              ))}
              {langOptions && langOptions.map((option) => (
                <FormField
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.recognition.${option}`}
                  label="Recognition"
                  defaultValue={block.data && block.data.recognition ? block.data.recognition[option]: null}
                  dense
                  control={control}
                  isLoading={isLoading}
                />
              ))}
              {langOptions && langOptions.map((option) => (
                <FormField
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.stability.${option}`}
                  label="Stability"
                  defaultValue={block.data && block.data.stability ? block.data.stability[option]: null}
                  dense
                  control={control}
                  isLoading={isLoading}
                />
              ))}
              {langOptions && langOptions.map((option) => (
                <FormField
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.training.${option}`}
                  label="Training"
                  defaultValue={block.data && block.data.training ? block.data.training[option]: null}
                  dense
                  control={control}
                  isLoading={isLoading}
                />
              ))}
              {/* <CButton color="secondary" onClick={handleMotivationAdd}>
                Add Motivating Factor
              </CButton>
              { motivationFields.map((motivation, itemIndex) => (
                <CRow className="mt-3" key={motivation.id}>
                  <CCol>
                    <FormField
                      type="text"
                      name={`blocks[${index}].data[${itemIndex}].motivation`}
                      control={control}
                      isLoading={isLoading}
                    />
                  </CCol>
                  <CCol>
                    <CButton
                      onClick={handleMotivationDelete(itemIndex)}
                    >
                      <IoTrash />
                    </CButton>
                  </CCol>
                </CRow>
              ))} */}
              
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
                  type={lang === option ? "file" : "empty"}
                  name={`blocks[${index}].data.field.${option}`}
                  label="Field"
                  defaultValue={block.data && block.data.field ? block.data.field[option] : null}
                  control={control}
                  isLoading={isLoading}
                />
              ))}
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
              {langOptions && langOptions.map((option) => (
                <FormField
                  type={lang === option ? "textarea" : "empty"}
                  name={`blocks[${index}].text.${option}`}
                  defaultValue={''}
                  dense
                  control={control}
                  isLoading={isLoading}
                />
              ))}
              <FormField
                type="number"
                name={`blocks[${index}].data.score_base`}
                label="Score Base"
                defaultValue={block.data ? block.data.score_base : null}
                control={control}
                isLoading={isLoading}
              />
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
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.field.${option}`}
                  label="Field"
                  defaultValue={block.data && block.data.field ? block.data.field[option] : null}
                  control={control}
                  isLoading={isLoading}
                />
              ))}

              {langOptions && langOptions.map((option) => (
                <FormField
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.helper1.${option}`}
                  label="Helper 1"
                  defaultValue={block.data && block.data.helper1 ? block.data.helper1[option] : null}
                  control={control}
                  isLoading={isLoading}
                />
              ))}

              {langOptions && langOptions.map((option) => (
                <FormField
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.helper2.${option}`}
                  label="Helper 2"
                  defaultValue={block.data && block.data.helper2 ? block.data.helper2[option] : null}
                  control={control}
                  isLoading={isLoading}
                />
              ))}
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
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.meaning_helper.${option}`}
                  label="Meaning Helper"
                  defaultValue={block.data && block.data.meaning_helper ? block.data.meaning_helper[option] : null}
                  control={control}
                  isLoading={isLoading}
                />
              ))}

              {langOptions && langOptions.map((option) => (
                <FormField
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.result_helper.${option}`}
                  label="Result Helper"
                  defaultValue={block.data && block.data.result_helper ? block.data.result_helper[option] : null}
                  control={control}
                  isLoading={isLoading}
                />
              ))}

              {langOptions && langOptions.map((option) => (
                <FormField
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.process_helper.${option}`}
                  label="Process Helper"
                  defaultValue={block.data && block.data.process_helper ? block.data.process_helper[option] : null}
                  control={control}
                  isLoading={isLoading}
                />
              ))}

              {langOptions && langOptions.map((option) => (
                <FormField
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.growth_helper.${option}`}
                  label="Growth Helper"
                  defaultValue={block.data && block.data.growth_helper ? block.data.growth_helper[option] : null}
                  control={control}
                  isLoading={isLoading}
                />
              ))}

              {langOptions && langOptions.map((option) => (
                <FormField
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.mindset_helper.${option}`}
                  label="Mindset Helper"
                  defaultValue={block.data && block.data.mindset_helper ? block.data.mindset_helper[option] : null}
                  control={control}
                  isLoading={isLoading}
                />
              ))}
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
                  type={lang === option ? "text" : "empty"}
                  name={`blocks[${index}].data.field.${option}`}
                  label="Field"
                  defaultValue={block.data && block.data.field ? block.data.field[option] : null}
                  control={control}
                  isLoading={isLoading}
                />
              ))}

              <FormField
                type="boolean"
                name={`blocks[${index}].data.multiple`}
                label="Multiple"
                defaultValue={block.data.multiple}
                control={control}
                isLoading={isLoading}
              />

              {langOptions && langOptions.map((option) => (
                <FormFieldArray
                  type={lang === option ? "textInput" : "empty"}
                  name={`blocks[${index}].data.options.${option}`}
                  label="Options"
                  defaultValue={block.data && block.data.options ? block.data.options[option] : null}
                  control={control}
                  listValueProperty="value"
                  properties={['value']}
                  isLoading={isLoading}
                />
              ))}
            </DraggableCardItem>
          )      
        default:
          return (<></>)
      }

    case 'schedule_section': 
      return (
      <DraggableCardItem
        id={block.id}
        index={index}
        key={block.id}
        noMargin
        header={renderHeader({multiLanguange: true})}
        {...rest}
      >
      </DraggableCardItem>
    )
    case 'profile_section':
      return (
      <DraggableCardItem
        id={block.id}
        index={index}
        key={block.id}
        noMargin
        header={renderHeader({multiLanguange: true})}
        {...rest}
      >
      </DraggableCardItem>
    )
    case 'work_journey_team_button':
      return (
      <DraggableCardItem
        id={block.id}
        index={index}
        key={block.id}
        noMargin
        header={renderHeader({multiLanguange: true})}
        {...rest}
      >
      </DraggableCardItem>
    )
    case 'button_to_page':
      return (
      <DraggableCardItem
        id={block.id}
        index={index}
        key={block.id}
        header={renderHeader({multiLanguange: true})}
        {...rest}
      >
        <FormField
          type="select"
          name={`blocks[${index}].data.icon`}
          label="Icon"
          defaultValue={block.data?.icon || 'progress'}
          control={control}
          options={[{value: 'progress'},{value: 'list'},{value: 'no-icon-text-center'},{value: 'no-icon-text-left'}]}
        />
        <FormField
          type="select"
          name={`blocks[${index}].data.color`}
          label="Color"
          defaultValue={block.data?.color || 'yellow'}
          control={control}
          options={[{value: 'blue'},{value: 'green'},{value: 'yellow'}]}
        />
        <FormField
          type="select"
          name={`blocks[${index}].data.page_id`}
          label="Page"
          defaultValue={block.data?.page_id}
          control={control}
          options={optionData}
        />


        {langOptions && langOptions.map((option) => (
          <FormField
            type={lang === option ? "text" : "empty"}
            name={`blocks[${index}].text.${option}`}
            label="Text"
            defaultValue={block.text[option]}
            dense
            control={control}
            isLoading={isLoading}
          />
        ))}
      </DraggableCardItem>
    )
    case 'button_to_webview':
      return (
      <DraggableCardItem
        id={block.id}
        index={index}
        key={block.id}
        header={renderHeader({multiLanguange: true})}
        {...rest}
      >
        {langOptions && langOptions.map((option) => (
          <>
            <FormField
              type={lang === option ? "text" : "empty"}
              name={`blocks[${index}].text.${option}`}
              label="URL"
              defaultValue={block.text[option]}
              control={control}
              isLoading={isLoading}
            />
            </>
        ))}
        {langOptions && langOptions.map((option) => (
            <FormField
              type={lang === option ? "imageurl" : "empty"}
              name={`blocks[${index}].data.image.${option}`}
              defaultValue={block.data?.image?.[option] || ""}
              label="Image (Optional)"
              control={control}
              isLoading={isLoading}
              upload={upload}
            />
        ))}
        {langOptions && langOptions.map((option) => (
            <FormField
              type={lang === option ? "text" : "empty"}
              name={`blocks[${index}].data.text.${option}`}
              label="Text for Button (Optional)"
              dense
              defaultValue={block.data?.text?.[option] || ''}
              control={control}
              isLoading={isLoading}
            />
        ))}     
        <FormField
          type="select"
          name={`blocks[${index}].data.icon`}
          label="Icon for Button"
          dense
          defaultValue={block.data?.icon || 'progress'}
          control={control}
          options={[{value: 'progress'},{value: 'list'},{value: 'no-icon-text-center'},{value: 'no-icon-text-left'}]}
        />
        <FormField
          type="select"
          name={`blocks[${index}].data.color`}
          label="Color for Button"
          dense
          defaultValue={block.data?.color || 'yellow'}
          control={control}
          options={[{value: 'blue'},{value: 'green'},{value: 'yellow'}]}
        />
      </DraggableCardItem>
    )
    case 'aworq_table':
      return (
      <DraggableCardItem
        id={block.id}
        index={index}
        key={block.id}
        noMargin
        header={renderHeader({multiLanguange: true})}
        {...rest}
      >
      </DraggableCardItem>
    )
    case 'linkurl':
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
              type={lang === option ? "text" : "empty"}
              name={`blocks[${index}].text.${option}`}
              defaultValue={block.text[option] || ""}
              dense
              control={control}
              isLoading={isLoading}
              upload={upload}
            />
          ))}
        </DraggableCardItem>
      )
    case 'fileurl':
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
              type={lang === option ? "file" : "empty"}
              name={`blocks[${index}].text.${option}`}
              label="Field"
              defaultValue={block.text ? block.text[option] || "" : ""}
              control={control}
              isLoading={isLoading}
              upload={upload}
            />
          ))}
        </DraggableCardItem>
      )

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

export default PageBlockItem;

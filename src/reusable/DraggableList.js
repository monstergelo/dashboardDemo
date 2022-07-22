import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { DragDropContext, Draggable, Droppable } from '@react-forked/dnd';

const DraggableList = forwardRef((props, ref) => {
  const {
    id,
    onDrop,
    children,
    ...rest
  } = props;

  return (
    <DragDropContext ref={ref} onDragEnd={onDrop} {...rest}>
      <Droppable droppableId={id}>
        {(droppable) => (
          <div ref={droppable.innerRef} {...droppable.droppableProps}>
            {children}
            {droppable.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
})
DraggableList.propTypes = {
  id: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
}
DraggableList.defaultProps = {

};
export default DraggableList;

export const DraggableCardItem = forwardRef((props, ref) => {
  const {
    id,
    index,
    header,
    noMargin,
    children,
    ...rest
  } = props

  return (
    <Draggable ref={ref} id={id} index={index} key={id} draggableId={id}  {...rest}>
      {(draggable) => (
        <CCard key={id} accentColor="primary" innerRef={draggable.innerRef} {...draggable.dragHandleProps} {...draggable.draggableProps} >
          {header && (
            <CCardHeader>{header}</CCardHeader>
          )}

          {noMargin
            ? (
              <>
                {children}
              </>
            )
            : (
              <CCardBody>
                {children}
              </CCardBody>
            )
          }
          
        </CCard>
      )}
    </Draggable>
  )
})
DraggableCardItem.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  header: PropTypes.element,
  noMargin: PropTypes.bool,
}
DraggableCardItem.defaultProps = {
  header: null,
  noMargin: false,
};

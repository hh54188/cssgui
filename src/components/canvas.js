import React from 'react'
import {
  createStyleObj, getStatusByProperties, playAnimation, saveAnimationEndStatus,
  saveAnimationStartStatus, stopAnimation,
  updateAnimationAnimatedProperties,
  updateAnimationProperty
} from "../utils";

import {useDataStore} from '../store/data'
import {useUIStore} from '../store/ui'
import Footer from "./footer";

function Canvas() {

  const UIState = useUIStore();
  const dataState = useDataStore();
  const {
    targetId,
    setTargetId,
    applyToAll,
    toggleApplyToAll,
    dragStartPoint,
    setDragStartPoint,
    dragBegin,
    setDragBegin,
    dragStartElementPoint,
    setDragStartElementPoint,
    showAnimationPanel,
    toggleAnimationPanel,
    openAddMultipleElementsDialog,
    toggleAddMultipleElementsDialog,
    cloneElementWhenAddMultipleElements,
    toggleCloneElementWhenAddMultipleElements
  } = UIState;
  const { elementCollection, updateSingleElement } = dataState;

  function recordMouseDownPosition(targetId, event) {
    const { clientX, clientY } = event;
    const elementState = elementCollection[targetId];

    setTargetId(targetId);
    setDragStartElementPoint([elementState.left, elementState.top])
    setDragStartPoint([clientX, clientY])
    setDragBegin(true)
  }

  function recordMouseUpPosition() {
    setDragBegin(false)
  }

  function mouseMoveOnCanvas(event) {
    const { clientX, clientY } = event;
    if (!dragBegin) {
      return;
    }
    const [dragStartPointX, dragStartPointY] = dragStartPoint
    const [dragStartElementPointX, dragStartElementPointY] = dragStartElementPoint

    updateSingleElement({
      ...elementCollection[targetId],
      left: dragStartElementPointX + (clientX - dragStartPointX),
      top: dragStartElementPointY + (clientY - dragStartPointY),
    })

  }

  return <div className="canvas-panel" onMouseMove={mouseMoveOnCanvas} >{Object.keys(elementCollection).map(id => {
    const elementState = elementCollection[id];
    const border = elementState.border;
    return <div
      onMouseDown={recordMouseDownPosition.bind(this, id)}
      onMouseUp={recordMouseUpPosition}
      onClick={() => setTargetId(id)}
      key={id}
      style={createStyleObj(elementState)}>
      {id == targetId && <div className="selected-element-cursor"></div>}
    </div>
  })}
    {/*{showAnimationPanel && <AnimationPanel*/}
    {/*  animation={currentSelectedElement ? currentSelectedElement.animation : null}*/}
    {/*  onMetaChange={(key, value) => updateSingleElement(targetId, updateAnimationProperty(currentSelectedElement, key, value))}*/}
    {/*  onPropertyChange={(name, value) => updateSingleElement(targetId, updateAnimationAnimatedProperties(currentSelectedElement, name, value))}*/}
    {/*  onSaveStartStatus={() => updateSingleElement(targetId, saveAnimationStartStatus(currentSelectedElement, getStatusByProperties(currentSelectedElement)))}*/}
    {/*  onSaveEndStatus={() => updateSingleElement(targetId, saveAnimationEndStatus(currentSelectedElement, getStatusByProperties(currentSelectedElement)))}*/}
    {/*  onPlayAnimation={() => updateSingleElement(targetId, playAnimation(currentSelectedElement))}*/}
    {/*  onStopAnimation={() => updateSingleElement(targetId, stopAnimation(currentSelectedElement))}*/}
    {/*></AnimationPanel>}*/}
    <Footer></Footer>
  </div>
}

export default Canvas

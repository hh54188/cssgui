import React from 'react';
import './App.css';
import 'react-linear-gradient-picker/dist/index.css';
import { useState, useEffect, useRef } from 'react'
import {
  FormGroup,
  NumericInput,
  Switch,
  Button,
  ButtonGroup,
  Dialog,
  Divider,
  Tabs,
  Tab,
  Toaster
} from '@blueprintjs/core'
import SizePanel from './components/size-panel';
import PositionPanel from './components/position-panel';
import BoxShadowPanel from './components/box-shadow-panel';
import BackgroundPanel from './components/background-panel';
import BorderPanel from './components/border-panel';
import TransformPanel from './components/transform-panel';
import AnimationPanel from './components/animation-panel';
import {useDataStore} from './store/data'
import {useUIStore} from './store/ui'
import {useConfigStore} from './store/config'
import { getNewState } from './element-state-template'
import {
  updateAllPositionBorderProperty,
  updateBorderProperty,
  enableBorderAllInOne,
  addShadow,
  removeShadow,
  updateShadowProperty,
  moveTopLeft, moveTopCenter, moveTopRight,
  moveCenterLeft, moveCenterCenter, moveCenterRight,
  moveBottomLeft, moveBottomCenter, moveBottomRight,
  updateTransformProperty,
  createStyleObj,
  resetScale,
  resetTranslate,
  resetSkew,
  updateAnimationProperty,
  updateAnimationAnimatedProperties,
  getStatusByProperties,
  saveAnimationEndStatus,
  saveAnimationStartStatus,
  playAnimation,
  stopAnimation
} from './utils'
import Footer from './components/footer';

let idSeed = 1;

function App() {
  const canvasRef = useRef();
  const UIState = useUIStore();
  const dataState = useDataStore();
  const configState = useConfigStore();
  const {
    targetId,
    setTargetId,
    positionHorizontalValueState,
    setPositionHorizontalValue,
    positionVerticalValueState,
    setPositionVerticalValue,
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
  const {
    elementCollection: elementStateCollection,
    setElementCollection,
    updateSingleElement,
    addNewElement,
    getTargetStyle,
    deleteElement,
    cloneElement,
    copyElement,
    updateTargetStyle,
    generateElements
  } = dataState;
  const { randomElementCount, setRandomElementCount } = configState

  function saveToLocal() {
    localStorage.setItem('data', JSON.stringify(elementStateCollection))
    Toaster.create({ position: 'top' }).show({ message: 'Save Successfully', intent: 'success' })
  }

  function loadFromLocal() {
    try {
      const result = JSON.parse(localStorage.getItem('data'))
      setElementCollection(result)
      Toaster.create({ position: 'top' }).show({ message: 'Load Successfully', intent: 'success' })
    } catch (e) {
      Toaster.create({ position: 'top' }).show({ message: 'Load Failed', intent: 'danger' })
    }
  }

  function recordMouseDownPosition(targetId, event) {
    const { clientX, clientY } = event;
    const elementState = elementStateCollection[targetId];

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
        ...elementStateCollection[targetId],
        left: dragStartElementPointX + (clientX - dragStartPointX),
        top: dragStartElementPointY + (clientY - dragStartPointY),
    })

  }

  const currentSelectedElement = targetId ? elementStateCollection[targetId] : null;
  return (
    <div className="App">
      <Dialog className='add-multiple-dialog' isOpen={openAddMultipleElementsDialog}>
        <div className="add-multiple-dialog-content">
          <FormGroup label="Element Count" inline>
            <NumericInput value={randomElementCount} onValueChange={value => setRandomElementCount(value)} />
          </FormGroup>
          <FormGroup label="Apply Selected Element Style To All Elements" inline>
            <Switch disabled={!targetId} value={cloneElementWhenAddMultipleElements} onChange={event => toggleCloneElementWhenAddMultipleElements(event.target.checked)} />
          </FormGroup>
        </div>
        <div className="add-multiple-dialog-actions">
          <Button className='add-multiple-dialog-actions-btn' onClick={() => toggleAddMultipleElementsDialog(false)} >Cancel</Button>
          <Button className='add-multiple-dialog-actions-btn' intent='primary' onClick={() => { generateElements(); toggleAddMultipleElementsDialog(false) }} >Confirm</Button>
        </div>
      </Dialog>
      <div className="canvas-panel" onMouseMove={mouseMoveOnCanvas} ref={canvasRef}>{Object.keys(elementStateCollection).map(id => {
        const elementState = elementStateCollection[id];
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
        {showAnimationPanel && <AnimationPanel
          animation={currentSelectedElement ? currentSelectedElement.animation : null}
          onMetaChange={(key, value) => updateSingleElement(targetId, updateAnimationProperty(currentSelectedElement, key, value))}
          onPropertyChange={(name, value) => updateSingleElement(targetId, updateAnimationAnimatedProperties(currentSelectedElement, name, value))}
          onSaveStartStatus={() => updateSingleElement(targetId, saveAnimationStartStatus(currentSelectedElement, getStatusByProperties(currentSelectedElement)))}
          onSaveEndStatus={() => updateSingleElement(targetId, saveAnimationEndStatus(currentSelectedElement, getStatusByProperties(currentSelectedElement)))}
          onPlayAnimation={() => updateSingleElement(targetId, playAnimation(currentSelectedElement))}
          onStopAnimation={() => updateSingleElement(targetId, stopAnimation(currentSelectedElement))}
        ></AnimationPanel>}
        <Footer></Footer>
      </div>
      <div className="control-panel">
        <div className="control-panel-content">
          <div className="control-panel-actions">
            <ButtonGroup fill>
              <Button icon="saved" onClick={saveToLocal}>Save</Button>
              <Button icon="import" onClick={loadFromLocal}>Load</Button>
            </ButtonGroup>
            <ButtonGroup fill style={{ marginTop: 10 }}>
              <Button onClick={() => addNewElement(setTargetId)} icon="plus">Add Single</Button>
              <Button onClick={() => toggleAddMultipleElementsDialog(true)} icon="new-object">Add Multiple</Button>
            </ButtonGroup>
            <ButtonGroup fill style={{ marginTop: 10 }}>
              <Button icon="copy" onClick={copyElement} disabled={!targetId}>Copy Element</Button>
            </ButtonGroup>
            <ButtonGroup fill style={{ marginTop: 10 }}>
              <Button intent="danger" icon="delete" onClick={deleteElement} disabled={!targetId}>Delete Element</Button>
            </ButtonGroup>
            <ButtonGroup fill style={{ marginTop: 10 }}>
              {!showAnimationPanel && <Button icon="drawer-right" onClick={() => toggleAnimationPanel(true)} disabled={!targetId}>Open Animation Panel</Button>}
              {showAnimationPanel && <Button icon="drawer-left" onClick={() => toggleAnimationPanel(false)} disabled={!targetId}>Close Animation Panel</Button>}
            </ButtonGroup>
            <FormGroup className='apply-to-all-switch' label="Apply To All" inline>
              <Switch value={applyToAll} onChange={event => toggleApplyToAll(event.target.checked)} />
            </FormGroup>
          </div>
          <SizePanel />
          {/* <PositionPanel
            onHorizontalTypeChange={event => setPositionHorizontalValue(event.currentTarget.value)}
            onVerticalTypeChange={event => setPositionVerticalValue(event.currentTarget.value)}
            horizontalValue={positionHorizontalValueState == "Right" ? getTargetStyle('right') : getTargetStyle('left')}
            verticalValue={positionVerticalValueState === "Top" ? getTargetStyle('top') : getTargetStyle('bottom')}
            onHorizontalValueChange={value => positionHorizontalValueState === "Right" ? updateTargetStyle('right', value) : updateTargetStyle('left', value)}
            onVerticalValueChange={value => positionVerticalValueState === "Top" ? updateTargetStyle('top', value) : updateTargetStyle('bottom', value)}
            disabled={!targetId}
            onMoveTopLeft={() => updateSingleElement(targetId, moveTopLeft(currentSelectedElement))}
            onMoveTopCenter={() => updateSingleElement(targetId, moveTopCenter(currentSelectedElement))}
            onMoveTopRight={() => updateSingleElement(targetId, moveTopRight(currentSelectedElement))}
            onMoveCenterLeft={() => updateSingleElement(targetId, moveCenterLeft(currentSelectedElement))}
            onMoveCenterCenter={() => updateSingleElement(targetId, moveCenterCenter(currentSelectedElement))}
            onMoveCenterRight={() => updateSingleElement(targetId, moveCenterRight(currentSelectedElement))}
            onMoveBottomLeft={() => updateSingleElement(targetId, moveBottomLeft(currentSelectedElement))}
            onMoveBottomCenter={() => updateSingleElement(targetId, moveBottomCenter(currentSelectedElement))}
            onMoveBottomRight={() => updateSingleElement(targetId, moveBottomRight(currentSelectedElement))}
          >
          </PositionPanel> */}
          <BackgroundPanel />
          {/* <TransformPanel
            transform={currentSelectedElement ? currentSelectedElement.transform : null}
            disabled={!currentSelectedElement}
            onValueChange={(value, type, coord) => updateSingleElement(targetId, updateTransformProperty(currentSelectedElement, type, coord, value))}
            onResetTranslate={() => updateSingleElement(targetId, resetTranslate(currentSelectedElement))}
            onResetScale={() => updateSingleElement(targetId, resetScale(currentSelectedElement))}
            onResetSkew={() => updateSingleElement(targetId, resetSkew(currentSelectedElement))}
          ></TransformPanel> */}
          <BorderPanel></BorderPanel>
          {/* <BorderPanel
            enabled={targetId ? elementStateCollection[targetId].borderEnabled : false}
            onToggleEnabled={event => updateTargetStyle('borderEnabled', event.target.checked)}
            borderAllInOne={targetId ? elementStateCollection[targetId].borderAllInOne : false}
            onToggleAllInOne={event => !elementStateCollection[targetId].borderAllInOne
              ? updateSingleElement(targetId, enableBorderAllInOne(currentSelectedElement))
              : updateTargetStyle('borderAllInOne', event.target.checked)}
            borders={targetId ? elementStateCollection[targetId].border : null}
            onAllWidthChange={value => updateSingleElement(targetId, updateAllPositionBorderProperty(currentSelectedElement, 'width', value))}
            onAllStyleChange={event => updateSingleElement(targetId, updateAllPositionBorderProperty(currentSelectedElement, 'style', event.target.value))}
            onAllColorChange={value => updateSingleElement(targetId, updateAllPositionBorderProperty(currentSelectedElement, 'color', value.hex))}
            onWidthChange={(position, value) => updateSingleElement(targetId, updateBorderProperty(currentSelectedElement, position, 'width', value))}
            onStyleChange={(position, event) => updateSingleElement(targetId, updateBorderProperty(currentSelectedElement, position, 'style', event.target.value))}
            onColorChange={(position, value) => updateSingleElement(targetId, updateBorderProperty(currentSelectedElement, position, 'color', value.hex))}
          ></BorderPanel> */}
          {/* <BoxShadowPanel
            disabled={!targetId}
            boxShadows={targetId ? elementStateCollection[targetId].boxShadow : []}
            onAdd={() => updateSingleElement(targetId, addShadow(currentSelectedElement))}
            onOffsetXChange={(index, value) => updateSingleElement(targetId, updateShadowProperty(currentSelectedElement, index, 'offsetX', value))}
            onOffsetYChange={(index, value) => updateSingleElement(targetId, updateShadowProperty(currentSelectedElement, index, 'offsetY', value))}
            onBlurRadiusChange={(index, value) => updateSingleElement(targetId, updateShadowProperty(currentSelectedElement, index, 'blurRadius', value))}
            onSpreadRadiusChange={(index, value) => updateSingleElement(targetId, updateShadowProperty(currentSelectedElement, index, 'spreadRadius', value))}
            onInsetChange={(index, event) => updateSingleElement(targetId, updateShadowProperty(currentSelectedElement, index, 'enableInset', event.target.checked))}
            onColorChange={(index, value) => updateSingleElement(targetId, updateShadowProperty(currentSelectedElement, index, 'color', value.hex))}
            onEnableShadow={(index) => updateSingleElement(targetId, updateShadowProperty(currentSelectedElement, index, 'enabled', true))}
            onDisableShadow={(index) => updateSingleElement(targetId, updateShadowProperty(currentSelectedElement, index, 'enabled', false))}
            onExpandPanel={(index) => updateSingleElement(targetId, updateShadowProperty(currentSelectedElement, index, 'collapsePanel', false))}
            onHidePanel={(index) => updateSingleElement(targetId, updateShadowProperty(currentSelectedElement, index, 'collapsePanel', true))}
            onDeleteShadow={index => updateSingleElement(targetId, removeShadow(currentSelectedElement, index))}
          >
          </BoxShadowPanel> */}
        </div>
      </div>
    </div >
  );
}

export default App;

import './App.css';
import { useState, useEffect, useRef } from 'react'
import {
  FormGroup,
  InputGroup,
  NumericInput,
  Divider,
  Switch,
  Checkbox,
  Icon,
  Button,
  ButtonGroup,
  ControlGroup,
  HTMLSelect,
  Menu,
  MenuItem,
  Classes, Position, Intent,
  Dialog,
  Tab, Tabs
} from '@blueprintjs/core'
import { Tooltip2, Popover2 } from '@blueprintjs/popover2'
import { SketchPicker } from 'react-color';
import SizePanel from './components/size-panel';
import PositionPanel from './components/position-panel';
import BoxShadowPanel from './components/box-shadow-panel';
import BackgroundPanel from './components/background-panel';
import BorderPanel from './components/border-panel';
import TransformPanel from './components/transform-panel';
import { getNewState } from './element-state-template'
import {
  updateAllPositionBorderProperty,
  updateBorderProperty,
  enableBorderAllInOne,
  createBoxShadowString,
  addShadow,
  removeShadow,
  updateShadowProperty,
  moveTopLeft, moveTopCenter, moveTopRight,
  moveCenterLeft, moveCenterCenter, moveCenterRight,
  moveBottomLeft, moveBottomCenter, moveBottomRight,
  updateTransformProperty
} from './util'

let idSeed = 1;

function App() {
  const canvasRef = useRef();

  const [elementStateCollection, setElementStateCollection] = useState({})
  const [targetId, setTargetId] = useState(null)

  const [dragStartPoint, setDragStartPoint] = useState([0, 0])
  const [dragStartElementPoint, setDragStartElementPoint] = useState([0, 0])
  const [dragBegin, setDragBegin] = useState(false)

  const [positionHorizontalValueState, setPositionHorizontalValue] = useState("Left")
  const [positionVerticalValueState, setPositionVerticalValue] = useState("Top")

  const [multipleElementsCount, setMultipleElementsCount] = useState(1000)
  const [openAddMultipleElementsDialog, toggleAddMultipleElementsDialog] = useState(false)
  const [cloneElementWhenAddMultipleElements, toggleCloneElementWhenAddMultipleElements] = useState(false)

  const [applyToAll, toggleApplyToAll] = useState(false)

  function updateSingleElement(targetId, targetElementState) {
    if (applyToAll) {
      Object.keys(elementStateCollection).forEach(id => {
        const originElementState = elementStateCollection[id]
        setElementStateCollection(oldState => {
          return {
            ...oldState,
            [id]: {
              ...targetElementState,
              left: originElementState.left,
              top: originElementState.top
            }
          }
        })
      })
    } else {
      setElementStateCollection(oldstate => {
        return {
          ...oldstate,
          [targetId]: {
            ...targetElementState
          }
        }
      })
    }
  }

  function addNewElement({ height = 200, width = 200, left = 100, top = 100 }) {
    const id = idSeed++;
    setTargetId(id)
    updateSingleElement(id, getNewState({ width, height, left, top }));
  }

  function cloneElement(targetElementState) {
    const id = idSeed++;
    setTargetId(id)
    updateSingleElement(id, targetElementState)
  }


  function getTargetProperty(name) {
    if (!targetId) {
      return 0;
    }
    return elementStateCollection[targetId][name];
  }

  function updateTargetProperty(name, value) {
    if (!targetId) {
      return;
    }
    if (applyToAll) {
      Object.keys(elementStateCollection).forEach(id => {
        const originElementState = elementStateCollection[id]
        setElementStateCollection(oldState => {
          return {
            ...oldState,
            [id]: {
              ...originElementState,
              [name]: value,
              left: originElementState.left,
              top: originElementState.top
            }
          }
        })
      })
    } else {
      setElementStateCollection({
        ...elementStateCollection,
        [targetId]: {
          ...elementStateCollection[targetId],
          [name]: value
        }
      })
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

    setElementStateCollection({
      ...elementStateCollection,
      [targetId]: {
        ...elementStateCollection[targetId],
        left: dragStartElementPointX + (clientX - dragStartPointX),
        top: dragStartElementPointY + (clientY - dragStartPointY),
      }
    })
  }

  function generateElements(count) {
    const selectedElementState = elementStateCollection[targetId];
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

    for (let i = 0; i < count; i++) {
      const left = Math.floor(Math.random() * canvasPanelWidth);
      const top = Math.floor(Math.random() * canvasPanelHeight);
      if (cloneElementWhenAddMultipleElements) {
        cloneElement(JSON.parse(JSON.stringify({
          ...selectedElementState,
          left,
          top
        })))
      } else {
        addNewElement({ left, top })
      }
    }
  }

  const currentSelectedElement = targetId ? elementStateCollection[targetId] : null;
  return (
    <div className="App">
      <Dialog className='add-multiple-dialog' isOpen={openAddMultipleElementsDialog}>
        <div className="add-multiple-dialog-content">
          <FormGroup label="Element Count" inline>
            <NumericInput value={multipleElementsCount} onValueChange={value => setMultipleElementsCount(value)} />
          </FormGroup>
          <FormGroup label="Apply Selected Element Style To All Elements" inline>
            <Switch disabled={!targetId} value={cloneElementWhenAddMultipleElements} onChange={event => toggleCloneElementWhenAddMultipleElements(event.target.checked)} />
          </FormGroup>
        </div>
        <div className="add-multiple-dialog-actions">
          <Button className='add-multiple-dialog-actions-btn' onClick={() => toggleAddMultipleElementsDialog(false)} >Cancel</Button>
          <Button className='add-multiple-dialog-actions-btn' intent='primary' onClick={() => { generateElements(multipleElementsCount); toggleAddMultipleElementsDialog(false) }} >Confirm</Button>
        </div>
      </Dialog>
      <div className="canvas-panel" onMouseMove={mouseMoveOnCanvas} ref={canvasRef}>{Object.keys(elementStateCollection).map(id => {
        const elementState = elementStateCollection[id];
        const border = elementState.border;
        console.log(elementState.transform.translate.x)
        return <div
          onMouseDown={recordMouseDownPosition.bind(this, id)}
          onMouseUp={recordMouseUpPosition}
          onClick={() => setTargetId(id)}
          key={id}
          style={{
            background: elementState.backgroundColor,
            width: elementState.width,
            height: elementState.height,
            top: elementState.top,
            left: elementState.left,
            position: 'absolute',
            borderTop: !elementState.borderEnabled ? 'none' : `${border.top.width}px ${border.top.style} ${border.top.color}`,
            borderBottom: !elementState.borderEnabled ? 'none' : `${border.bottom.width}px ${border.bottom.style} ${border.bottom.color}`,
            borderLeft: !elementState.borderEnabled ? 'none' : `${border.left.width}px ${border.left.style} ${border.left.color}`,
            borderRight: !elementState.borderEnabled ? 'none' : `${border.right.width}px ${border.right.style} ${border.right.color}`,
            boxShadow: createBoxShadowString(elementState.boxShadow),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `translate3d(${elementState.transform.translate.x}px, ${elementState.transform.translate.y}px, ${elementState.transform.translate.z}px)`
          }}>
          {id == targetId && <div className="selected-element-cursor"></div>}
        </div>
      })}</div>
      <div className="control-panel">
        <div className="control-panel-content">
          <div className="control-panel-actions">
            <ButtonGroup fill>
              <Button onClick={addNewElement} icon="plus">Add Single</Button>
              <Button onClick={() => toggleAddMultipleElementsDialog(true)} icon="new-object">Add Multiple</Button>
            </ButtonGroup>
            <FormGroup className='apply-to-all-switch' label="Apply To All" inline>
              <Switch value={applyToAll} onChange={event => toggleApplyToAll(event.target.checked)} />
            </FormGroup>
          </div>
          <SizePanel
            widthValue={getTargetProperty('width')}
            heightValue={getTargetProperty('height')}
            disabled={!targetId}
            onWidthChange={value => updateTargetProperty('width', value)}
            onHeightChange={value => updateTargetProperty('height', value)}
          ></SizePanel>
          <PositionPanel
            onHorizontalTypeChange={event => setPositionHorizontalValue(event.currentTarget.value)}
            onVerticalTypeChange={event => setPositionVerticalValue(event.currentTarget.value)}
            horizontalValue={positionHorizontalValueState == "Right" ? getTargetProperty('right') : getTargetProperty('left')}
            verticalValue={positionVerticalValueState === "Top" ? getTargetProperty('top') : getTargetProperty('bottom')}
            onHorizontalValueChange={value => positionHorizontalValueState === "Right" ? updateTargetProperty('right', value) : updateTargetProperty('left', value)}
            onVerticalValueChange={value => positionVerticalValueState === "Top" ? updateTargetProperty('top', value) : updateTargetProperty('bottom', value)}
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
          </PositionPanel>
          <BackgroundPanel
            color={targetId ? elementStateCollection[targetId].backgroundColor : '#FFFFFF'}
            onColorChange={value => updateTargetProperty('backgroundColor', value.hex)}
          ></BackgroundPanel>
          <TransformPanel
            transform={currentSelectedElement ? currentSelectedElement.transform : null}
            disabled={!currentSelectedElement}
            onTranslateXValueChange={value => updateSingleElement(targetId, updateTransformProperty(currentSelectedElement, 'translate', 'x', value))}
            onTranslateYValueChange={value => updateSingleElement(targetId, updateTransformProperty(currentSelectedElement, 'translate', 'y', value))}
            onTranslateZValueChange={value => updateSingleElement(targetId, updateTransformProperty(currentSelectedElement, 'translate', 'z', value))}
          ></TransformPanel>
          <BorderPanel
            enabeld={targetId ? elementStateCollection[targetId].borderEnabled : false}
            onToggleEnabled={event => updateTargetProperty('borderEnabled', event.target.checked)}
            borderAllInOne={targetId ? elementStateCollection[targetId].borderAllInOne : false}
            onToggleAllInOne={event => !elementStateCollection[targetId].borderAllInOne
              ? updateSingleElement(targetId, enableBorderAllInOne(currentSelectedElement))
              : updateTargetProperty('borderAllInOne', event.target.checked)}
            borders={targetId ? elementStateCollection[targetId].border : null}
            onAllWidthChange={value => updateSingleElement(targetId, updateAllPositionBorderProperty(currentSelectedElement, 'width', value))}
            onAllStyleChange={event => updateSingleElement(targetId, updateAllPositionBorderProperty(currentSelectedElement, 'style', event.target.value))}
            onAllColorChange={value => updateSingleElement(targetId, updateAllPositionBorderProperty(currentSelectedElement, 'color', value.hex))}
            onWidthChange={(position, value) => updateSingleElement(targetId, updateBorderProperty(currentSelectedElement, position, 'width', value))}
            onStyleChange={(position, event) => updateSingleElement(targetId, updateBorderProperty(currentSelectedElement, position, 'style', event.target.value))}
            onColorChange={(position, value) => updateSingleElement(targetId, updateBorderProperty(currentSelectedElement, position, 'color', value.hex))}
          ></BorderPanel>
          <BoxShadowPanel
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
          </BoxShadowPanel>
        </div>
      </div>
    </div >
  );
}

export default App;

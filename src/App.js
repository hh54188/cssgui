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

  function addNewElement({ left = 100, top = 100 }) {
    const id = idSeed++;
    const newElementState = {
      width: 200,
      height: 200,
      top,
      bottom: 0,
      left,
      right: 0,
      backgroundColor: '#FFFFFF',

      borderEnabled: true,
      borderAllInOne: true,
      border: {
        top: {
          width: 1,
          style: 'solid',
          color: 'gray'
        },
        bottom: {
          width: 1,
          style: 'solid',
          color: 'gray'
        },
        left: {
          width: 1,
          style: 'solid',
          color: 'gray'
        },
        right: {
          width: 1,
          style: 'solid',
          color: 'gray'
        },
      },

      boxShadow: [{
        enableInset: false,
        offsetX: 5,
        offsetY: 5,
        blurRadius: 20,
        spreadRadius: 0,
        color: 'grey',
        collapsePanel: false,
        enabled: true
      }]
    }
    setTargetId(id)
    setElementStateCollection({
      ...elementStateCollection,
      [id]: newElementState
    })
  }

  function updateAllPositionBorderProperty(property, value) {
    const originElementState = elementStateCollection[targetId];
    originElementState.border['top'][property] = value;
    originElementState.border['bottom'][property] = value;
    originElementState.border['left'][property] = value;
    originElementState.border['right'][property] = value;
    setElementStateCollection({
      ...elementStateCollection,
      [targetId]: {
        ...originElementState
      }
    })
  }

  function updateBorderProperty(position, property, value) {
    const originElementState = elementStateCollection[targetId];
    originElementState.border[position][property] = value;
    setElementStateCollection({
      ...elementStateCollection,
      [targetId]: {
        ...originElementState
      }
    })
  }

  function enableBorderAllInOne() {
    const originElementState = elementStateCollection[targetId];
    const topBorder = originElementState.border.top;

    originElementState.borderAllInOne = true;
    originElementState.border.left = { ...topBorder }
    originElementState.border.right = { ...topBorder }
    originElementState.border.bottom = { ...topBorder }

    setElementStateCollection({
      ...elementStateCollection,
      [targetId]: {
        ...originElementState
      }
    })
  }

  function createBoxShadowString(boxShadowState) {
    const enabledBoxShadowState = boxShadowState.filter(item => item.enabled);
    let boxShadowStr = ''
    if (enabledBoxShadowState.length) {
      enabledBoxShadowState.forEach(({ enableInset, offsetX, offsetY, blurRadius, spreadRadius, color }, index) => {
        boxShadowStr += `${enableInset ? 'inset' : ''} ${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${color} ${index !== enabledBoxShadowState.length - 1 ? ',' : ''}`;
      })
    } else {
      boxShadowStr = 'none'
    }
    return boxShadowStr
  }

  function addShadow() {
    const originElementState = elementStateCollection[targetId];
    originElementState.boxShadow.push({
      enableInset: false,
      offsetX: 5,
      offsetY: 5,
      blurRadius: 20,
      spreadRadius: 0,
      color: 'grey',
      collapsePanel: false,
      enabled: true
    })
    setElementStateCollection({
      ...elementStateCollection,
      [targetId]: {
        ...originElementState
      }
    })
  }

  function removeShadow(index) {
    const originElementState = elementStateCollection[targetId];
    originElementState.boxShadow.splice(index, 1)
    setElementStateCollection({
      ...elementStateCollection,
      [targetId]: {
        ...originElementState
      }
    })
  }

  function updateShadowProperty(index, name, value) {
    const originElementState = elementStateCollection[targetId];
    originElementState.boxShadow[index][name] = value;
    setElementStateCollection({
      ...elementStateCollection,
      [targetId]: {
        ...originElementState
      }
    })
  }

  function getTargetProperty(name) {
    if (!targetId) {
      return 0;
    }
    return elementStateCollection[targetId][name];
  }

  function updateTargetProperty(name, value) {
    setElementStateCollection({
      ...elementStateCollection,
      [targetId]: {
        ...elementStateCollection[targetId],
        [name]: value
      }
    })
  }

  function moveTopLeft() {
    if (!targetId) {
      return;
    }

    setElementStateCollection({
      ...elementStateCollection,
      [targetId]: {
        ...elementStateCollection[targetId],
        left: 0,
        top: 0
      }
    })
  }

  function moveTopCenter() {
    if (!targetId) {
      return;
    }
    const originElementState = elementStateCollection[targetId];
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

    setElementStateCollection({
      ...elementStateCollection,
      [targetId]: {
        ...elementStateCollection[targetId],
        top: 0,
        left: canvasPanelWidth / 2 - originElementState.width / 2
      }
    })
  }

  function moveTopRight() {
    if (!targetId) {
      return;
    }
    const originElementState = elementStateCollection[targetId];
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

    setElementStateCollection({
      ...elementStateCollection,
      [targetId]: {
        ...elementStateCollection[targetId],
        top: 0,
        left: canvasPanelWidth - originElementState.width
      }
    })
  }

  function moveCenterLeft() {
    if (!targetId) {
      return;
    }
    const originElementState = elementStateCollection[targetId];
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

    setElementStateCollection({
      ...elementStateCollection,
      [targetId]: {
        ...elementStateCollection[targetId],
        top: canvasPanelHeight / 2 - originElementState.height / 2,
        left: 0
      }
    })
  }

  function moveCenterCenter() {
    if (!targetId) {
      return;
    }
    const originElementState = elementStateCollection[targetId];
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

    setElementStateCollection({
      ...elementStateCollection,
      [targetId]: {
        ...elementStateCollection[targetId],
        top: canvasPanelHeight / 2 - originElementState.height / 2,
        left: canvasPanelWidth / 2 - originElementState.width / 2
      }
    })
  }

  function moveCenterRight() {
    if (!targetId) {
      return;
    }
    const originElementState = elementStateCollection[targetId];
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

    setElementStateCollection({
      ...elementStateCollection,
      [targetId]: {
        ...elementStateCollection[targetId],
        top: canvasPanelHeight / 2 - originElementState.height / 2,
        left: canvasPanelWidth - originElementState.width
      }
    })
  }

  function moveBottomLeft() {
    if (!targetId) {
      return;
    }
    const originElementState = elementStateCollection[targetId];
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

    setElementStateCollection({
      ...elementStateCollection,
      [targetId]: {
        ...elementStateCollection[targetId],
        top: canvasPanelHeight - originElementState.height,
        left: 0
      }
    })
  }

  function moveBottomCenter() {
    if (!targetId) {
      return;
    }
    const originElementState = elementStateCollection[targetId];
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

    setElementStateCollection({
      ...elementStateCollection,
      [targetId]: {
        ...elementStateCollection[targetId],
        top: canvasPanelHeight - originElementState.height,
        left: canvasPanelWidth / 2 - originElementState.width / 2
      }
    })
  }

  function moveBottomRight() {
    if (!targetId) {
      return;
    }
    const originElementState = elementStateCollection[targetId];
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

    setElementStateCollection({
      ...elementStateCollection,
      [targetId]: {
        ...elementStateCollection[targetId],
        top: canvasPanelHeight - originElementState.height,
        left: canvasPanelWidth - originElementState.width
      }
    })
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
    const originElementState = elementStateCollection[targetId];
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

    const newElementCollection = {}

    for (let i = 0; i < count; i++) {
      const left = Math.floor(Math.random() * canvasPanelWidth);
      const top = Math.floor(Math.random() * canvasPanelHeight);
      newElementCollection[idSeed++] = {
        width: 200,
        height: 200,
        top,
        bottom: 0,
        left,
        right: 0,
        backgroundColor: '#FFFFFF',

        borderEnabled: true,
        borderAllInOne: true,
        border: {
          top: {
            width: 1,
            style: 'solid',
            color: 'gray'
          },
          bottom: {
            width: 1,
            style: 'solid',
            color: 'gray'
          },
          left: {
            width: 1,
            style: 'solid',
            color: 'gray'
          },
          right: {
            width: 1,
            style: 'solid',
            color: 'gray'
          },
        },

        boxShadow: [{
          enableInset: false,
          offsetX: 5,
          offsetY: 5,
          blurRadius: 20,
          spreadRadius: 0,
          color: 'grey',
          collapsePanel: false,
          enabled: true
        }]
      }
    }

    setElementStateCollection({
      ...elementStateCollection,
      ...newElementCollection,
    })
  }

  return (
    <div className="App">
      <Dialog className='add-multiple-dialog' isOpen={openAddMultipleElementsDialog}>
        <div className="add-multiple-dialog-content">
          <FormGroup label="Element Count" inline>
            <NumericInput value={multipleElementsCount} onValueChange={value => setMultipleElementsCount(value)} />
          </FormGroup>
          <FormGroup label="Apply Selected Element Style To All Elements" inline>
            <Switch />
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
        return <div
          onMouseDown={recordMouseDownPosition.bind(this, id)}
          onMouseUp={recordMouseUpPosition}
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
            boxShadow: createBoxShadowString(elementState.boxShadow)
          }}></div>
      })}</div>
      <div className="control-panel">
        {/* <Tabs id="TabsExample" selectedTabId="rx">
          <Tab id="ng" title="Angular" panel={<div />} />
          <Tab id="mb" title="Ember" panel={<div />} panelClassName="ember-panel" />
          <Tabs.Expander />
        </Tabs> */}
        <div className="control-panel-content">
          <div className="control-panel-actions">
            <ButtonGroup fill>
              <Button onClick={addNewElement} icon="plus">Add Single</Button>
              <Button onClick={() => toggleAddMultipleElementsDialog(true)} icon="new-object">Add Multiple</Button>
            </ButtonGroup>
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

            onMoveTopLeft={moveTopLeft}
            onMoveTopCenter={moveTopCenter}
            onMoveTopRight={moveTopRight}

            onMoveCenterLeft={moveCenterLeft}
            onMoveCenterCenter={moveCenterCenter}
            onMoveCenterRight={moveCenterRight}

            onMoveBottomLeft={moveBottomLeft}
            onMoveBottomCenter={moveBottomCenter}
            onMoveBottomRight={moveBottomRight}
          >
          </PositionPanel>
          <BorderPanel
            enabeld={targetId ? elementStateCollection[targetId].borderEnabled : false}
            onToggleEnabled={event => updateTargetProperty('borderEnabled', event.target.checked)}
            borderAllInOne={targetId ? elementStateCollection[targetId].borderAllInOne : false}
            onToggleAllInOne={event => !elementStateCollection[targetId].borderAllInOne
              ? enableBorderAllInOne()
              : updateTargetProperty('borderAllInOne', event.target.checked)}
            borders={targetId ? elementStateCollection[targetId].border : null}

            onAllWidthChange={value => updateAllPositionBorderProperty('width', value)}
            onAllStyleChange={event => updateAllPositionBorderProperty('style', event.target.value)}
            onAllColorChange={value => updateAllPositionBorderProperty('color', value.hex)}

            onWidthChange={(position, value) => updateBorderProperty(position, 'width', value)}
            onStyleChange={(position, event) => updateBorderProperty(position, 'style', event.target.value)}
            onColorChange={(position, value) => updateBorderProperty(position, 'color', value.hex)}
          ></BorderPanel>
          <BackgroundPanel
            color={targetId ? elementStateCollection[targetId].backgroundColor : '#FFFFFF'}
            onColorChange={value => updateTargetProperty('backgroundColor', value.hex)}
          ></BackgroundPanel>
          <BoxShadowPanel
            boxShadows={targetId ? elementStateCollection[targetId].boxShadow : []}
            onAdd={addShadow}
            onOffsetXChange={(index, value) => updateShadowProperty(index, 'offsetX', value)}
            onOffsetYChange={(index, value) => updateShadowProperty(index, 'offsetY', value)}
            onBlurRadiusChange={(index, value) => updateShadowProperty(index, 'blurRadius', value)}
            onSpreadRadiusChange={(index, value) => updateShadowProperty(index, 'spreadRadius', value)}
            onInsetChange={(index, event) => updateShadowProperty(index, 'enableInset', event.target.checked)}
            onColorChange={(index, value) => updateShadowProperty(index, 'color', value.hex)}
            onEnableShadow={(index) => updateShadowProperty(index, 'enabled', true)}
            onDisableShadow={(index) => updateShadowProperty(index, 'enabled', false)}
            onExpandPanel={(index) => updateShadowProperty(index, 'collapsePanel', false)}
            onHidePanel={(index) => updateShadowProperty(index, 'collapsePanel', true)}
            onDeleteShadow={index => removeShadow(index)}
          >
          </BoxShadowPanel>
        </div>
      </div>
    </div >
  );
}

export default App;

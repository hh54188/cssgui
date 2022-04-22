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
  ControlGroup,
  HTMLSelect,
  Menu,
  MenuItem,
  Classes, Position, Intent
} from '@blueprintjs/core'
import { Tooltip2, Popover2 } from '@blueprintjs/popover2'
import { SketchPicker } from 'react-color';
import SizePanel from './components/size-panel';
import PositionPanel from './components/position-panel';
import BoxShadowPanel from './components/box-shadow-panel';

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

  function addNewElement() {
    const id = idSeed++;
    const newElementState = {
      width: 200,
      height: 200,
      top: 100,
      bottom: 0,
      left: 100,
      right: 0,
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



  function recreateStyleString() {
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


  useEffect(() => {
    recreateStyleString();
  }, [elementStateCollection])

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

  return (
    <div className="App">
      <div className="canvas-panel" onMouseMove={mouseMoveOnCanvas} ref={canvasRef}>{Object.keys(elementStateCollection).map(id => {
        const elementState = elementStateCollection[id];
        return <div
          onMouseDown={recordMouseDownPosition.bind(this, id)}
          onMouseUp={recordMouseUpPosition}
          key={id}
          style={{
            background: '#ffffff',
            width: elementState.width,
            height: elementState.height,
            top: elementState.top,
            left: elementState.left,
            position: 'absolute',
            border: id == targetId ? '3px solid blue' : '1px solid gray',
            boxShadow: createBoxShadowString(elementState.boxShadow)
          }}></div>
      })}</div>
      <div className="control-panel">
        <div className="control-panel-content">
          <Button fill intent={Intent.PRIMARY} onClick={addNewElement} icon="plus" className='add-new-element-btn'>Add Element</Button>
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
          >
          </PositionPanel>

          <BoxShadowPanel
            boxShadows={targetId ? elementStateCollection[targetId].boxShadow : []}
            onAdd={addShadow}
            onOffsetXChange={(index, value) => updateShadowProperty(index, 'offsetX', value)}
            onOffsetYChange={(index, value) => updateShadowProperty(index, 'offsetY', value)}
            onBlurRadiusChange={(index, value) => updateShadowProperty(index, 'blurRadius', value)}
            onSpreadRadiusChange={(index, value) => updateShadowProperty(index, 'spreadRadius', value)}
            onInsetChange={(index, value) => updateShadowProperty(index, 'enableInset', value)}
            onColorChange={(index, value) => updateShadowProperty(index, 'color', value)}
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

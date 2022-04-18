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

let idSeed = 1;

function App() {
  const canvasRef = useRef();

  const [elementStateCollection, setElementStateCollection] = useState({})
  const [target, setTarget] = useState(null)
  const [targetId, setTargetId] = useState(null)

  function addNewElement2() {
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
    setElementStateCollection({
      ...elementStateCollection,
      [id]: newElementState
    })
    console.log(elementStateCollection)
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

  const [positionHorizontalValueState, setPositionHorizontalValue] = useState("Left")
  const [positionVerticalValueState, setPositionVerticalValue] = useState("Top")
  const [boxShadowState, setBoxShadowState] = useState([])


  function recreateStyleString() {
  }

  function addShadow() {
    setBoxShadowState([...boxShadowState, {
      enableInset: false,
      offsetX: 5,
      offsetY: 5,
      blurRadius: 20,
      spreadRadius: 0,
      color: 'grey',
      collapsePanel: false,
      enabled: true
    }])
  }

  function removeShadow(index) {
    boxShadowState.splice(index, 1);
    setBoxShadowState([...boxShadowState])
  }

  function updateShadowProperty(index, name, value) {
    boxShadowState[index][name] = value;
    setBoxShadowState([...boxShadowState])
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
    console.log(elementStateCollection)
  }


  useEffect(() => {
    recreateStyleString();
  }, [elementStateCollection])

  return (
    <div className="App">
      <div className="canvas-panel" ref={canvasRef}>{Object.keys(elementStateCollection).map(id => {
        const elementState = elementStateCollection[id];
        return <div onClick={() => setTargetId(id)} key={id} style={{
          width: elementState.width,
          height: elementState.height,
          top: elementState.top,
          left: elementState.left,
          position: 'absolute',
          border: '1px solid gray',
          boxShadow: createBoxShadowString(elementState.boxShadow)
        }}></div>
      })}</div>
      <div className="control-panel">
        <div className="control-panel-content">
          <Button fill intent={Intent.PRIMARY} onClick={addNewElement2} icon="plus" className='add-new-element-btn'>Add Element</Button>
          <div className="control-panel-group"> <strong>SIZE</strong>
            <Divider></Divider>
            <div className="control-panel-horizontal-layout">
              <div className="control-panel-horizontal-layout-item">
                <FormGroup
                  label="Width"
                  labelFor="width-input"
                >
                  <NumericInput onValueChange={value => updateTargetProperty('width', value)} fill={true} stepSize={1} buttonPosition="right" min={0} value={getTargetProperty('width')} id="width-input" />
                </FormGroup>
              </div>
              <div className="control-panel-horizontal-layout-item">
                <FormGroup
                  label="Height"
                  labelFor="height-input"
                >
                  <NumericInput onValueChange={value => updateTargetProperty('height', value)} fill={true} stepSize={1} buttonPosition="right" min={0} value={getTargetProperty('height')} id="height-input" />
                </FormGroup>
              </div>
            </div>
          </div>

          <div className="control-panel-group position-control-group">
            <strong>POSITION</strong>
            <Divider></Divider>
            <ControlGroup className='position-control' fill={true} vertical={false}>
              <HTMLSelect disabled className='position-control-select' onChange={event => setPositionHorizontalValue(event.currentTarget.value)} value={positionHorizontalValueState} options={['Right', 'Left']} />
              <NumericInput fill={true} stepSize={1} buttonPosition="right" min={0} onValueChange={value => positionHorizontalValueState === "Right" ? updateTargetProperty('right', value) : updateTargetProperty('left', value)} value={positionHorizontalValueState == "Right" ? getTargetProperty('right') : getTargetProperty('left')} id="position-horizaontal-value-input" />
            </ControlGroup>
            <ControlGroup className='position-control' fill={true} vertical={false}>
              <HTMLSelect disabled className='position-control-select' onChange={event => setPositionVerticalValue(event.currentTarget.value)} value={positionVerticalValueState} options={['Top', 'Bottom']} />
              <NumericInput fill={true} stepSize={1} buttonPosition="right" min={0} onValueChange={value => positionVerticalValueState === "Top" ? updateTargetProperty('top', value) : updateTargetProperty('bottom', value)} value={positionVerticalValueState === "Top" ? getTargetProperty('top') : getTargetProperty('bottom')} id="position-vertical-value-input" />
            </ControlGroup>
          </div>

          <div className="control-panel-group">
            <div className="control-panel-group-title">
              <strong>
                <span>BOX-SHADOW</span>
              </strong>
              <div className="control-panel-group-title-action-group">
                <Popover2 content={
                  <Menu>
                    <MenuItem onClick={addShadow} icon="plus" text="Add New" />
                    <MenuItem icon="disable" text="Disable" />
                    <MenuItem icon="duplicate" text="Copy Source Code" />
                    <MenuItem icon="clean" intent="danger" text="Remove All" />
                  </Menu>
                }
                  interactionKind="click">
                  <Button minimal icon="menu"></Button>
                </Popover2>
              </div>
            </div>
            <Divider></Divider>
            {/* {boxShadowState.map(({ enableInset, offsetX, offsetY, blurRadius, spreadRadius, color, collapsePanel, enabled }, index) => {
              return (
                <div key={index}>
                  {!collapsePanel && <div>
                    <div className="control-panel-horizontal-layout">
                      <div className="control-panel-horizontal-layout-item">
                        <FormGroup
                          label="Offset X"
                          labelFor="offsetx-input"
                        >
                          <NumericInput fill={true} stepSize={1} buttonPosition="right" min={0} value={offsetX} onValueChange={value => updateShadowProperty(index, 'offsetX', value)} id="offsetx-input" />
                        </FormGroup>
                      </div>
                      <div className="control-panel-horizontal-layout-item">
                        <FormGroup
                          label="Offset Y"
                          labelFor="offsety-input"
                        >
                          <NumericInput fill={true} stepSize={1} buttonPosition="right" min={0} value={offsetY} onValueChange={value => updateShadowProperty(index, 'offsetY', value)} id="offsety-input" />
                        </FormGroup>
                      </div>
                    </div>
                    <div className="control-panel-horizontal-layout">
                      <div className="control-panel-horizontal-layout-item">
                        <FormGroup
                          label="Blur Radius"
                          labelFor="blur-radius-input"
                        >
                          <NumericInput fill={true} stepSize={1} buttonPosition="right" min={0} value={blurRadius} onValueChange={value => updateShadowProperty(index, 'blurRadius', value)} id="blur-radius-input" />
                        </FormGroup>
                      </div>
                      <div className="control-panel-horizontal-layout-item">
                        <FormGroup
                          label="Spread Radius"
                          labelFor="spread-radius-input"
                        >
                          <NumericInput fill={true} stepSize={1} buttonPosition="right" min={0} value={spreadRadius} onValueChange={value => updateShadowProperty(index, 'spreadRadius', value)} id="spread-radius-input" />
                        </FormGroup>
                      </div>
                    </div>
                    <div className="control-panel-horizontal-layout">
                      <div className="control-panel-horizontal-layout-item">
                        <FormGroup
                          label="Inset"
                          labelFor="enable-inset"
                        >
                          <Switch id="enable-inset" checked={enableInset} onChange={event => { updateShadowProperty(index, 'enableInset', event.target.checked) }}></Switch>
                        </FormGroup>
                      </div>
                      <div className="control-panel-horizontal-layout-item">
                        <FormGroup
                          label="Color"
                          labelFor="color-input"
                        >
                          <InputGroup id="color-input" value={color} onChange={event => updateShadowProperty(index, 'color', event.target.value)} />
                        </FormGroup>
                      </div>
                    </div>
                  </div>}
                  <div className="control-panel-action-group">
                    {enabled
                      ? <Button style={{ float: 'left' }} icon="eye-off" minimal onClick={() => updateShadowProperty(index, 'enabled', false)}></Button>
                      : <Button style={{ float: 'left' }} icon="eye-on" minimal onClick={() => updateShadowProperty(index, 'enabled', true)}></Button>
                    }

                    <Button style={{ float: 'left' }} icon="duplicate" minimal></Button>
                    {collapsePanel
                      ? <Button style={{ float: 'left' }} icon="expand-all" minimal onClick={() => updateShadowProperty(index, 'collapsePanel', false)}></Button>
                      : <Button style={{ float: 'left' }} icon="collapse-all" minimal onClick={() => updateShadowProperty(index, 'collapsePanel', true)}></Button>}
                    <Button style={{ float: 'right' }} icon="trash" minimal intent='danger' onClick={() => removeShadow(index)}></Button>
                  </div>
                  <Divider />
                </div>
              )
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

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

function App() {
  const target = useRef();

  const [widthState, setWidthState] = useState(200)
  const [heightState, setHeightState] = useState(200)

  const [positionHorizontalValueState, setPositionHorizontalValue] = useState("Left")
  const [positionVerticalValueState, setPositionVerticalValue] = useState("Top")

  const [topState, setTopState] = useState(100)
  const [bottomState, setBottomState] = useState(0)
  const [leftState, setLeftState] = useState(100)
  const [rightState, setRightState] = useState(0)

  const [boxShadowState, setBoxShadowState] = useState([])


  function recreateStyleString() {

    let boxShadowStr = ''
    if (boxShadowState.length) {
      boxShadowState.forEach(({ enableInset, offsetX, offsetY, blurRadius, spreadRadius, color }, index) => {
        boxShadowStr += `${enableInset ? 'inset' : ''} ${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${color} ${index !== boxShadowState.length - 1 ? ',' : ''}`;
      })
    } else {
      boxShadowStr = 'none'
    }

    console.log(boxShadowStr)
    target.current.style = `
      width:${widthState}px;
      height:${heightState}px;
      border:1px solid lightgrey;
      position:absolute;
      top:${topState}px;
      left:${leftState}px;
      box-shadow: ${boxShadowStr};`
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

  function updateShadowProperty(index, name, value) {
    boxShadowState[index][name] = value;
    setBoxShadowState([...boxShadowState])
  }


  useEffect(() => {
    recreateStyleString();
  }, [])

  useEffect(() => {
    recreateStyleString();
  }, [
    widthState, heightState,
    topState, bottomState,
    leftState, rightState,
    boxShadowState
  ])

  function onSelected(event) {
    const computedStyle = getComputedStyle(event.target);
    console.log(computedStyle)

    const width = parseInt(computedStyle['width'])
    const height = parseInt(computedStyle['height'])

    const top = parseInt(computedStyle['top'])
    const bottom = parseInt(computedStyle['bottom'])
    const left = parseInt(computedStyle['left'])
    const right = parseInt(computedStyle['right'])

    setWidthState(width)
    setHeightState(height)

    setTopState(top)
    setBottomState(bottom)
    setLeftState(left)
    setRightState(right)
  }
  return (
    <div className="App">
      <div className="canvas-panel">
        <div className="box" ref={target} onClick={onSelected}></div>
      </div>
      <div className="control-panel">
        <div className="control-panel-content">

          <div className="control-panel-group"> <strong>SIZE</strong>
            <Divider></Divider>
            <div className="control-panel-horizontal-layout">
              <div className="control-panel-horizontal-layout-item">
                <FormGroup
                  label="Width"
                  labelFor="width-input"
                >
                  <NumericInput onValueChange={value => setWidthState(value)} fill={true} stepSize={1} buttonPosition="right" min={0} value={widthState} id="width-input" />
                </FormGroup>
              </div>
              <div className="control-panel-horizontal-layout-item">
                <FormGroup
                  label="Height"
                  labelFor="height-input"
                >
                  <NumericInput onValueChange={value => setHeightState(value)} fill={true} stepSize={1} buttonPosition="right" min={0} value={heightState} id="height-input" />
                </FormGroup>
              </div>
            </div>
          </div>

          <div className="control-panel-group position-control-group">
            <strong>POSITION</strong>
            <Divider></Divider>
            <ControlGroup className='position-control' fill={true} vertical={false}>
              <HTMLSelect disabled className='position-control-select' onChange={event => setPositionHorizontalValue(event.currentTarget.value)} value={positionHorizontalValueState} options={['Right', 'Left']} />
              <NumericInput fill={true} stepSize={1} buttonPosition="right" min={0} onValueChange={value => positionHorizontalValueState === "Right" ? setRightState(value) : setLeftState(value)} value={positionHorizontalValueState == "Right" ? rightState : leftState} id="position-horizaontal-value-input" />
            </ControlGroup>
            <ControlGroup className='position-control' fill={true} vertical={false}>
              <HTMLSelect disabled className='position-control-select' onChange={event => setPositionVerticalValue(event.currentTarget.value)} value={positionVerticalValueState} options={['Top', 'Bottom']} />
              <NumericInput fill={true} stepSize={1} buttonPosition="right" min={0} onValueChange={value => positionVerticalValueState === "Top" ? setTopState(value) : setBottomState(value)} value={positionVerticalValueState === "Top" ? topState : bottomState} id="position-vertical-value-input" />
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
            {boxShadowState.map(({ enableInset, offsetX, offsetY, blurRadius, spreadRadius, color, collapsePanel, enabled }, index) => {
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
                    <Button style={{ float: 'left' }} icon="eye-off" minimal></Button>
                    <Button style={{ float: 'left' }} icon="duplicate" minimal></Button>
                    {collapsePanel
                      ? <Button style={{ float: 'left' }} icon="expand-all" minimal onClick={() => updateShadowProperty(index, 'collapsePanel', false)}></Button>
                      : <Button style={{ float: 'left' }} icon="collapse-all" minimal onClick={() => updateShadowProperty(index, 'collapsePanel', true)}></Button>}
                    <Button style={{ float: 'right' }} icon="trash" minimal intent='danger'></Button>
                  </div>
                  <Divider />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

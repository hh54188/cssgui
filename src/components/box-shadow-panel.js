import React from 'react';
import { useState } from 'react'
import {
  FormGroup,
  InputGroup,
  Divider,
  Switch,
  Icon,
  Button,
  ControlGroup,
  Menu,
  MenuItem,
  Collapse,
} from '@blueprintjs/core'
import {NumericInput} from './numeric-input'
import { Popover2 } from '@blueprintjs/popover2'
import { SketchPicker } from 'react-color';
import { useCoreDataStore } from '../store/core'
import { createBoxShadowString } from '../utils/style'
import {performanceOptimize} from "./performance-optimize-wrap";

function BoxShadowPanel({
  disabled = false,
  onAdd,
  boxShadows,
  onOffsetXChange,
  onOffsetYChange,
  onBlurRadiusChange,
  onSpreadRadiusChange,
  onInsetChange,
  onColorChange,
  onEnableShadow,
  onDisableShadow,
  onExpandPanel,
  onHidePanel,
  onDeleteShadow
}) {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="control-panel-group">
      <div className="control-panel-group-title">
        <strong>
          {isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-up" onClick={() => setIsOpen(false)}></Icon>}
          {!isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-down" onClick={() => setIsOpen(true)}></Icon>}
          <span  onClick={() => setIsOpen(!isOpen)}  className='control-panel-title'>BOX-SHADOW</span>
        </strong>
        <div className="control-panel-group-title-action-group">
          <Popover2 content={
            <Menu>
              <MenuItem disabled={disabled} onClick={onAdd} icon="plus" text="Add New" />
            </Menu>
          }
            interactionKind="click">
            <Button minimal icon="menu"></Button>
          </Popover2>
        </div>
      </div>
      <Divider></Divider>
      <Collapse isOpen={isOpen}>
        {boxShadows && boxShadows.map(({ enableInset, offsetX, offsetY, blurRadius, spreadRadius, color, collapsePanel, enabled }, index) => {
          return (
            <div key={index}>
              {!collapsePanel && <div>
                <div className="control-panel-horizontal-layout">
                  <div className="control-panel-horizontal-layout-item">
                    <FormGroup label="Offset X">
                      <NumericInput
                        fill={true}
                        value={offsetX}
                        onValueChange={onOffsetXChange.bind(this, index)}
                      />
                    </FormGroup>
                  </div>
                  <div className="control-panel-horizontal-layout-item">
                    <FormGroup label="Offset Y">
                      <NumericInput
                        fill={true}
                        value={offsetY}
                        onValueChange={onOffsetYChange.bind(this, index)} />
                    </FormGroup>
                  </div>
                </div>
                <div className="control-panel-horizontal-layout">
                  <div className="control-panel-horizontal-layout-item">
                    <FormGroup label="Blur Radius">
                      <NumericInput
                        fill={true}
                        value={blurRadius}
                        onValueChange={onBlurRadiusChange.bind(this, index)}
                      />
                    </FormGroup>
                  </div>
                  <div className="control-panel-horizontal-layout-item">
                    <FormGroup label="Spread Radius">
                      <NumericInput
                        fill={true}
                        value={spreadRadius}
                        onValueChange={onSpreadRadiusChange.bind(this, index)}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="control-panel-horizontal-layout">
                  <div className="control-panel-horizontal-layout-item">
                    <FormGroup label="Inset">
                      <Switch
                        checked={enableInset}
                        onChange={onInsetChange.bind(this, index)}
                      ></Switch>
                    </FormGroup>
                  </div>
                  <div className="control-panel-horizontal-layout-item">
                    <FormGroup label="Color">
                      <Popover2 content={
                        <SketchPicker color={color} onChange={onColorChange.bind(this, index)}></SketchPicker>
                      }
                        interactionKind="click">
                        <ControlGroup className='position-control' fill={true} vertical={false}>
                          <div className='color-indicator'>
                            <div className='color-indicator-content' style={{ background: color }} ></div>
                          </div>
                          <InputGroup id="color-input" value={color} onChange={() => { }} />
                        </ControlGroup>
                      </Popover2>
                    </FormGroup>
                  </div>
                </div>
              </div>}
              <div className="control-panel-action-group">
                {enabled
                  ? <Button style={{ float: 'left' }} icon="eye-off" minimal onClick={onDisableShadow.bind(this, index)}></Button>
                  : <Button style={{ float: 'left' }} icon="eye-on" minimal onClick={onEnableShadow.bind(this, index)}></Button>
                }
                {/* <Button style={{ float: 'left' }} icon="duplicate" minimal></Button> */}
                {collapsePanel
                  ? <Button style={{ float: 'left' }} icon="expand-all" minimal onClick={onExpandPanel.bind(this, index)}></Button>
                  : <Button style={{ float: 'left' }} icon="collapse-all" minimal onClick={onHidePanel.bind(this, index)}></Button>}
                <Button style={{ float: 'right' }} icon="trash" minimal intent='danger' onClick={onDeleteShadow.bind(this, index)}></Button>
              </div>
              <Divider />
            </div>
          )
        })}
      </Collapse>
    </div>
  )
}

const OptimizedBoxShadowContainer = performanceOptimize(BoxShadowPanel)(null, function (prevPops, nextProps) {
  const { boxShadows: oldBoxShadows} = prevPops;
  const { boxShadows: newBoxShadows} = nextProps;

  const oldShadowEnabledStates = oldBoxShadows.map(shadow => shadow.enabled).join(',');
  const newShadowEnabledStates = newBoxShadows.map(shadow => shadow.enabled).join(',');

  const oldShadowCollapseStates = oldBoxShadows.map(shadow => shadow.collapsePanel).join(',');
  const newShadowCollapseStates = newBoxShadows.map(shadow => shadow.collapsePanel).join(',');

  if (createBoxShadowString(oldBoxShadows) !== createBoxShadowString(newBoxShadows)
      || oldShadowEnabledStates !== newShadowEnabledStates
      || oldShadowCollapseStates !== newShadowCollapseStates) {
    return true
  }
  return false;
})

function BoxShadowContainer() {
  const dataState = useCoreDataStore();
  const { getTargetStyle, removeShadow, addShadow, updateShadow, targetId} = dataState;

  return <OptimizedBoxShadowContainer
    key={targetId}
    disabled={!targetId}
    boxShadows={targetId ? getTargetStyle("boxShadow") : []}
    onAdd={addShadow}
    onOffsetXChange={(index, value) => updateShadow(index, 'offsetX', value)}
    onOffsetYChange={(index, value) => updateShadow(index, 'offsetY', value)}
    onBlurRadiusChange={(index, value) => updateShadow(index, 'blurRadius', value)}
    onSpreadRadiusChange={(index, value) => updateShadow(index, 'spreadRadius', value)}
    onInsetChange={(index, event) => updateShadow(index, 'enableInset', event.target.checked)}
    onColorChange={(index, value) => updateShadow(index, 'color', value.hex)}
    onEnableShadow={(index) => updateShadow(index, 'enabled', true)}
    onDisableShadow={(index) => updateShadow(index, 'enabled', false)}
    onExpandPanel={(index) => updateShadow(index, 'collapsePanel', false)}
    onHidePanel={(index) => updateShadow(index, 'collapsePanel', true)}
    onDeleteShadow={index => removeShadow(index)}
  >
  </OptimizedBoxShadowContainer>

}

export default BoxShadowContainer

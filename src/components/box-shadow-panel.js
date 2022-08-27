import React from 'react';
import { useState } from 'react'
import {
  FormGroup,
  InputGroup,
  NumericInput,
  Divider,
  Switch,
  Icon,
  Button,
  ControlGroup,
  Menu,
  MenuItem,
  Collapse,
} from '@blueprintjs/core'
import { Popover2 } from '@blueprintjs/popover2'
import { SketchPicker } from 'react-color';
import { useDataStore } from '../store/data'
import { useUIStore } from '../store/ui'

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
          <span>BOX-SHADOW</span>
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
                        stepSize={1}
                        buttonPosition="right"
                        min={-9999}
                        value={offsetX}
                        onValueChange={onOffsetXChange.bind(this, index)}
                      />
                    </FormGroup>
                  </div>
                  <div className="control-panel-horizontal-layout-item">
                    <FormGroup label="Offset Y">
                      <NumericInput
                        fill={true}
                        stepSize={1}
                        buttonPosition="right"
                        min={-9999}
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
                        stepSize={1}
                        buttonPosition="right"
                        min={-9999}
                        value={blurRadius}
                        onValueChange={onBlurRadiusChange.bind(this, index)}
                      />
                    </FormGroup>
                  </div>
                  <div className="control-panel-horizontal-layout-item">
                    <FormGroup label="Spread Radius">
                      <NumericInput
                        fill={true}
                        stepSize={1}
                        buttonPosition="right"
                        min={-9999}
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
                <Button style={{ float: 'left' }} icon="duplicate" minimal></Button>
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

function BoxShadowContainer() {
  const dataState = useDataStore();
  const UIState = useUIStore()
  const { getTargetStyle, removeShadow, addShadow, updateShadow} = dataState;
  const { targetId } = UIState

  return <BoxShadowPanel
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
  onExpandPanel={(index) => updateShadow(index,'collapsePanel', false)}
  onHidePanel={(index) => updateShadow( index,'collapsePanel', true)}
  onDeleteShadow={index => removeShadow(index)}
>
</BoxShadowPanel>

}

export default BoxShadowContainer

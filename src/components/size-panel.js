import React from 'react';
import { useState } from 'react'
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
  Collapse,
  Classes, Position, Intent
} from '@blueprintjs/core'
import { Tooltip2, Popover2 } from '@blueprintjs/popover2'
import { SketchPicker } from 'react-color';
function SizePanel({
  widthValue,
  heightValue,
  onWidthChange,
  onHeightChange,
  disabled = true,
}) {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="control-panel-group">
      {isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-up" onClick={() => setIsOpen(false)}></Icon>}
      {!isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-down" onClick={() => setIsOpen(true)}></Icon>}
      <strong>SIZE</strong>
      <Divider></Divider>
      <Collapse isOpen={isOpen}>
        <div className="control-panel-horizontal-layout">
          <div className="control-panel-horizontal-layout-item">
            <FormGroup
              label="Width"
              labelFor="width-input"
            >
              <NumericInput
                disabled={disabled}
                onValueChange={onWidthChange}
                fill={true}
                stepSize={1}
                buttonPosition="right"
                min={-9999}
                value={widthValue}
                id="width-input"
              />
            </FormGroup>
          </div>
          <div className="control-panel-horizontal-layout-item">
            <FormGroup
              label="Height"
              labelFor="height-input"
            >
              <NumericInput
                disabled={disabled}
                onValueChange={onHeightChange}
                fill={true}
                stepSize={1}
                buttonPosition="right"
                min={-9999}
                value={heightValue}
                id="height-input"
              />
            </FormGroup>
          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default SizePanel
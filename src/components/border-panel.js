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
function BorderPanel({
  enabeld = false,
  onToggleEnabled,
  borderAllInOne = true,
  onToggleAllInOne,
  borders,
  onAllWidthChange,
  onAllStyleChange,
  onAllColorChange,
  onWidthChange,
  onStyleChange,
  onColorChange
}) {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="control-panel-group">
      {isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-up" onClick={() => setIsOpen(false)}></Icon>}
      {!isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-down" onClick={() => setIsOpen(true)}></Icon>}
      <strong>BORDER</strong>
      <Divider></Divider>
      <Collapse isOpen={isOpen}>
        <div className="control-panel-horizontal-layout border-group-toggles">
          <div className="control-panel-horizontal-layout-item">
            <Switch
              disabled={!borders}
              checked={enabeld}
              onChange={onToggleEnabled}
            >Enabled</Switch>
          </div>
          <div className="control-panel-horizontal-layout-item">
            <Switch
              disabled={!borders}
              checked={borderAllInOne}
              onChange={onToggleAllInOne}
            >All In One</Switch>
          </div>
        </div>
        {borders && borderAllInOne && <div>
          <ControlGroup fill={true} vertical={false}>
            <div className="control-panel-border-layout">
              <div className="control-panel-border-layout-label-item">
                <span>Border</span>
              </div>
              <div className="control-panel-border-layout-width-item">
                <NumericInput
                  fill={true}
                  stepSize={1}
                  buttonPosition="right"
                  min={0}
                  value={borders.top.width}
                  onValueChange={onAllWidthChange}
                />
              </div>
              <div className="control-panel-border-layout-style-item">
                <HTMLSelect
                  value={borders.top.style}
                  onChange={onAllStyleChange}
                  options={['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']} />
              </div>
              <div className="control-panel-border-layout-color-item">
                <Popover2 content={
                  <SketchPicker
                    color={borders.top.color}
                    onChange={onAllColorChange}
                  ></SketchPicker>
                }
                  interactionKind="click">
                  <div className='border-color-indicator'>
                    <div className='border-color-indicator-content' style={{ backgroundColor: borders.top.color }}></div>
                  </div>
                </Popover2>
              </div>
            </div>
          </ControlGroup>
        </div>}
        {borders && !borderAllInOne && Object.keys(borders).map(position => {
          const { width, style, color } = borders[position]
          return (
            <div key={position}>
              <ControlGroup fill={true} vertical={false}>
                <div className="control-panel-border-layout">
                  <div className="control-panel-border-layout-label-item">
                    <span>{position}</span>
                  </div>
                  <div className="control-panel-border-layout-width-item">
                    <NumericInput
                      fill={true}
                      stepSize={1}
                      buttonPosition="right"
                      min={0}
                      value={width}
                      onValueChange={onWidthChange.bind(this, position)}
                    />
                  </div>
                  <div className="control-panel-border-layout-style-item">
                    <HTMLSelect
                      value={style}
                      onChange={onStyleChange.bind(this, position)}
                      options={['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']} />
                  </div>
                  <div className="control-panel-border-layout-color-item">
                    <Popover2 content={
                      <SketchPicker
                        color={color}
                        onChange={onColorChange.bind(this, position)}
                      ></SketchPicker>
                    }
                      interactionKind="click">
                      <div className='border-color-indicator'>
                        <div className='border-color-indicator-content' style={{ backgroundColor: color }}></div>
                      </div>
                    </Popover2>
                  </div>
                </div>
              </ControlGroup>
            </div>
          )
        })}
      </Collapse>
    </div>
  )
}

export default BorderPanel
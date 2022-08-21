import React from 'react';
import { useState, useMemo } from 'react'
import {
  FormGroup,
  InputGroup,
  Divider,
  Icon,
  ControlGroup,
  Collapse,
} from '@blueprintjs/core'
import { Popover2 } from '@blueprintjs/popover2'
import { SketchPicker } from 'react-color';
import { useDataStore } from '../store/data'

function BackgroundPanelContainer() {
  const dataState = useDataStore();
  const { getTargetStyle, updateTargetStyle } = dataState;

  const color = getTargetStyle("backgroundColor") || '#FFFFFF';
  const onColorChange = value => updateTargetStyle('backgroundColor', value.hex);

  return <BackgroundPanel
    color={color}
    onColorChange={onColorChange}
  ></BackgroundPanel>
}

const areEqual = (prevProps, nextProps) => {
  const { color: prevColor } = prevProps;
  const { color: nextColor } = nextProps;

  if (prevColor === nextColor) {
    return true;
  }
  return false;
}

const BackgroundPanel = React.memo(({ color, onColorChange }) => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="control-panel-group">
      {isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-up" onClick={() => setIsOpen(false)}></Icon>}
      {!isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-down" onClick={() => setIsOpen(true)}></Icon>}
      <strong>BACKGROUND COLOR</strong>
      <Divider></Divider>
      <Collapse isOpen={isOpen}>
        <div className="control-panel-horizontal-layout">
          <FormGroup>
            <Popover2 content={
              <SketchPicker color={color} onChange={onColorChange}></SketchPicker>
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
      </Collapse>
    </div>
  )
}, areEqual)

export default BackgroundPanelContainer;
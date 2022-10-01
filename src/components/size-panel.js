import React from 'react';
import { useState } from 'react'
import {
  FormGroup,
  NumericInput,
  Divider,
  Icon,
  Collapse,
} from '@blueprintjs/core'

import { useCoreDataStore } from '../store/core'
import { performanceOptimize } from './performance-optimize-wrap'

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
      <strong  onClick={() => setIsOpen(!isOpen)} className='control-panel-title'>SIZE</strong>
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

const OptimizedSizePanelContainer = performanceOptimize(SizePanel)(
  ['widthValue', 'heightValue', 'disabled']
);

function SizePanelContainer() {
  const dataState = useCoreDataStore();
  const { getTargetStyle, updateTargetStyle, targetId } = dataState;

  const width = getTargetStyle("width");
  const height = getTargetStyle("height");

  const onWidthChange = value => updateTargetStyle('width', value);
  const onHeightChange = value => updateTargetStyle('height', value);

  return <OptimizedSizePanelContainer
      widthValue={width}
      heightValue={height}
      onWidthChange={onWidthChange}
      onHeightChange={onHeightChange}
      disabled={!targetId}
    >
  </OptimizedSizePanelContainer>
}

export default SizePanelContainer

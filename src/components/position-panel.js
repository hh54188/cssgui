import React from 'react';
import { useState } from 'react'
import {
  Divider,
  Icon,
  Button,
  ControlGroup,
  HTMLSelect,
  Collapse,
} from '@blueprintjs/core'
import {NumericInput} from './numeric-input'
import {useCoreDataStore} from "../store/core";
import {useUIStore} from "../store/ui";
import {performanceOptimize} from "./performance-optimize-wrap";
function PositionPanel({
  forceSync = false,
  onHorizontalTypeChange,
  onVerticalTypeChange,
  horizontalValue,
  verticalValue,
  onHorizontalValueChange,
  onVerticalValueChange,
  disabled = true,
  onMoveTopLeft,
  onMoveTopCenter,
  onMoveTopRight,
  onMoveCenterLeft,
  onMoveCenterCenter,
  onMoveCenterRight,
  onMoveBottomLeft,
  onMoveBottomCenter,
  onMoveBottomRight,
}) {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="control-panel-group position-control-group">
      {isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-up" onClick={() => setIsOpen(false)}></Icon>}
      {!isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-down" onClick={() => setIsOpen(true)}></Icon>}
      <strong  onClick={() => setIsOpen(!isOpen)} className='control-panel-title'>POSITION</strong>
      <Divider></Divider>
      <Collapse isOpen={isOpen}>
        <ControlGroup className='position-control' fill={true} vertical={false}>
          <HTMLSelect
            disabled
            className='position-control-select'
            onChange={onHorizontalTypeChange}
            value={"Left"}
            options={['Right', 'Left']} />
          <NumericInput
            forceSync={forceSync}
            disabled={disabled}
            fill={true}
            onValueChange={onHorizontalValueChange}
            value={horizontalValue}
            id="position-horizaontal-value-input"
          />
        </ControlGroup>
        <ControlGroup className='position-control' fill={true} vertical={false}>
          <HTMLSelect
            disabled
            className='position-control-select'
            onChange={onVerticalTypeChange}
            value={"Top"}
            options={['Top', 'Bottom']}
          />
          <NumericInput
            forceSync={forceSync}
            disabled={disabled}
            fill={true}
            onValueChange={onVerticalValueChange}
            value={verticalValue}
            id="position-vertical-value-input"
          />
        </ControlGroup>
        <div className="position-map">
          <div className="position-map-row position-map-top-row">
            <Button onClick={onMoveTopLeft} icon="arrow-top-left" className='position-map-btn position-map-top-left-btn' minimal></Button>
            <Button onClick={onMoveTopCenter} icon="arrow-up" className='position-map-btn position-map-top-center-btn' minimal></Button>
            <Button onClick={onMoveTopRight} icon="arrow-top-right" className='position-map-btn position-map-top-right-btn' minimal></Button>
          </div>

          <div className="position-map-row position-map-center-row">
            <Button onClick={onMoveCenterLeft} icon="arrow-left" className='position-map-btn position-map-center-left-btn' minimal></Button>
            <Button onClick={onMoveCenterCenter} icon="move" className='position-map-btn position-map-center-center-btn' minimal></Button>
            <Button onClick={onMoveCenterRight} icon="arrow-right" className='position-map-btn position-map-center-right-btn' minimal></Button>
          </div>

          <div className="position-map-row position-map-bottom-row">
            <Button onClick={onMoveBottomLeft} icon="arrow-bottom-left" className='position-map-btn position-map-bottom-left-btn' minimal></Button>
            <Button onClick={onMoveBottomCenter} icon="arrow-down" className='position-map-btn position-map-bottom-center-btn' minimal></Button>
            <Button onClick={onMoveBottomRight} icon="arrow-bottom-right" className='position-map-btn position-map-bottom-right-btn' minimal></Button>
          </div>
        </div>
      </Collapse>
    </div>
  )
}

const OptimizedPositionPanelContainer = performanceOptimize(PositionPanel)(
  ['horizontalValue', 'verticalValue', 'forceSync']
);

function PositionPanelContainer() {
  const dataState = useCoreDataStore();
  const UIState = useUIStore()
  const [force, setForce] = useState(false)
  const {
    getTargetStyle,
    updateTargetStyle,
    moveTopLeft,
    moveTopCenter,
    moveTopRight,
    moveCenterLeft,
    moveCenterCenter,
    moveCenterRight,
    moveBottomLeft,
    moveBottomCenter,
    moveBottomRight,
    targetId
  } = dataState;
  const {
    setPositionHorizontalValue,
    setPositionVerticalValue,
    positionHorizontalValueState,
    positionVerticalValueState,
    dragBegin
  } = UIState;

  return <OptimizedPositionPanelContainer
    forceSync={dragBegin || force}
    onHorizontalTypeChange={event => setPositionHorizontalValue(event.currentTarget.value)}
    onVerticalTypeChange={event => setPositionVerticalValue(event.currentTarget.value)}
    horizontalValue={positionHorizontalValueState == "Right" ? getTargetStyle('right') : getTargetStyle('left')}
    verticalValue={positionVerticalValueState === "Top" ? getTargetStyle('top') : getTargetStyle('bottom')}
    onHorizontalValueChange={value => positionHorizontalValueState === "Right" ? updateTargetStyle('right', value) : updateTargetStyle('left', value)}
    onVerticalValueChange={value => positionVerticalValueState === "Top" ? updateTargetStyle('top', value) : updateTargetStyle('bottom', value)}
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
  </OptimizedPositionPanelContainer>
}

export default PositionPanelContainer

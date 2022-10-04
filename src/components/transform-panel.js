import React from 'react';
import { useState } from 'react'
import {
  FormGroup,
  Divider,
  Icon,
  Button,
  Collapse,
  Slider
} from '@blueprintjs/core'
import {NumericInput} from './numeric-input'
import { AnglePicker } from 'react-linear-gradient-picker';
import {useCoreDataStore} from "../store/core";
import { createTransformString } from '../utils/style'
import {performanceOptimize} from "./performance-optimize-wrap";
function TransformPanel({
  transform,
  onValueChange,
  onResetTranslate,
  onResetScale,
  onResetSkew,
  disabled = true,
}) {
  const [isOpen, setIsOpen] = useState(true)
  const [angle, setAngle] = useState(25);
  const [slideValue, setSlideValue] = useState(1)
  return (
    <div className="control-panel-group">
      {isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-up" onClick={() => setIsOpen(false)}></Icon>}
      {!isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-down" onClick={() => setIsOpen(true)}></Icon>}
      <strong>TRANSFORM</strong>
      <Divider></Divider>
      {transform && <Collapse isOpen={isOpen}>
        <div className="control-panel-horizontal-layout">
          <div className="control-panel-horizontal-layout-item">
            <div className='control-panel-transform-group-subtitle'>
              <strong>Translate</strong>
              <Button minimal icon="reset" onClick={onResetTranslate}>Reset</Button>
            </div>
            {Object.keys(transform.translate).map(coordinate => {
              return <FormGroup label={`Translate${coordinate.toLocaleUpperCase()}`} inline key={coordinate}>
                <NumericInput
                  disabled={disabled}
                  onValueChange={value => onValueChange(value, 'translate', coordinate)}
                  fill={true}
                  value={transform.translate[coordinate]}
                />
              </FormGroup>
            })}
            <div className='control-panel-transform-group-subtitle' style={{ paddingTop: 0 }}>
              <strong>Scale</strong>
              <Button minimal icon="reset" onClick={onResetScale}>Reset</Button>
            </div>
            {Object.keys(transform.scale).map(coordinate => {
              return <FormGroup label={`Scale${coordinate.toLocaleUpperCase()}`} inline key={coordinate}>
                <div className='transform-slider-container'>
                  <Slider
                    min={0}
                    max={20}
                    stepSize={0.1}
                    labelStepSize={10}
                    value={transform.scale[coordinate]}
                    onChange={value => onValueChange(value, 'scale', coordinate)}
                  />
                </div>
              </FormGroup>
            })}
            <div className='control-panel-transform-group-subtitle' style={{ paddingTop: 0 }}>
              <strong>Skew</strong>
              <Button minimal icon="reset" onClick={onResetSkew}>Reset</Button>
            </div>
            <div className='transform-skew-container'>
              {Object.keys(transform.skew).map(coordinate => {
                return <FormGroup key={coordinate} label={`Skew${coordinate.toLocaleUpperCase()}`} inlkey={coordinate}>
                  <div>
                    <AnglePicker angle={transform.skew[coordinate]} setAngle={value => onValueChange(value, 'skew', coordinate)} />
                  </div>
                </FormGroup>
              })}
            </div>
            {/* <div className='control-panel-transform-group-subtitle' style={{ paddingTop: 0 }}>
              <strong>Rotate</strong>
              <Button minimal icon="reset" onClick={onResetSkew}>Reset</Button>
            </div> */}
            {/* {Object.keys(transform.rotate).map(coordinate => {
              return <FormGroup label={`Rotate${coordinate.toLocaleUpperCase()}`} inline key={coordinate}>
                <div className='transform-slider-container'>
                  <Slider
                    min={0}
                    max={360}
                    stepSize={1}
                    labelStepSize={180}
                    value={transform.rotate[coordinate]}
                    onChange={value => onValueChange(value, 'rotate', coordinate)}
                  />
                </div>
              </FormGroup>
            })} */}
          </div>
        </div>
      </Collapse>}
    </div>
  )
}

const OptimizedTransformPanelContainer = performanceOptimize(TransformPanel)(null, function (prevProps, nextProps) {
  const {disabled: oldDisabled, transform: oldTransform} = prevProps;
  const {disabled: newDisabled, transform: newTransform} = nextProps;

  if (newDisabled !== oldDisabled) {
    return true;
  }
  if (createTransformString(oldTransform) !== createTransformString(newTransform)) {
    return true;
  }
  return false
});

function TransformPanelContainer() {
  const dataState = useCoreDataStore();
  const {targetId, getTargetStyle, updateTransform, resetTranslate, resetScale, resetSkew} = dataState;

  return <OptimizedTransformPanelContainer
    key={targetId}
    transform={targetId ? getTargetStyle("transform"): null}
    disabled={!targetId}
    onValueChange={(value, type, coordinate) => updateTransform(type, coordinate, value)}
    onResetTranslate={resetTranslate}
    onResetScale={resetScale}
    onResetSkew={resetSkew}
  ></OptimizedTransformPanelContainer>
}
export default TransformPanelContainer

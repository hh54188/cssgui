import React from 'react';
import {
  FormGroup,
  NumericInput,
  Switch,
  Button,
  ButtonGroup,
  Dialog,
  Divider,
  HTMLSelect,
  Slider,
  Checkbox
} from '@blueprintjs/core'
import { Popover2 } from '@blueprintjs/popover2'
import {useDataStore} from "../store/data";
import {useUIStore} from "../store/ui";
import {performanceOptimize} from "./performance-optimize-wrap";

function AnimationPanel({
  animation,
  onMetaChange,
  onPropertyChange,
  onSaveStartStatus,
  onSaveEndStatus,
  onPlayAnimation,
  onStopAnimation,
}) {
  const disabled = !animation;
  const disableSaveStatus = animation && Object.values(animation.animatedProperties).every(property => !property);
  return (
    <div className="animation-panel">
      <div className='animation-panel-content'>
        <div className="control-panel-group ">
          <strong>ACTION</strong>
          <Divider></Divider>
          <div className="control-panel-content animation-group">
            <ButtonGroup fill>
              <Button disabled={disabled} icon="play" onClick={onPlayAnimation}>Play</Button>
              <Button disabled={disabled} icon="stop" onClick={onStopAnimation}>Stop</Button>
            </ButtonGroup>
            {/*<Button disabled={disabled} intent='danger' icon="trash" fill style={{ marginTop: 10 }}>Delete</Button>*/}
          </div>
        </div>
        <div className="control-panel-group ">
          <strong>ANIMATION</strong>
          <Divider></Divider>
          {!disabled && <div className="control-panel-content animation-group">
            <FormGroup label="Duration">
              <Slider
                className="animation-slider"
                stepSize={0.1}
                min={0}
                max={10}
                value={animation.duration}
                labelStepSize={5}
                onChange={value => onMetaChange('duration', value)}
              ></Slider>
            </FormGroup>
            <FormGroup label="Delay">
              <Slider
                className="animation-slider"
                stepSize={0.1}
                min={0}
                max={10}
                labelStepSize={5}
                value={animation.delay}
                onChange={value => onMetaChange('delay', value)}
              ></Slider>
            </FormGroup>
            <div className="control-panel-horizontal-layout">
              <div className="control-panel-horizontal-layout-item">
                <FormGroup label="Timing">
                  <HTMLSelect
                    value={animation.timing}
                    onChange={event => onMetaChange('timing', event.target.value)}
                    options={['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']} />
                </FormGroup>
              </div>
              <div className="control-panel-horizontal-layout-item">
                <FormGroup label="Properties">
                  <Popover2 content={
                    <div className='animation-property-selector'>
                      <Checkbox checked={animation.animatedProperties.size} label="Size" onChange={event => onPropertyChange('size', event.target.checked)} />
                      <Checkbox checked={animation.animatedProperties.position} label="Position" onChange={event => onPropertyChange('position', event.target.checked)} />
                      <Checkbox checked={animation.animatedProperties.background} label="Background" onChange={event => onPropertyChange('background', event.target.checked)} />
                      <Checkbox checked={animation.animatedProperties.border} label="Border" onChange={event => onPropertyChange('border', event.target.checked)} />
                      <Checkbox checked={animation.animatedProperties.boxShadow} label="Box Shadow" onChange={event => onPropertyChange('boxShadow', event.target.checked)} />
                      <Checkbox checked={animation.animatedProperties.translate} label="Translate" onChange={event => onPropertyChange('translate', event.target.checked)} />
                      <Checkbox checked={animation.animatedProperties.scale} label="Scale" onChange={event => onPropertyChange('scale', event.target.checked)} />
                      <Checkbox checked={animation.animatedProperties.skew} label="Skew" onChange={event => onPropertyChange('skew', event.target.checked)} />
                    </div>
                  }
                    interactionKind="click">
                    <Button disabled={disabled} icon="cog" fill>Config</Button>
                  </Popover2>
                </FormGroup>
              </div>
            </div>
          </div>}
        </div>
        <div className='control-panel-group animation-timeline-group'>
          <strong>Start</strong>
          <Divider></Divider>
          <div className="control-panel-content animation-group">
            <Button disabled={disabled || disableSaveStatus} icon="saved" fill onClick={onSaveStartStatus}>Save As Start Status</Button>
            {animation && animation.animationTimeline && animation.animationTimeline[0] && <div>
              {animation.animationTimeline[0].map((value, index) => {
                return <span className='animation-status-label' key={index}>{value}<br></br></span>
              })}
            </div>}
          </div>
        </div>
        <div className='control-panel-group animation-timeline-group'>
          <strong>End</strong>
          <Divider></Divider>
          <div className="control-panel-content animation-group">
            <Button disabled={disabled || disableSaveStatus} icon="saved" fill onClick={onSaveEndStatus}>Save As End Status</Button>
            {animation && animation.animationTimeline && animation.animationTimeline[1] && <div>
              {animation.animationTimeline[1].map((value, index) => {
                return <span className='animation-status-label' key={index}>{value}<br></br></span>
              })}
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

const OptimizedAnimationPanel = performanceOptimize(AnimationPanel)(null, function (prevProps, nextProps) {
  const {animation: oldAnimation} = prevProps;
  const {animation: newAnimation} = nextProps;

  if (JSON.stringify(oldAnimation) !== JSON.stringify(newAnimation)) {
    return true;
  }
  return false;
})

function AnimationContainer() {
  const dataState = useDataStore();
  const UIState = useUIStore()
  const {
    getTargetStyle,
    updateAnimationProperty,
    updateAnimationAnimatedProperties,
    saveAnimationStartStatus,
    getStatusByProperties,
    saveAnimationEndStatus,
    playAnimation,
    stopAnimation
  } = dataState;
  const { targetId } = UIState
  return (
    <OptimizedAnimationPanel
    animation={targetId ? getTargetStyle("animation") : null}
    onMetaChange={(key, value) => updateAnimationProperty(key, value)}
    onPropertyChange={(name, value) =>  updateAnimationAnimatedProperties(name, value)}
    onSaveStartStatus={() => saveAnimationStartStatus(getStatusByProperties())}
    onSaveEndStatus={() => saveAnimationEndStatus(getStatusByProperties())}
    onPlayAnimation={() => playAnimation()}
    onStopAnimation={() => stopAnimation()}
  ></OptimizedAnimationPanel>
  )
}

export default AnimationContainer

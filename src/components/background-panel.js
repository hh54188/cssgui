import React from 'react';
import { useState } from 'react'
import {
  FormGroup,
  InputGroup,
  Divider,
  Icon,
  ControlGroup,
  Collapse,
  Switch,
  Button
} from '@blueprintjs/core'
import { Popover2 } from '@blueprintjs/popover2'
import { SketchPicker } from 'react-color';
import { useCoreDataStore } from '../store/core'
import { useGradientStore } from '../store/gradient'
import { useUIStore } from '../store/ui'
import { createGradientString } from '../utils/style'
import { performanceOptimize } from './performance-optimize-wrap'
import { GradientPanel } from './gradient-panel'

function BackgroundPanel({
  disabled,
  color,
  enableGradient,
  onColorChange,
  onEnableGradientChange,
  onEditGradientBegin
}) {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="control-panel-group">
      {isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-up" onClick={() => setIsOpen(false)}></Icon>}
      {!isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-down" onClick={() => setIsOpen(true)}></Icon>}
      <strong onClick={() => setIsOpen(!isOpen)} className='control-panel-title'>BACKGROUND COLOR</strong>
      <Divider></Divider>
      <Collapse isOpen={isOpen}>
        {!disabled && <Switch onChange={onEnableGradientChange} className='background-gradient-switch' checked={enableGradient} label="Gradient" />}
        {!disabled && <div className="control-panel-horizontal-layout">
          <FormGroup>
            <Popover2 disabled={enableGradient} content={
              <SketchPicker color={color} onChange={onColorChange}></SketchPicker>
            }
              interactionKind="click">
              <ControlGroup className='position-control' fill={true} vertical={false}>
                <div onClick={enableGradient ? onEditGradientBegin : null} className='color-indicator'>
                  <div className='color-indicator-content' style={{ background: color }} ></div>
                </div>
                <InputGroup id="color-input" disabled={enableGradient} value={color} onChange={() => { }} />
              </ControlGroup>
            </Popover2>
          </FormGroup>
        </div>}
      </Collapse>
    </div>
  )
};

const OptimizedBackgroundContainer = performanceOptimize(BackgroundPanel)(['color', 'enableGradient', 'disabled']);

function BackgroundPanelContainer() {
  const { getTargetStyle, updateTargetStyle, targetId } = useCoreDataStore();
  const { setGradientStops, setGradientAngle } = useGradientStore();
  const { openGradientPickerDialog, setOpenGradientPickerDialog } = useUIStore();

  const enableGradient = getTargetStyle('enableGradientBackground');
  const color = enableGradient
    ? createGradientString(
      getTargetStyle("backgroundGradientStops"),
      getTargetStyle("backgroundGradientAngle")
    )
    : getTargetStyle("backgroundColor") || '#FFFFFF';
  const onColorChange = value => updateTargetStyle('backgroundColor', value.hex);
  const onEnableGradientChange = event => updateTargetStyle('enableGradientBackground', event.target.checked);
  const onGradientDialogBegin = () => {
    setGradientStops(getTargetStyle("backgroundGradientStops"))
    setGradientAngle(getTargetStyle("backgroundGradientAngle"))
    setOpenGradientPickerDialog(true)
  };
  const onGradientDialogCancel = () => {
    setOpenGradientPickerDialog(false)
  };
  const onGradientDialogSave = (newGradientStops, gradientAngle) => {
    updateTargetStyle('backgroundGradientStops', newGradientStops)
    updateTargetStyle('backgroundGradientAngle', gradientAngle)
    setOpenGradientPickerDialog(false)
  }

  return <>
    {<GradientPanel 
      isOpen={openGradientPickerDialog} 
      onCancel={onGradientDialogCancel}
      onSave={onGradientDialogSave}
    ></GradientPanel>}
    <OptimizedBackgroundContainer
      disabled={!targetId}
      color={color}
      enableGradient={enableGradient}
      onEnableGradientChange={onEnableGradientChange}
      onEditGradientBegin={onGradientDialogBegin}
      onColorChange={onColorChange}>
    </OptimizedBackgroundContainer>
  </>
}

export default BackgroundPanelContainer;

import React, { useState } from 'react'
import {
  Button,
  Dialog,
  Icon,
  ControlGroup,
  InputGroup,
  NumericInput,
  Classes,
  Divider
} from "@blueprintjs/core";
import { AnglePicker } from 'react-linear-gradient-picker';
import { useGradientStore } from '../store/gradient'
import { createGradientString } from '../utils/style'
import { Popover2 } from '@blueprintjs/popover2'
import { SketchPicker } from 'react-color';

export function GradientPanel() {
  const [dragStartFlag, setDragStartFlag] = useState(false);
  const [dragStartOffset, setDragStartOffset] = useState(0);
  const [elementStartOffset, setElementStartOffset] = useState(0);

  const {
    curElementId, setCurElementId,
    maxOffset,
    minOffset,
    gradientAngle, setGradientAngle,
    gradientPresets,
    gradientStops, setGradientStopOffset, addGradientStop, removeGradientStop, toggleGradientStopVisible,
    setGradientStopPercentage, copyGradientStop, updateGradientStopColor, applyGradientPreset
  } = useGradientStore();
  const [moveMarkerEndTime, setMoveMarkerEndTime] = useState(-1);

  function onMouseDown(id, event) {
    const { clientX } = event;
    setCurElementId(id)
    setDragStartFlag(true);
    setDragStartOffset(clientX);
    setElementStartOffset(gradientStops.find(stop => stop.id === id).offset)
  }

  function onMouseMove(event) {
    if (!dragStartFlag) {
      return;
    }
    const { clientX } = event;
    const newOffset = elementStartOffset + (clientX - dragStartOffset);
    if (newOffset < minOffset || newOffset > maxOffset) {
      return
    }
    setGradientStopOffset(newOffset)
  }

  function onMouseUp(event) {
    setDragStartFlag(false);
    setMoveMarkerEndTime(+new Date)
    setCurElementId(null)
    event.stopPropagation()
  }

  function addMarker(event) {
    if (moveMarkerEndTime > -1 && (+new Date - moveMarkerEndTime) < 10) {
      return
    }
    const roughOffset = parseInt(event.clientX) - parseInt(event.target.getBoundingClientRect().left)
    const finalOffset = roughOffset < 0
      ? 0
      : roughOffset > maxOffset
        ? maxOffset
        : roughOffset

    addGradientStop(finalOffset, 'red')
  }

  const gradientColor = createGradientString(gradientStops, gradientAngle);
  const gradientColorToRight = createGradientString(gradientStops);
  const disableDeleteStop = gradientStops.length === 2;

  return (
    <Dialog className='gradient-dialog' style={{ userSelect: dragStartFlag ? 'none' : 'text' }} isOpen={true}>
      <div className='gradient-preview' style={{ background: gradientColor }}></div>
      {dragStartFlag && <div className='overlay-when-drag'
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      ></div>}
      <div className={Classes.DIALOG_BODY}>
        <div className='gradient-panel'>
          <div className='gradient-panel__meta'>
            <div className='gradient-panel__presets'>
              <span className='gradient-panel__presets__label'>Presets</span>
              {gradientPresets.map((presetStop, index) => {
                return <div 
                  key={index}
                  style={{background: createGradientString(presetStop)}} 
                  className='gradient-panel__presets__item'
                  onClick={applyGradientPreset.bind(this, index)}
                  ></div>
              })}
            </div>
            <div className='gradient-panel__angle'>
              <span className='gradient-panel__angle__label'>Angle</span>
              <AnglePicker setAngle={value => setGradientAngle(value)} angle={gradientAngle} />
              <NumericInput
                max={360}
                min={0}
                value={gradientAngle}
                onValueChange={value => setGradientAngle(value)} className='gradient-panel__angle__input'
                buttonPosition='none'
              ></NumericInput>
            </div>
          </div>
          <div
            className="gradient-panel__slider"
            style={{ background: gradientColorToRight }}
            onClick={addMarker}
          >
            {gradientStops.map(({ offset, color, id }, index) => {
              return <div
                key={index}
                style={{ left: offset, zIndex: id === curElementId ? 20 : 1 }}
                onMouseDown={onMouseDown.bind(this, id)}
                onMouseUp={onMouseUp}
                onClick={event => event.stopPropagation()}
                className="gradient-panel__slider-marker">
                <div
                  style={{ backgroundColor: color }}
                  className='gradient-panel__slider-marker__color'
                ></div>
              </div>
            })}
          </div>
          {gradientStops.map(({ percentage, color, id, visible }, index) => {
            return <div key={id} className='gradient-panel__color-item'>
              <div className="gradient-panel__color-item__info">
                <div className='gradient-panel__color-item__position'>
                  <ControlGroup>
                    <NumericInput min={0} max={100} disabled={!visible} onValueChange={(value) => {
                      setCurElementId(id);
                      setGradientStopPercentage(value);
                    }} value={percentage} fill buttonPosition='none'></NumericInput>
                    <Icon className='gradient-panel__color-item__position__unit' icon="percentage" size={13}></Icon>
                  </ControlGroup>
                </div>
                <div className='gradient-panel__divider'></div>
                <Popover2 content={
                  <SketchPicker 
                    color={color} 
                    onChange={updateGradientStopColor.bind(this, index)}
                  ></SketchPicker>
                }
                  interactionKind="click">
                <div className='gradient-panel__color-item__picker' style={{ backgroundColor: color }}></div>
                </Popover2>
                {/* <div className='gradient-panel__color-item__color-text'>
                  <InputGroup
                    disabled={!visible}
                    onChange={updateGradientStopColor.bind(this, index)}
                    value={color}
                    fill
                    leftIcon="style"
                  />
                </div> */}
              </div>
              <div className="gradient-panel__color-item__action">
                <div className={`gradient-panel__color-item__btn ${disableDeleteStop ? 'gradient-panel__color-item__btn-disabled' : ''}`}
                  onClick={disableDeleteStop ? null : toggleGradientStopVisible.bind(this, index)}>
                  <Icon icon="eye-open" size={16}></Icon>
                </div>
                <div className='gradient-panel__color-item__btn' onClick={copyGradientStop.bind(this, index)}>
                  <Icon icon="duplicate" size={16}></Icon>
                </div>
                <div className={`gradient-panel__color-item__btn ${disableDeleteStop ? 'gradient-panel__color-item__btn-disabled' : ''}`}
                  onClick={disableDeleteStop ? null : removeGradientStop.bind(this, index)}>
                  <Icon icon="trash" size={16}></Icon>
                </div>
              </div>
            </div>
          })}
          <div>
          </div>
        </div>
      </div>
      <div className={`${Classes.DIALOG_FOOTER}`}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button intent='primary'>Save</Button>
          <Button>Cancel</Button>
        </div>
      </div>
    </Dialog>
  )
}
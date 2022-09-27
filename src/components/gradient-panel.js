import React, { useState } from 'react'
import {
  Button,
  Dialog,
  Icon,
  ControlGroup,
  InputGroup,
  FormGroup,
  NumericInput,
  Switch,
  Classes,
  Divider
} from "@blueprintjs/core";
import { Popover2 } from '@blueprintjs/popover2'
let idSeed = 0;

export function GradientPanel() {
  const [curElementId, setCurElementId] = useState(0)
  const [maxOffset, setMaxOffset] = useState(0)
  const [elementOffset, setElementOffset] = useState({
    0: 0
  })
  const [dragStartFlag, setDragStartFlag] = useState(false);
  const [dragStartOffset, setDragStartOffset] = useState(0);
  const [elementStartOffset, setElementStartOffset] = useState(0);

  function onMouseDown(id, event) {
    const { clientX } = event;
    setCurElementId(id)
    setDragStartFlag(true);
    setDragStartOffset(clientX);
    setElementStartOffset(elementOffset[id])
    setMaxOffset(parseInt(window.getComputedStyle(document.querySelector('.gradient-panel__slider')).width) - 30);
  }

  function onMouseMove(event) {
    if (!dragStartFlag) {
      return;
    }
    const { clientX } = event;
    const newOffset = elementStartOffset + (clientX - dragStartOffset);
    if (newOffset < 0 || newOffset > maxOffset) {
      return
    }
    setElementOffset({
      ...elementOffset,
      [curElementId]: newOffset
    })
  }

  function onMouseUp(event) {
    setDragStartFlag(false);
    event.stopPropagation()
  }

  function addMarker(event) {
    const maxOffset = parseInt(window.getComputedStyle(document.querySelector('.gradient-panel__slider')).width) - 20;
    const roughOffset = parseInt(event.clientX) - parseInt(event.target.getBoundingClientRect().left)
    setMaxOffset(maxOffset)
    setElementOffset({
      ...elementOffset,
      [++idSeed]: roughOffset < 0
        ? 0
        : roughOffset > maxOffset
          ? maxOffset
          : roughOffset
    })
  }

  return (
    <Dialog className='gradient-dialog' style={{ width: 520, marginBottom: 20 }} isOpen={true}>
      <div className='gradient-preview' style={{
        background: 'linear-gradient(to right, orange, skyblue)'
      }}
      >
      </div>
      <div className={Classes.DIALOG_BODY}>
        <div className='gradient-panel'>
          <div className="gradient-panel__slider" onClick={addMarker} onMouseMove={onMouseMove}>
            {Object.keys(elementOffset).map(id => {
              return <div
                key={id}
                style={{ left: elementOffset[id] }}
                onMouseDown={onMouseDown.bind(this, id)}
                onMouseUp={onMouseUp}
                onClick={event => event.stopPropagation()}
                className="gradient-panel__slider-marker">
                <div className='gradient-panel__slider-marker__color'></div>
              </div>
            })}
          </div>
          <div>
            <div className='gradient-panel__color-item'>
              <div className='gradient-panel__color-item__position'>
                <ControlGroup>
                  <NumericInput value={90} fill  buttonPosition='none'></NumericInput>
                  <Icon className='gradient-panel__color-item__position__unit' icon="percentage" size={14}></Icon>
                </ControlGroup>
              </div>
              <div className='gradient-panel__color-item__picker'></div>
              <div className='gradient-panel__color-item__color-text'>
                <InputGroup value="#FFFFFF" fill leftIcon="style" />
              </div>
              <div className='gradient-panel__color-item__btn'>
                <Icon icon="duplicate" size={16}></Icon>
              </div>
              <div className='gradient-panel__color-item__btn'>
                <Icon icon="trash" size={16}></Icon>
              </div>
            </div>
            <Divider></Divider>
          </div>
        </div>
      </div>
      <div className={`${Classes.DIALOG_FOOTER}`}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button>Click</Button>
        </div>
      </div>
    </Dialog>
  )
}
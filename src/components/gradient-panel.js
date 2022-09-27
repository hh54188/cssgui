import React, { useState } from 'react'
import {
  Button,
  Dialog,
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
    <Dialog className='gradient-dialog' style={{ width: 960, marginBottom: 20 }} isOpen={true}>
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
                className="gradient-pane__slider-marker">
                <div className='gradient-pane__slider-marker__color'></div>
              </div>
            })}
          </div>
          <div>
            <div style={{ marginTop: 20, marginBottom: 10, width: '100%', display: 'flex', alignContent: 'center', alignItems: 'center'}}>
              <div style={{width: 80, display: 'inline-block' }}>
                <NumericInput value={90} fill large buttonPosition='none' leftIcon="percentage"></NumericInput>
              </div>
              <div style={{width: 100, display: 'inline-block', marginLeft: 10}}>
                <div style={{width: '100%', height: 40, backgroundColor: 'white'}}></div>
              </div>
              <div style={{width: 120, display: 'inline-block', marginLeft: 10}}>
                <InputGroup value="#FFFFFF" fill large leftIcon="style" />
              </div>
              <div style={{width: 30, display: 'inline-block', marginLeft: 10}}>
                <Button icon="duplicate"></Button>
              </div>
              <div style={{width: 30, display: 'inline-block', marginLeft: 10}}>
                <Button icon="trash"></Button>
              </div>
            </div>
            <Divider></Divider>
            <div style={{ marginTop: 20, marginBottom: 10, width: '100%', display: 'flex', alignContent: 'center', alignItems: 'center'}}>
              <div style={{width: 80, display: 'inline-block' }}>
                <NumericInput value={90} fill large buttonPosition='none' leftIcon="percentage"></NumericInput>
              </div>
              <div style={{width: 100, display: 'inline-block', marginLeft: 10}}>
                <div style={{width: '100%', height: 40, backgroundColor: 'white'}}></div>
              </div>
              <div style={{width: 120, display: 'inline-block', marginLeft: 10}}>
                <InputGroup value="#FFFFFF" fill large leftIcon="style" />
              </div>
              <div style={{width: 30, display: 'inline-block', marginLeft: 10}}>
                <Button icon="duplicate"></Button>
              </div>
              <div style={{width: 30, display: 'inline-block', marginLeft: 10}}>
                <Button icon="trash"></Button>
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
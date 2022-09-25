import React, { useState } from 'react'
import { Icon, Menu, MenuItem, Position, Button, ButtonGroup, Dialog, FormGroup, NumericInput, Switch, Classes } from "@blueprintjs/core";
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
    setMaxOffset(parseInt(window.getComputedStyle(document.querySelector('.gradient-panel__slider')).width) - 20);
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
            <Popover2 content={
              <Menu>
                <MenuItem icon="duplicate" text="Duplicate" />
                <MenuItem icon="delete" text="Delete" />
              </Menu>
            }
              interactionKind="click"
              position={Position.BOTTOM}
              popoverClassName="gradient-pane__slider-marker__menu"
              >
              <Icon className='gradient-pane__slider-marker__menu-trigger' icon="more" iconSize={14} />
            </Popover2>
          </div>
        })}
      </div>
    </div>
  )
}
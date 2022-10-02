import React, {useState} from 'react';
import {Collapse, ControlGroup, Divider, HTMLSelect, Icon, Switch} from '@blueprintjs/core'
import {NumericInput} from './numeric-input'
import {Popover2} from '@blueprintjs/popover2'
import {SketchPicker} from 'react-color';

import {useCoreDataStore} from '../store/core'
import {performanceOptimize} from "./performance-optimize-wrap";

function BorderPanel({
  enabled = false,
  onToggleEnabled,
  borderAllInOne = true,
  onToggleAllInOne,
  borders,
  onAllWidthChange,
  onAllStyleChange,
  onAllColorChange,
  onWidthChange,
  onStyleChange,
  onColorChange
}) {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="control-panel-group">
      {isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-up" onClick={() => setIsOpen(false)}></Icon>}
      {!isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-down" onClick={() => setIsOpen(true)}></Icon>}
      <strong  onClick={() => setIsOpen(!isOpen)} className='control-panel-title'>BORDER</strong>
      <Divider></Divider>
      <Collapse isOpen={isOpen}>
        <div className="control-panel-horizontal-layout border-group-toggles">
          <div className="control-panel-horizontal-layout-item">
            <Switch
              disabled={!borders}
              checked={enabled}
              onChange={onToggleEnabled}
            >Enabled</Switch>
          </div>
          <div className="control-panel-horizontal-layout-item">
            <Switch
              disabled={!borders}
              checked={borderAllInOne}
              onChange={onToggleAllInOne}
            >All In One</Switch>
          </div>
        </div>
        {borders && borderAllInOne && <div>
          <ControlGroup fill={true} vertical={false}>
            <div className="control-panel-border-layout">
              <div className="control-panel-border-layout-label-item">
                <span>Border</span>
              </div>
              <div className="control-panel-border-layout-width-item">
                <NumericInput
                  fill={true}
                  min={0}
                  value={borders.top.width}
                  onValueChange={onAllWidthChange}
                />
              </div>
              <div className="control-panel-border-layout-style-item">
                <HTMLSelect
                  value={borders.top.style}
                  onChange={onAllStyleChange}
                  options={['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']} />
              </div>
              <div className="control-panel-border-layout-color-item">
                <Popover2 content={
                  <SketchPicker
                    color={borders.top.color}
                    onChange={onAllColorChange}
                  ></SketchPicker>
                }
                  interactionKind="click">
                  <div className='border-color-indicator'>
                    <div className='border-color-indicator-content' style={{ backgroundColor: borders.top.color }}></div>
                  </div>
                </Popover2>
              </div>
            </div>
          </ControlGroup>
        </div>}
        {borders && !borderAllInOne && Object.keys(borders).map(position => {
          const { width, style, color } = borders[position]
          return (
            <div key={position}>
              <ControlGroup fill={true} vertical={false}>
                <div className="control-panel-border-layout">
                  <div className="control-panel-border-layout-label-item">
                    <span>{position}</span>
                  </div>
                  <div className="control-panel-border-layout-width-item">
                    <NumericInput
                      fill={true}
                      min={0}
                      value={width}
                      disabled={!enabled}
                      onValueChange={onWidthChange.bind(this, position)}
                    />
                  </div>
                  <div className="control-panel-border-layout-style-item">
                    <HTMLSelect
                      disabled={!enabled}
                      value={style}
                      onChange={onStyleChange.bind(this, position)}
                      options={['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']} />
                  </div>
                  <div className="control-panel-border-layout-color-item">
                    <Popover2 content={
                      <SketchPicker
                        color={color}
                        onChange={onColorChange.bind(this, position)}
                      ></SketchPicker>
                    }
                      interactionKind="click">
                      <div className='border-color-indicator'>
                        <div className='border-color-indicator-content' style={{ backgroundColor: color }}></div>
                      </div>
                    </Popover2>
                  </div>
                </div>
              </ControlGroup>
            </div>
          )
        })}
      </Collapse>
    </div>
  )
}

const OptimizedBorderPanelContainer = performanceOptimize(BorderPanel)(null, function (prevProps, nextProps) {
  const {borders: oldBorders, borderAllInOne: oldAllInOne, enabled: oldEnabled} = prevProps;
  const {borders: newBorders, borderAllInOne: newAllInOne, enabled: newEnabled} = nextProps
  if (!oldBorders || !newBorders) {
    return true;
  }

  const directions = ['top', 'bottom', 'left', 'right'];
  for (let i = 0; i < directions.length; i++) {
    const direction = directions[i];
    if (oldBorders[direction].width !== newBorders[direction].width
      || oldBorders[direction].style !== newBorders[direction].style
      || oldBorders[direction].color !== newBorders[direction].color
      || oldAllInOne !== newAllInOne
      || oldEnabled !== newEnabled) {
      return true
    }
  }
  return false
});

function BorderPanelContainer() {
  const dataState = useCoreDataStore();
  const {
    elementCollection,
    updateBorder,
    toggleBorderAllInOne,
    toggleEnableBorder,
    targetId
  } = dataState;
  const targetElementState = elementCollection[targetId];
  const borders = targetId ? targetElementState.border : null;

  return <OptimizedBorderPanelContainer
    enabled={targetId ? targetElementState.borderEnabled : false}
    onToggleEnabled={toggleEnableBorder}
    borderAllInOne={targetId ? targetElementState.borderAllInOne : false}
    onToggleAllInOne={toggleBorderAllInOne}
    borders={borders}
    onAllWidthChange={value => updateBorder('width', value)}
    onAllStyleChange={event => updateBorder('style', event.target.value)}
    onAllColorChange={value => updateBorder('color', value.hex)}
    onWidthChange={(position, value) => updateBorder('width', value, position)}
    onStyleChange={(position, event) => updateBorder('style', event.target.value, position)}
    onColorChange={(position, value) => updateBorder('color', value.hex, position)}
  ></OptimizedBorderPanelContainer>
}

export default BorderPanelContainer

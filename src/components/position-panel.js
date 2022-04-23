import { useState } from 'react'
import {
  FormGroup,
  InputGroup,
  NumericInput,
  Divider,
  Switch,
  Checkbox,
  Icon,
  Button,
  ControlGroup,
  HTMLSelect,
  Menu,
  MenuItem,
  Collapse,
  Classes, Position, Intent
} from '@blueprintjs/core'
import { Tooltip2, Popover2 } from '@blueprintjs/popover2'
import { SketchPicker } from 'react-color';
function PositionPanel({
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
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="control-panel-group position-control-group">
      {isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-up" onClick={() => setIsOpen(false)}></Icon>}
      {!isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-down" onClick={() => setIsOpen(true)}></Icon>}
      <strong>POSITION</strong>
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
            disabled={disabled}
            fill={true}
            stepSize={1}
            buttonPosition="right"
            min={-9999}
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
            disabled={disabled}
            fill={true}
            stepSize={1}
            buttonPosition="right"
            min={-9999}
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

export default PositionPanel
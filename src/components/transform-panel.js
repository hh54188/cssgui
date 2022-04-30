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
  Classes, Position, Intent,
  Slider
} from '@blueprintjs/core'
import { Tooltip2, Popover2 } from '@blueprintjs/popover2'
import { SketchPicker } from 'react-color';
function TransformPanel({
  transform,
  onTranslateXValueChange,
  onTranslateYValueChange,
  onTranslateZValueChange,
  disabled = true,
}) {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="control-panel-group">
      {isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-up" onClick={() => setIsOpen(false)}></Icon>}
      {!isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-down" onClick={() => setIsOpen(true)}></Icon>}
      <strong>TRANSFORM</strong>
      <Divider></Divider>
      {transform && <Collapse isOpen={isOpen}>
        <div className="control-panel-horizontal-layout">
          <div className="control-panel-horizontal-layout-item">
            <FormGroup
              label="TranslateX"
              labelFor="translatex-input"
              inline
            >
              <NumericInput
                disabled={disabled}
                onValueChange={onTranslateXValueChange}
                fill={true}
                stepSize={1}
                buttonPosition="right"
                min={-9999}
                value={transform.translate.x}
                id="translatex-input"
              />
            </FormGroup>
            <FormGroup
              label="TranslateY"
              labelFor="translatey-input"
              inline
            >
              <NumericInput
                disabled={disabled}
                onValueChange={onTranslateYValueChange}
                fill={true}
                stepSize={1}
                buttonPosition="right"
                min={-9999}
                value={transform.translate.y}
                id="translatex-input"
              />
            </FormGroup>
            <FormGroup
              label="TranslateZ"
              labelFor="translatez-input"
              inline
            >
              <NumericInput
                disabled={disabled}
                onValueChange={onTranslateZValueChange}
                fill={true}
                stepSize={1}
                buttonPosition="right"
                min={-9999}
                value={transform.translate.z}
                id="translatex-input"
              />
            </FormGroup>
            <FormGroup
              label="ScaleX"
              labelFor="scalex-input"
            >
              <Slider
                min={0}
                max={10}
                stepSize={0.1}
                labelStepSize={10}
                initialValue={1}
              />
            </FormGroup>
          </div>
        </div>
      </Collapse>}
    </div>
  )
}

export default TransformPanel
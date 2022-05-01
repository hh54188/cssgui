import { useState } from 'react'
import {
  FormGroup,
  NumericInput,
  Divider,
  Icon,
  Button,
  Collapse,
  Slider
} from '@blueprintjs/core'
import { AnglePicker } from 'react-linear-gradient-picker';
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
              <strong>Tranlsate</strong>
              <Button minimal icon="reset" onClick={onResetTranslate}>Reset</Button>
            </div>
            {Object.keys(transform.translate).map(coord => {
              return <FormGroup label={`Translate${coord.toLocaleUpperCase()}`} inline key={coord}>
                <NumericInput
                  disabled={disabled}
                  onValueChange={value => onValueChange(value, 'translate', coord)}
                  fill={true}
                  stepSize={1}
                  buttonPosition="right"
                  min={-9999}
                  value={transform.translate[coord]}
                />
              </FormGroup>
            })}
            <div className='control-panel-transform-group-subtitle' style={{ paddingTop: 0 }}>
              <strong>Scale</strong>
              <Button minimal icon="reset" onClick={onResetScale}>Reset</Button>
            </div>
            {Object.keys(transform.scale).map(coord => {
              return <FormGroup label={`Scale${coord.toLocaleUpperCase()}`} inline key={coord}>
                <div className='transform-slider-container'>
                  <Slider
                    min={0}
                    max={20}
                    stepSize={0.1}
                    labelStepSize={10}
                    value={transform.scale[coord]}
                    onChange={value => onValueChange(value, 'scale', coord)}
                  />
                </div>
              </FormGroup>
            })}
            <div className='control-panel-transform-group-subtitle' style={{ paddingTop: 0 }}>
              <strong>Skew</strong>
              <Button minimal icon="reset" onClick={onResetSkew}>Reset</Button>
            </div>
            <div className='transform-skew-container'>
              {Object.keys(transform.skew).map(coord => {
                return <FormGroup key={coord} label={`Skew${coord.toLocaleUpperCase()}`} inlkey={coord}>
                  <div>
                    <AnglePicker angle={transform.skew[coord]} setAngle={value => onValueChange(value, 'skew', coord)} />
                  </div>
                </FormGroup>
              })}
            </div>
            {/* <div className='control-panel-transform-group-subtitle' style={{ paddingTop: 0 }}>
              <strong>Rotate</strong>
              <Button minimal icon="reset" onClick={onResetSkew}>Reset</Button>
            </div> */}
            {/* {Object.keys(transform.rotate).map(coord => {
              return <FormGroup label={`Rotate${coord.toLocaleUpperCase()}`} inline key={coord}>
                <div className='transform-slider-container'>
                  <Slider
                    min={0}
                    max={360}
                    stepSize={1}
                    labelStepSize={180}
                    value={transform.rotate[coord]}
                    onChange={value => onValueChange(value, 'rotate', coord)}
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

export default TransformPanel
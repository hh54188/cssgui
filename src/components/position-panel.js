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
}) {
    return (
        <div className="control-panel-group position-control-group">
            <strong>POSITION</strong>
            <Divider></Divider>
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
        </div>
    )
}

export default PositionPanel
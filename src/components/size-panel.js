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
function SizePanel({
    widthValue,
    heightValue,
    onWidthChange,
    onHeightChange,
    disabled = true,
}) {
    return (
        <div className="control-panel-group"> <strong>SIZE</strong>
            <Divider></Divider>
            <div className="control-panel-horizontal-layout">
                <div className="control-panel-horizontal-layout-item">
                    <FormGroup
                        label="Width"
                        labelFor="width-input"
                    >
                        <NumericInput
                            disabled={disabled}
                            onValueChange={onWidthChange}
                            fill={true}
                            stepSize={1}
                            buttonPosition="right"
                            min={-9999}
                            value={widthValue}
                            id="width-input"
                        />
                    </FormGroup>
                </div>
                <div className="control-panel-horizontal-layout-item">
                    <FormGroup
                        label="Height"
                        labelFor="height-input"
                    >
                        <NumericInput 
                            disabled={disabled} 
                            onValueChange={onHeightChange} 
                            fill={true} 
                            stepSize={1} 
                            buttonPosition="right" 
                            min={-9999} 
                            value={heightValue} 
                            id="height-input" 
                        />
                    </FormGroup>
                </div>
            </div>
        </div>
    )
}

export default SizePanel
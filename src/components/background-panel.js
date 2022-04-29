import {useState} from 'react'
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
function BackgroundPanel({ color, onColorChange }) {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div className="control-panel-group">
            {isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-up" onClick={() => setIsOpen(false)}></Icon>}
            {!isOpen && <Icon className='control-panel-group-title-collapse-icon' icon="chevron-down" onClick={() => setIsOpen(true)}></Icon>}
            <strong>BACKGROUND COLOR</strong>
            <Divider></Divider>
            <Collapse isOpen={isOpen}>
                <div className="control-panel-horizontal-layout">
                    <FormGroup>
                        <Popover2 content={
                            <SketchPicker color={color} onChange={onColorChange}></SketchPicker>
                        }
                            interactionKind="click">
                            <ControlGroup className='position-control' fill={true} vertical={false}>
                                <div className='color-indicator'>
                                    <div className='color-indicator-content' style={{ background: color }} ></div>
                                </div>
                                <InputGroup id="color-input" value={color} onChange={() => { }} />
                            </ControlGroup>
                        </Popover2>
                    </FormGroup>
                </div>
            </Collapse>
        </div>
    )
}

export default BackgroundPanel
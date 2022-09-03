import React from 'react';
import {
  FormGroup,
  NumericInput,
  Switch,
  Button,
  ButtonGroup,
  Dialog,
  Divider,
  HTMLSelect,
  Slider,
  Checkbox
} from '@blueprintjs/core'
import { Popover2 } from '@blueprintjs/popover2'
import {useDataStore} from "../store/data";
import {useUIStore} from "../store/ui";
import {performanceOptimize} from "./performance-optimize-wrap";

function AnimationPanel({
  animation,
  onMetaChange,
  onPropertyChange,
  onSaveStartStatus,
  onSaveEndStatus,
  onPlayAnimation,
  onStopAnimation,
}) {
  const disabled = !animation;
  const disableSaveStatus = animation && Object.values(animation.animatedProperties).every(property => !property);
  return (
    <div className="new-animation-panel">
      <div className='new-animation-panel-content'>

      </div>
    </div>
  )
}

export default AnimationPanel

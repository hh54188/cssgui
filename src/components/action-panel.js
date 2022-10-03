import React, {useState} from 'react';
import hljs from 'highlight.js';
import reactToCSS from 'react-style-object-to-css'
import { Button, ButtonGroup, Dialog, FormGroup, Classes, Callout, Icon, Switch } from "@blueprintjs/core";

import {StyleCodeDialog} from '../components/style-code-dialog'
import {GradientPanel} from '../components/gradient-panel'
import { NumericInput } from '../components/numeric-input'
import {useCoreDataStore} from '../store/core'
import {useUIStore} from '../store/ui'
import {createStyleObj} from '../utils/style'
import {useConfigStore} from '../store/config'

function ActionPanel() {
  const {
    setTargetId,
    applyToAll,
    toggleApplyToAll,
    showAnimationPanel,
    toggleAnimationPanel,
    toggleAddMultipleElementsDialog,
    openAddMultipleElementsDialog,
    cloneElementWhenAddMultipleElements,
    toggleCloneElementWhenAddMultipleElements,
    openCopyStyleCodeDialog,
    setOpenCopyStyleCodeDialog,
    openGradientPickerDialog,
    setOpenGradientPickerDialog,
  } = useUIStore();
  const {
    targetId,
    generateElements,
    addNewElement,
    copyElement,
    deleteElement,
    deleteAllElement,
    getTargetElementState
  } = useCoreDataStore();
  const configState = useConfigStore();
  const { randomElementCount, setRandomElementCount } = configState
  const [codeMarkup, setCodeMarkup] = useState('');
  const [codeText, setCodeText] = useState('');

  function showCopyStyleCodeDialog() {
    const styleObj = createStyleObj(getTargetElementState());
    const styleText = reactToCSS(styleObj).replace(/;\s+/g, ';\n');
    const highlightedCode = hljs.highlight(styleText, {language: 'css'}).value;

    setCodeText(styleText)
    setCodeMarkup(highlightedCode)
    setOpenCopyStyleCodeDialog(true);
  }

  return <div className="control-panel-actions">
    <GradientPanel
      isOpen={openGradientPickerDialog}
      onClose={() => setOpenGradientPickerDialog(false)}
    />
    <StyleCodeDialog
      isOpen={openCopyStyleCodeDialog}
      onClose={() => setOpenCopyStyleCodeDialog(false)}
      codeMarkup={codeMarkup}
      codeText={codeText}
    />
    <Dialog className='add-multiple-dialog' isOpen={openAddMultipleElementsDialog}>
      <div className={Classes.DIALOG_HEADER}>
        Clone Selected Element
      </div>
      <div className="add-multiple-dialog-content">
        <FormGroup label="Random Element Count" inline>
          <NumericInput 
            min={1}
            value={randomElementCount} 
            onValueChange={value => setRandomElementCount(value)} 
          />
        </FormGroup>
        <FormGroup label="Apply Selected Element Style To All Elements" inline>
          <Switch disabled={!targetId} value={cloneElementWhenAddMultipleElements} onChange={event => toggleCloneElementWhenAddMultipleElements(event.target.checked)} />
        </FormGroup>
      </div>
      <div className="add-multiple-dialog-actions">
        <Button className='add-multiple-dialog-actions-btn' onClick={() => toggleAddMultipleElementsDialog(false)} >Cancel</Button>
        <Button className='add-multiple-dialog-actions-btn' intent='primary' onClick={() => { generateElements(); toggleAddMultipleElementsDialog(false) }} >Confirm</Button>
      </div>
    </Dialog>
    <ButtonGroup fill style={{ marginTop: 10 }}>
      <Button onClick={() => addNewElement(setTargetId)} icon="plus">New</Button>
      {/* <Button onClick={() => toggleAddMultipleElementsDialog(true)} icon="new-object"  disabled={!targetId}>Random</Button> */}
      <Button onClick={copyElement} disabled={!targetId} icon="duplicate">Clone</Button>
    </ButtonGroup>
    <ButtonGroup fill style={{ marginTop: 10 }}>
      <Button intent="danger" icon="delete" onClick={deleteElement} disabled={!targetId}>Delete</Button>
      <Button intent="danger" icon="clean" onClick={deleteAllElement} disabled={!targetId}>Clear</Button>
    </ButtonGroup>
    <ButtonGroup fill style={{ marginTop: 10 }}>
      <Button intent="primary" icon="code" onClick={showCopyStyleCodeDialog} disabled={!targetId}>Copy Style Code</Button>
    </ButtonGroup>
    <ButtonGroup fill style={{ marginTop: 10 }}>
      {!showAnimationPanel && <Button icon="drawer-right" onClick={() => toggleAnimationPanel(true)} disabled={!targetId}>Open Animation Panel</Button>}
      {showAnimationPanel && <Button icon="drawer-left" onClick={() => toggleAnimationPanel(false)} disabled={!targetId}>Close Animation Panel</Button>}
    </ButtonGroup>
    {/* <FormGroup className='apply-to-all-switch' label="Apply To All" inline>
      <Switch value={applyToAll} onChange={event => toggleApplyToAll(event.target.checked)} />
    </FormGroup> */}
    <Callout className='tips' intent='primary' icon="info-sign">
      Tips: Using <Icon icon='arrow-up'></Icon> or <Icon icon='arrow-down'></Icon> key to change the value by one step (+/- 1).
    </Callout>
  </div>
}

export default ActionPanel

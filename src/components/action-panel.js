import React from 'react';
import {Button, ButtonGroup, Dialog, FormGroup, NumericInput, Switch, Toaster} from "@blueprintjs/core";

import {useDataStore} from '../store/data'
import {useUIStore} from '../store/ui'
import {useConfigStore} from '../store/config'

function ActionPanel() {

  const UIState = useUIStore();
  const dataState = useDataStore();
  const configState = useConfigStore();
  const { randomElementCount, setRandomElementCount } = configState
  const {
    targetId,
    setTargetId,
    applyToAll,
    toggleApplyToAll,
    showAnimationPanel,
    toggleAnimationPanel,
    toggleAddMultipleElementsDialog,
    openAddMultipleElementsDialog,
    cloneElementWhenAddMultipleElements,
    toggleCloneElementWhenAddMultipleElements
  } = UIState;
  const {
    elementCollection,
    updateSingleElement,
    generateElements,
    addNewElement,
    copyElement,
    deleteElement,
    setElementCollection
  } = dataState;

  function saveToLocal() {
    localStorage.setItem('data', JSON.stringify(elementCollection))
    Toaster.create({ position: 'top' }).show({ message: 'Save Successfully', intent: 'success' })
  }

  function loadFromLocal() {
    try {
      const result = JSON.parse(localStorage.getItem('data'))
      setElementCollection(result)
      Toaster.create({ position: 'top' }).show({ message: 'Load Successfully', intent: 'success' })
    } catch (e) {
      Toaster.create({ position: 'top' }).show({ message: 'Load Failed', intent: 'danger' })
    }
  }

  return <div className="control-panel-actions">
    <Dialog className='add-multiple-dialog' isOpen={openAddMultipleElementsDialog}>
      <div className="add-multiple-dialog-content">
        <FormGroup label="Element Count" inline>
          <NumericInput value={randomElementCount} onValueChange={value => setRandomElementCount(value)} />
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
    <ButtonGroup fill>
      <Button icon="saved" onClick={saveToLocal}>Save</Button>
      <Button icon="import" onClick={loadFromLocal}>Load</Button>
    </ButtonGroup>
    <ButtonGroup fill style={{ marginTop: 10 }}>
      <Button onClick={() => addNewElement(setTargetId)} icon="plus">Add Single</Button>
      <Button onClick={() => toggleAddMultipleElementsDialog(true)} icon="new-object">Add Multiple</Button>
    </ButtonGroup>
    <ButtonGroup fill style={{ marginTop: 10 }}>
      <Button icon="copy" onClick={copyElement} disabled={!targetId}>Copy Element</Button>
    </ButtonGroup>
    <ButtonGroup fill style={{ marginTop: 10 }}>
      <Button intent="danger" icon="delete" onClick={deleteElement} disabled={!targetId}>Delete Element</Button>
    </ButtonGroup>
    <ButtonGroup fill style={{ marginTop: 10 }}>
      {!showAnimationPanel && <Button icon="drawer-right" onClick={() => toggleAnimationPanel(true)} disabled={!targetId}>Open Animation Panel</Button>}
      {showAnimationPanel && <Button icon="drawer-left" onClick={() => toggleAnimationPanel(false)} disabled={!targetId}>Close Animation Panel</Button>}
    </ButtonGroup>
    <FormGroup className='apply-to-all-switch' label="Apply To All" inline>
      <Switch value={applyToAll} onChange={event => toggleApplyToAll(event.target.checked)} />
    </FormGroup>
  </div>
}

export default ActionPanel

import { act, renderHook } from '@testing-library/react'
import { useCoreDataStore } from './core'
import { useConfigStore } from './config'
import { useUIStore } from './ui'
import {extractStyle, extractLatestElementStyle, verifyEveryElementStyle} from "../utils/test-helper";

describe('Core Store', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div style="width: 1440px;height: 720px" class="canvas-panel"></div>'
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })
  it('should able to update targetId', () => {
    const { result } = renderHook(() => useCoreDataStore())
    expect(result.current.targetId).toBeNull();
    act(() => {
      result.current.addNewElement();
      result.current.addNewElement();
    })
    expect(result.current.targetId).toBe(2)
    act(() => {
      result.current.setTargetId(1);
    })
    expect(result.current.targetId).toBe(1)
  })
  it('should able to get target element style', () => {
    const { result } = renderHook(() => useCoreDataStore())
    let targetWidthStyle = null;
    act(() => {
      result.current.addNewElement();
      targetWidthStyle = result.current.getTargetStyle('width')
    })
    expect(targetWidthStyle).toBe(200)
  })
  it('should return element style value as zero when no targetId exist', () => {
    const { result } = renderHook(() => useCoreDataStore())
    let targetWidthStyle = null;
    act(() => {
      result.current.setTargetId(null)
      targetWidthStyle = result.current.getTargetStyle('width')
    })
    expect(targetWidthStyle).toBe(0)
  })
  it('should able to get target element whole state', () => {
    const { result } = renderHook(() => useCoreDataStore())
    let targetElementState = null;
    act(() => {
      result.current.addNewElement();
      targetElementState = result.current.getTargetElementState();
    })
    expect(targetElementState).not.toBeNull()
    expect(targetElementState.width).toBe(200)
    expect(targetElementState.height).toBe(200)
    expect(targetElementState.backgroundColor).toBe('#FFFFFF')
  })
  it('should return element state as undefined when no targetId exist', () => {
    const { result } = renderHook(() => useCoreDataStore())
    let targetElementState = null;
    act(() => {
      result.current.setTargetId(null)
      targetElementState = result.current.getTargetElementState();
    })
    expect(targetElementState).toBeUndefined();
  })
  it('should able to update target style', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.updateTargetStyle('width', 250);
    })
    expect(extractStyle(result, 'width')).toBe(250)
  })
  it('should not throw exception when update target style with id not exist', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.setTargetId(null)
      result.current.updateTargetStyle('width', 250);
    })
  })
  it('should able to update all elements style when enabled apply to all', () => {
    const { result } = renderHook(() => useCoreDataStore())
    const { result: uiResult } = renderHook(() => useUIStore())
    act(() => {
      result.current.addNewElement();
      uiResult.current.toggleApplyToAll(true)
      result.current.updateTargetStyle('width', 250);
    })
    expect(verifyEveryElementStyle(result, 'width', 250)).toBeTruthy();
  })
  it('should able to delete element', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
    })
    const elementCountBeforeDelete = Object.keys(result.current.elementCollection).length;
    act(() => {
      result.current.deleteElement();
    })
    expect(Object.keys(result.current.elementCollection).length).toBe(elementCountBeforeDelete - 1)
  })
  it('should able to copy element', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.updateTargetStyle('backgroundColor', 'orange');
      result.current.updateTargetStyle('top', 300);
      result.current.updateTargetStyle('left', 400);
    })
    const elementCountBeforeDelete = Object.keys(result.current.elementCollection).length;
    act(() => {
      result.current.copyElement();
    })
    expect(Object.keys(result.current.elementCollection).length).toBe(elementCountBeforeDelete + 1)
    expect(extractStyle(result, 'backgroundColor')).toBe('orange')
    expect(extractStyle(result, 'top')).toBe(320)
    expect(extractStyle(result, 'left')).toBe(420)
  })
  it('should able to generate elements by generate new element', () => {
    const { result: coreResult } = renderHook(() => useCoreDataStore())
    const { result: configResult } = renderHook(() => useConfigStore())
    act(() => {
      coreResult.current.addNewElement();
      configResult.current.setRandomElementCount(10)
    })
    const elementCountBeforeDelete = Object.keys(coreResult.current.elementCollection).length;
    act(() => {
      coreResult.current.generateElements();
    })
    expect(Object.keys(coreResult.current.elementCollection).length).toBe(elementCountBeforeDelete + 10)
    expect(extractLatestElementStyle(coreResult, 'backgroundColor')).toBe('#FFFFFF')
  })
  it('should able to generate elements by clone selected element', () => {
    const { result: coreResult } = renderHook(() => useCoreDataStore())
    const { result: configResult } = renderHook(() => useConfigStore())
    const { result: uiResult } = renderHook(() => useUIStore())
    act(() => {
      coreResult.current.addNewElement();
      coreResult.current.updateTargetStyle('backgroundColor', 'orange');
      configResult.current.setRandomElementCount(10)
      uiResult.current.toggleCloneElementWhenAddMultipleElements(true)
    })
    const elementCountBeforeDelete = Object.keys(coreResult.current.elementCollection).length;
    act(() => {
      coreResult.current.generateElements();
    })
    expect(Object.keys(coreResult.current.elementCollection).length).toBe(elementCountBeforeDelete + 10)
    expect(extractLatestElementStyle(coreResult, 'backgroundColor')).toBe('orange')
  })
})

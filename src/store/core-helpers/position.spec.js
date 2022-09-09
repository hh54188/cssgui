import { act, renderHook } from '@testing-library/react'
import {extractStyle} from '../../utils/test-helper'
import {stateTemplate} from '../../element-state-template'
import { useCoreDataStore } from '../core'

describe('Position Store', () => {
  const canvasPanelHeight = 720;
  const canvasPanelWidth = 1440;

  const elementWidth = 200;
  const elementHeight = 200;

  beforeEach(() => {
    document.body.innerHTML = `<div style="width: ${canvasPanelWidth}px;height: ${canvasPanelHeight}px" class="canvas-panel"></div>`
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })
  it('should able to move top left', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.moveTopLeft();
    })
    expect(extractStyle(result, 'top')).toBe(0);
    expect(extractStyle(result, 'left')).toBe(0);
  })
  it('should able to move top center', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.moveTopCenter();
    })
    expect(extractStyle(result, 'top')).toBe(0);
    expect(extractStyle(result, 'left')).toBe(canvasPanelWidth / 2 - elementWidth / 2);
  })
  it('should able to move top right', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.moveTopRight();
    })
    expect(extractStyle(result, 'top')).toBe(0);
    expect(extractStyle(result, 'left')).toBe(canvasPanelWidth - elementWidth);
  })
  it('should able to move center left', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.moveCenterLeft();
    })
    expect(extractStyle(result, 'top')).toBe(canvasPanelHeight / 2 - elementHeight / 2);
    expect(extractStyle(result, 'left')).toBe(0);
  })
  it('should able to move center center', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.moveCenterCenter();
    })
    expect(extractStyle(result, 'top')).toBe(canvasPanelHeight / 2 - elementHeight / 2);
    expect(extractStyle(result, 'left')).toBe(canvasPanelWidth / 2 - elementWidth / 2);
  })
  it('should able to move center right', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.moveCenterRight();
    })
    expect(extractStyle(result, 'top')).toBe(canvasPanelHeight / 2 - elementHeight / 2);
    expect(extractStyle(result, 'left')).toBe(canvasPanelWidth - elementWidth);
  })
  it('should able to move bottom left', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.moveBottomLeft();
    })
    expect(extractStyle(result, 'top')).toBe(canvasPanelHeight - elementHeight);
    expect(extractStyle(result, 'left')).toBe(0);
  })
  it('should able to move bottom center', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.moveBottomCenter();
    })
    expect(extractStyle(result, 'top')).toBe(canvasPanelHeight - elementHeight);
    expect(extractStyle(result, 'left')).toBe(canvasPanelWidth / 2 - elementWidth / 2);
  })
  it('should able to move bottom right', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.moveBottomRight();
    })
    expect(extractStyle(result, 'top')).toBe(canvasPanelHeight - elementHeight);
    expect(extractStyle(result, 'left')).toBe(canvasPanelWidth - elementWidth);
  })
})

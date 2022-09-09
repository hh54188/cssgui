import { act, renderHook } from '@testing-library/react'
import {extractStyle} from '../../utils/test'
import {stateTemplate} from '../../element-state-template'
import { useCoreDataStore } from '../core'

describe('border Store', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div style="width: 1440px;height: 720px" class="canvas-panel"></div>'
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })
  it("should able to disable border allInOne feature", () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
    })
    expect(extractStyle(result, 'borderAllInOne')).toBeTruthy();
    act(() => {
      result.current.disableBorderAllInOne();
    })
    expect(extractStyle(result, 'borderAllInOne')).toBeFalsy();
  })
  it("should able to enable border allInOne feature", () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.disableBorderAllInOne();
    })
    expect(extractStyle(result, 'borderAllInOne')).toBeFalsy()
    act(() => {
      result.current.enableBorderAllInOne();
    })
    expect(extractStyle(result, 'borderAllInOne')).toBeTruthy();
  })
  it("should able to toggle border allInOne feature", () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
    })
    expect(extractStyle(result, 'borderAllInOne')).toBeTruthy()
    act(() => {
      result.current.toggleBorderAllInOne();
    })
    expect(extractStyle(result, 'borderAllInOne')).toBeFalsy();
    act(() => {
      result.current.toggleBorderAllInOne();
    })
    expect(extractStyle(result, 'borderAllInOne')).toBeTruthy();
  })
  it("should able to toggle border enabled feature", () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
    })
    expect(extractStyle(result, 'borderEnabled')).toBeTruthy()
    act(() => {
      result.current.toggleEnableBorder();
    })
    expect(extractStyle(result, 'borderEnabled')).toBeFalsy();
    act(() => {
      result.current.toggleEnableBorder();
    })
    expect(extractStyle(result, 'borderEnabled')).toBeTruthy();
  })
  it("should able to update border when enable all in one", () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
    })
    expect(extractStyle(result, 'borderAllInOne')).toBeTruthy()
    act(() => {
      result.current.updateBorder('width', 10);
    })
    const border = extractStyle(result, 'border');
    expect(border.top.width).toBe(10)
    expect(border.bottom.width).toBe(10)
    expect(border.left.width).toBe(10)
    expect(border.right.width).toBe(10)
  })
  it("should able to update border when disabled all in one", () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.toggleBorderAllInOne();
    })
    expect(extractStyle(result, 'borderAllInOne')).toBeFalsy()
    act(() => {
      result.current.updateBorder('width', 10, 'top');
    })
    const border = extractStyle(result, 'border');
    expect(border.top.width).toBe(10)
    expect(border.bottom.width).toBe(1)
    expect(border.left.width).toBe(1)
    expect(border.right.width).toBe(1)
  })
})

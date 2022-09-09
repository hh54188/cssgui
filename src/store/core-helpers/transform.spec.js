import { act, renderHook } from '@testing-library/react'
import {extractStyle} from '../../utils/test-helper'
import {stateTemplate} from '../../element-state-template'
import { useCoreDataStore } from '../core'

describe('Transform Store', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div style="width: 1440px;height: 720px" class="canvas-panel"></div>'
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })
  it('should able to update transform value', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
    })
    expect(extractStyle(result, 'transform').translate.x).toBe(0);
    act(() => {
      result.current.updateTransform('translate', 'x', 10);
    })
    expect(extractStyle(result, 'transform').translate.x).toBe(10);
  })
  it('should able to reset translate', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.updateTransform('translate', 'x', 10);
      result.current.updateTransform('translate', 'y', 10);
      result.current.updateTransform('translate', 'z', 10);
    })
    expect(extractStyle(result, 'transform').translate).toEqual({
      x: 10,
      y: 10,
      z: 10,
    });
    act(() => {
      result.current.resetTranslate();
    })
    expect(extractStyle(result, 'transform').translate).toEqual({
      x: 0,
      y: 0,
      z: 0,
    });
  })
  it('should able to reset scale', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.updateTransform('scale', 'x', 10);
      result.current.updateTransform('scale', 'y', 10);
      result.current.updateTransform('scale', 'z', 10);
    })
    expect(extractStyle(result, 'transform').scale).toEqual({
      x: 10,
      y: 10,
      z: 10,
    });
    act(() => {
      result.current.resetScale();
    })
    expect(extractStyle(result, 'transform').scale).toEqual({
      x: 1,
      y: 1,
      z: 1,
    });
  })
  it('should able to reset skew', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.updateTransform('skew', 'x', 10);
      result.current.updateTransform('skew', 'y', 10);
    })
    expect(extractStyle(result, 'transform').skew).toEqual({
      x: 10,
      y: 10,
    });
    act(() => {
      result.current.resetSkew();
    })
    expect(extractStyle(result, 'transform').skew).toEqual({
      x: 0,
      y: 0,
    });
  })
})

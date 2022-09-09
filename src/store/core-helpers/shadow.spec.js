import { act, renderHook } from '@testing-library/react'
import {extractStyle} from '../../utils/test'
import {stateTemplate} from '../../element-state-template'
import { useCoreDataStore } from '../core'

describe('BoxShadow Store', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div style="width: 1440px;height: 720px" class="canvas-panel"></div>'
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })
  it('should able to add boxShadow', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
    })
    expect(extractStyle(result, 'boxShadow').length).toBe(1);
    act(() => {
      result.current.addShadow();
    })
    expect(extractStyle(result, 'boxShadow').length).toBe(2);
  })
  it('should able to update boxShadow', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.updateShadow(0, 'blurRadius', 30);
    })
    expect(extractStyle(result, 'boxShadow')[0].blurRadius).toBe(30);
  })
  it('should able to remove boxShadow', () => {
    const { result } = renderHook(() => useCoreDataStore())
    const oldBlurRadiusValue = 20;
    const newBlurRadiusValue = 30;
    act(() => {
      result.current.addNewElement();
      result.current.addShadow();
      result.current.addShadow();
      result.current.updateShadow(1, 'blurRadius', newBlurRadiusValue);
    })
    expect(extractStyle(result, 'boxShadow').length).toBe(3);
    expect(extractStyle(result, 'boxShadow')[1].blurRadius).toBe(newBlurRadiusValue);
    act(() => {
      result.current.removeShadow(1);
    })
    expect(extractStyle(result, 'boxShadow').length).toBe(2);
    expect(extractStyle(result, 'boxShadow')[1].blurRadius).toBe(oldBlurRadiusValue);
  })
})

import { act, renderHook } from '@testing-library/react'
import {extractStyle} from '../../utils/test-helper'
import {stateTemplate} from '../../element-state-template'
import { useCoreDataStore } from '../core'

describe('Animation Store', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div style="width: 1440px;height: 720px" class="canvas-panel"></div>'
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })
  it("should update animation meta property", () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
    })
    expect(extractStyle(result, 'animation').duration).toBe(0.3);
    act(() => {
      result.current.updateAnimationProperty('duration', 1);
    })
    expect(extractStyle(result, 'animation').duration).toBe(1);
  })
  it("should update animated property", () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
    })
    expect(extractStyle(result, 'animation').animatedProperties.position).toBeFalsy();
    act(() => {
      result.current.updateAnimationAnimatedProperties('position', true);
    })
    expect(extractStyle(result, 'animation').animatedProperties.position).toBeTruthy()
  })
})

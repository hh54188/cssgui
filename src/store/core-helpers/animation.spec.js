import { act, renderHook } from '@testing-library/react'
import {extractStyle} from '../../utils/test-helper'
import {stateTemplate} from '../../element-state-template'
import { useCoreDataStore } from '../core'
import {createBoxShadowString} from "../../utils";

describe('Animation Store', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
    document.body.innerHTML = '<div style="width: 1440px;height: 720px" class="canvas-panel"></div>'
  })
  afterEach(() => {
    document.body.innerHTML = ''
    document.head.innerHTML = ''
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
  it("should save animation start status", () => {
    const { result } = renderHook(() => useCoreDataStore())
    const startStatus = ['background:white']
    act(() => {
      result.current.addNewElement();
    })
    expect(extractStyle(result, 'animation').animationTimeline.length).toBe(0);
    act(() => {
      result.current.saveAnimationStartStatus(startStatus);
    })
    expect(extractStyle(result, 'animation').animationTimeline.length).toBe(1);
    expect(extractStyle(result, 'animation').animationTimeline[0]).toEqual(startStatus)
  })
  it("should save animation end status", () => {
    const { result } = renderHook(() => useCoreDataStore())
    const endStatus = ['background:red']
    act(() => {
      result.current.addNewElement();
    })
    expect(extractStyle(result, 'animation').animationTimeline.length).toBe(0);
    act(() => {
      result.current.saveAnimationEndStatus(endStatus);
    })
    expect(extractStyle(result, 'animation').animationTimeline.length).toBe(2);
    expect(extractStyle(result, 'animation').animationTimeline[1]).toEqual(endStatus)
  })
  it("should play animation", () => {
    const { result } = renderHook(() => useCoreDataStore())
    const startStatus = ['background:white']
    const endStatus = ['background:red']
    act(() => {
      result.current.addNewElement();
      result.current.saveAnimationStartStatus(startStatus);
      result.current.saveAnimationEndStatus(endStatus);
    })
    expect(document.querySelectorAll('head style').length).toBe(0)
    act(() => {
      result.current.playAnimation();
    })
    expect(document.querySelectorAll('head style').length).toBe(1)
    const styleBlock = document.querySelector('head style');
    const styleBlockId = styleBlock.id
    const styleBlockContent = styleBlock.innerHTML
    expect(extractStyle(result, 'animation').name).toBe(styleBlockId);
    expect(styleBlockContent.indexOf(startStatus[0]) > -1).toBeTruthy();
    expect(styleBlockContent.indexOf(endStatus[0]) > -1).toBeTruthy();
  })
  it("should stop animation", () => {
    const { result } = renderHook(() => useCoreDataStore())
    const startStatus = ['background:white']
    const endStatus = ['background:red']
    act(() => {
      result.current.addNewElement();
      result.current.saveAnimationStartStatus(startStatus);
      result.current.saveAnimationEndStatus(endStatus);
      result.current.playAnimation();
    })
    expect(document.querySelectorAll('head style').length).toBe(1)
    act(() => {
      result.current.stopAnimation();
    })
    expect(document.querySelectorAll('head style').length).toBe(0)
    expect(extractStyle(result, 'animation').name).toBe('')
  })
  it("should generate status by size properties", () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.updateTargetStyle('width', 200);
      result.current.updateTargetStyle('height', 200);
      result.current.updateAnimationAnimatedProperties('size', true)
    })
    const status = result.current.getStatusByProperties();
    expect(status).toEqual(['width:200px', 'height:200px'])
  })
  it("should generate status by position properties", () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.updateTargetStyle('left', 220);
      result.current.updateTargetStyle('top', 230);
      result.current.updateAnimationAnimatedProperties('position', true)
    })
    const status = result.current.getStatusByProperties();
    expect(status).toEqual(['left:220px', 'top:230px'])
  })
  it("should generate status by background properties", () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.updateTargetStyle('backgroundColor', 'red');
      result.current.updateAnimationAnimatedProperties('background', true)
    })
    const status = result.current.getStatusByProperties();
    expect(status).toEqual(['background:red'])
  })
  it("should generate status by border properties", () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.enableBorderAllInOne();
      result.current.updateBorder('width', 10);
      result.current.updateBorder('style', 'dashed');
      result.current.updateBorder('color', 'red');
      result.current.updateAnimationAnimatedProperties('border', true)
    })
    const status = result.current.getStatusByProperties();
    expect(status).toEqual([
      'border-top: 10px dashed red',
      'border-bottom: 10px dashed red',
      'border-left: 10px dashed red',
      'border-right: 10px dashed red',
    ])
  })
  it("should generate status by boxShadow properties", () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.updateShadow(0, 'blurRadius', 30);
      result.current.updateAnimationAnimatedProperties('boxShadow', true)
    })
    const status = result.current.getStatusByProperties();
    expect(status).toEqual([`box-shadow: ${createBoxShadowString(extractStyle(result, 'boxShadow'))}`])
  })
  it("should generate status by translate properties", () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.updateTransform('translate', 'x', 10);
      result.current.updateTransform('translate', 'y', 20);
      result.current.updateTransform('translate', 'z', 30);
      result.current.updateAnimationAnimatedProperties('translate', true)
    })
    const status = result.current.getStatusByProperties();
    expect(status).toEqual([`transform: translate3d(10px, 20px, 30px)`])
  })
  it("should generate status by scale properties", () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.updateTransform('scale', 'x', 10);
      result.current.updateTransform('scale', 'y', 20);
      result.current.updateTransform('scale', 'z', 30);
      result.current.updateAnimationAnimatedProperties('scale', true)
    })
    const status = result.current.getStatusByProperties();
    expect(status).toEqual([`transform: scale3d(10px, 20px, 30px)`])
  })
  it("should generate status by skew properties", () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
      result.current.updateTransform('skew', 'x', 10);
      result.current.updateTransform('skew', 'y', 20);
      result.current.updateAnimationAnimatedProperties('skew', true)
    })
    const status = result.current.getStatusByProperties();
    expect(status).toEqual([`transform: skew(10deg, 20deg)`])
  })
})

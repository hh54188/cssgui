import { act, renderHook } from '@testing-library/react'
import { v4 as uuidv4 } from 'uuid'
import { useGradientStore, maxOffset, computePercentage} from './gradient'

const preset4test = [{
  id: uuidv4(),
  offset: 0,
  color: '#000000',
  percentage: 0,
  visible: true,
}, {
  id: uuidv4(),
  offset: 30,
  color: '#444444',
  percentage: 50,
  visible: true,
}, {
  id: uuidv4(),
  offset: maxOffset,
  color: '#ffffff',
  percentage: 100,
  visible: true,
}];

describe('Gradient Store', () => {
  it('should update current element id successfully', () => {
    const { result } = renderHook(() => useGradientStore())
    const id = uuidv4();
    expect(result.current.curElementId).toBe(0)
    act(() => {
      result.current.setCurElementId(id)
    })
    expect(result.current.curElementId).toBe(id)
  })
  it('should update angle successfully', () => {
    const { result } = renderHook(() => useGradientStore())
    expect(result.current.gradientAngle).toBe(90)
    act(() => {
      result.current.setGradientAngle(360)
    })
    expect(result.current.gradientAngle).toBe(360)
  })
  it('should update gradient stops successfully', () => {
    const { result } = renderHook(() => useGradientStore())
    expect(result.current.gradientStops.length).toBe(2)
    act(() => {
      result.current.setGradientStops(preset4test)
    })
    expect(result.current.gradientStops.length).toBe(3)
  })
  it('should update gradient stop offset successfully', () => {
    const { result } = renderHook(() => useGradientStore())
    act(() => {
      result.current.setGradientStops(preset4test)
    })
    expect(result.current.gradientStops[0].offset).toBe(0)
    act(() => {
      result.current.setCurElementId(result.current.gradientStops[0].id)
      result.current.setGradientStopOffset(60)
    })
    const offset = 60;
    expect(result.current.gradientStops[1].offset).toBe(offset)
    expect(result.current.gradientStops[1].percentage).toBe(computePercentage(offset))
  })
  describe('gradient stop percentage', () => {
    it('should update gradient stop percentage successfully when percentage less than 0', () => {
      const { result } = renderHook(() => useGradientStore())
      act(() => {
        result.current.setGradientStops(preset4test)
      })
      expect(result.current.gradientStops[0].offset).toBe(0)
      act(() => {
        result.current.setCurElementId(result.current.gradientStops[0].id)
        result.current.setGradientStopPercentage(-100)
      })
      expect(result.current.gradientStops[0].percentage).toBe(0)
      expect(result.current.gradientStops[0].offset).toBe(0)
    })
    it('should update gradient stop percentage successfully when percentage larger than 100', () => {
      const { result } = renderHook(() => useGradientStore())
      act(() => {
        result.current.setGradientStops(preset4test)
      })
      expect(result.current.gradientStops[2].percentage).toBe(100)
      act(() => {
        result.current.setCurElementId(result.current.gradientStops[2].id)
        result.current.setGradientStopPercentage(200)
      })
      expect(result.current.gradientStops[2].percentage).toBe(100)
      expect(result.current.gradientStops[2].offset).toBe(maxOffset)
    })
    it('should update gradient stop percentage successfully', () => {
      const { result } = renderHook(() => useGradientStore())
      act(() => {
        result.current.setGradientStops(preset4test)
      })
      act(() => {
        result.current.setCurElementId(result.current.gradientStops[1].id)
        result.current.setGradientStopPercentage(40)
      })
      expect(result.current.gradientStops[1].percentage).toBe(40)
    })
  })
  it('should update gradient stop offset successfully', () => {
    const { result } = renderHook(() => useGradientStore())
    act(() => {
      result.current.setGradientStops(preset4test)
    })
    expect(result.current.gradientStops[0].offset).toBe(0)
    act(() => {
      result.current.setCurElementId(result.current.gradientStops[0].id)
      result.current.setGradientStopOffset(60)
    })
    const offset = 60;
    expect(result.current.gradientStops[1].offset).toBe(offset)
    expect(result.current.gradientStops[1].percentage).toBe(computePercentage(offset))
  })
  it('should update gradient stop color', () => {
    const { result } = renderHook(() => useGradientStore())
    act(() => {
      result.current.setGradientStops(preset4test)
      result.current.updateGradientStopColor(0, { hex: '#cccccc' })
    })
    expect(result.current.gradientStops[0].color).toBe('#cccccc')
  })
  it('should remove gradient stop', () => {
    const { result } = renderHook(() => useGradientStore())
    act(() => {
      result.current.setGradientStops(preset4test)
      result.current.removeGradientStop(1)
    })
    expect(result.current.gradientStops.length).toBe(2)
    expect(result.current.gradientStops.map(stop => stop.color)).toEqual([preset4test[0].color, preset4test[2].color])
  })
  it('should copy gradient stop', () => {
    const { result } = renderHook(() => useGradientStore())
    act(() => {
      result.current.setGradientStops(preset4test)
      result.current.copyGradientStop(1)
    })
    expect(result.current.gradientStops.length).toBe(4)
    expect(result.current.gradientStops[1].color).toBe(preset4test[1].color)
    expect(result.current.gradientStops[2].color).toBe(preset4test[1].color)
  })
  it('should copy gradient stop when source is last gradient stop', () => {
    const { result } = renderHook(() => useGradientStore())
    act(() => {
      result.current.setGradientStops(preset4test)
      result.current.copyGradientStop(2)
    })
    expect(result.current.gradientStops.length).toBe(4)
    expect(result.current.gradientStops[3].color).toBe(preset4test[2].color)
  })
  it('should toggle visible', () => {
    const { result } = renderHook(() => useGradientStore())
    act(() => {
      result.current.setGradientStops(preset4test)
      result.current.toggleGradientStopVisible(1)
    })
    expect(result.current.gradientStops[1].visible).toBeFalsy()
  })
  it('should applye gradient preset', () => {
    const { result } = renderHook(() => useGradientStore())
    act(() => {
      result.current.setGradientStops(preset4test)
      result.current.applyGradientPreset(1)
    })
    expect(result.current.gradientStops.map(stop => stop.color)).toEqual(['#3c3b3f', '#605c3c'])
  })
  describe('add gradient stop', () => {
    it('should add gradient stop when offset less than first stop', () => {
      const { result } = renderHook(() => useGradientStore())
      act(() => {
        result.current.setGradientStops(preset4test)

        result.current.setCurElementId(preset4test[0].id)
        result.current.setGradientStopOffset(10)

        result.current.setCurElementId(preset4test[2].id)
        result.current.setGradientStopOffset(100)

        result.current.addGradientStop(1)
      })
      expect(result.current.gradientStops.length).toBe(4)
      expect(result.current.gradientStops[0].color).toBe(result.current.gradientStops[1].color)
      expect(result.current.gradientStops[0].offset).toBe(1)
    })
    it('should add gradient stop when offset large last stop', () => {
      const { result } = renderHook(() => useGradientStore())
      act(() => {
        result.current.setGradientStops(preset4test)

        result.current.setCurElementId(preset4test[0].id)
        result.current.setGradientStopOffset(10)

        result.current.setCurElementId(preset4test[2].id)
        result.current.setGradientStopOffset(100)

        result.current.addGradientStop(400)
      })
      expect(result.current.gradientStops.length).toBe(4)
      expect(result.current.gradientStops[3].color).toBe(result.current.gradientStops[2].color)
      expect(result.current.gradientStops[3].offset).toBe(400)
    })
    it('should add gradient stop when offset large last stop', () => {
      const { result } = renderHook(() => useGradientStore())
      act(() => {
        result.current.setGradientStops(preset4test)
        result.current.addGradientStop(100)
      })
      expect(result.current.gradientStops.length).toBe(4)
      expect(result.current.gradientStops[2].offset).toBe(100)
    })
  })
})

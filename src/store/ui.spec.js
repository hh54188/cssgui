import { act, renderHook } from '@testing-library/react'
import { useUIStore } from './ui'

describe('UI Store', () => {
  describe("applyToAll", () => {
    it('should applyToAll initialized to false', () => {
      const { result } = renderHook(() => useUIStore())
      expect(result.current.applyToAll).toBe(false)
    })

    it('should toggleApplyToAll can update applyToAll value', () => {
      const { result } = renderHook(() => useUIStore())
      act(() => {
        result.current.toggleApplyToAll(true)
      })
      expect(result.current.applyToAll).toBe(true)
    })
  })

  describe("positionHorizontalValueState", () => {
    it('should positionHorizontalValueState initialized to "Left"', () => {
      const { result } = renderHook(() => useUIStore())
      expect(result.current.positionHorizontalValueState).toBe('Left')
    })

    it('should setPositionHorizontalValue can update positionHorizontalValueState value', () => {
      const { result } = renderHook(() => useUIStore())
      act(() => {
        result.current.setPositionHorizontalValue("Right")
      })
      expect(result.current.positionHorizontalValueState).toBe("Right")
    })
  })

  describe("positionVerticalValueState", () => {
    it('should positionVerticalValueState initialized to "Top"', () => {
      const { result } = renderHook(() => useUIStore())
      expect(result.current.positionVerticalValueState).toBe('Top')
    })

    it('should setPositionVerticalValue can update positionHorizontalValueState value', () => {
      const { result } = renderHook(() => useUIStore())
      act(() => {
        result.current.setPositionVerticalValue("Bottom")
      })
      expect(result.current.positionVerticalValueState).toBe("Bottom")
    })
  })

  describe("dragStartPoint", () => {
    it('should dragStartPoint initialized to [0,0]', () => {
      const { result } = renderHook(() => useUIStore())
      expect(result.current.dragStartPoint).toEqual([0,0])
    })

    it('should setDragStartPoint can update dragStartPoint value', () => {
      const { result } = renderHook(() => useUIStore())
      act(() => {
        result.current.setDragStartPoint([10, 20])
      })
      expect(result.current.dragStartPoint).toEqual([10, 20])
    })
  })

  describe("dragBegin", () => {
    it('should dragBegin initialized to false', () => {
      const { result } = renderHook(() => useUIStore())
      expect(result.current.dragBegin).toBe(false)
    })

    it('should setDragBegin can update dragBegin value', () => {
      const { result } = renderHook(() => useUIStore())
      act(() => {
        result.current.setDragBegin(true)
      })
      expect(result.current.dragBegin).toEqual(true)
    })
  })

  describe("dragStartElementPoint", () => {
    it('should dragStartElementPoint initialized to [0,0]', () => {
      const { result } = renderHook(() => useUIStore())
      expect(result.current.dragStartElementPoint).toEqual([0,0])
    })

    it('should setDragStartElementPoint can update dragStartElementPoint value', () => {
      const { result } = renderHook(() => useUIStore())
      act(() => {
        result.current.setDragStartElementPoint([10, 20])
      })
      expect(result.current.dragStartElementPoint).toEqual([10,20])
    })
  })

  describe("showAnimationPanel", () => {
    it('should showAnimationPanel initialized to false', () => {
      const { result } = renderHook(() => useUIStore())
      expect(result.current.showAnimationPanel).toBe(false)
    })

    it('should toggleAnimationPanel can update showAnimationPanel value', () => {
      const { result } = renderHook(() => useUIStore())
      act(() => {
        result.current.toggleAnimationPanel(true)
      })
      expect(result.current.showAnimationPanel).toBe(true)
    })
  })

  describe("openAddMultipleElementsDialog", () => {
    it('should openAddMultipleElementsDialog initialized to false', () => {
      const { result } = renderHook(() => useUIStore())
      expect(result.current.openAddMultipleElementsDialog).toBe(false)
    })

    it('should toggleAddMultipleElementsDialog can update openAddMultipleElementsDialog value', () => {
      const { result } = renderHook(() => useUIStore())
      act(() => {
        result.current.toggleAddMultipleElementsDialog(true)
      })
      expect(result.current.openAddMultipleElementsDialog).toBe(true)
    })
  })

  describe("cloneElementWhenAddMultipleElements", () => {
    it('should cloneElementWhenAddMultipleElements initialized to false', () => {
      const { result } = renderHook(() => useUIStore())
      expect(result.current.cloneElementWhenAddMultipleElements).toBe(false)
    })

    it('should toggleCloneElementWhenAddMultipleElements can update cloneElementWhenAddMultipleElements value', () => {
      const { result } = renderHook(() => useUIStore())
      act(() => {
        result.current.toggleCloneElementWhenAddMultipleElements(true)
      })
      expect(result.current.cloneElementWhenAddMultipleElements).toBe(true)
    })
  })
})

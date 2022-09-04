import { act, renderHook } from '@testing-library/react'
import { useConfigStore } from './config'

describe('UI Store', () => {
  it('should have an initial value of 0', () => {
    const { result } = renderHook(() => useConfigStore())
    expect(result.current.randomElementCount).toBe(1000)
  })

  it('should increment the value', () => {
    const { result } = renderHook(() => useConfigStore())
    act(() => {
      result.current.setRandomElementCount(2000)
    })
    expect(result.current.randomElementCount).toBe(2000)
  })
})

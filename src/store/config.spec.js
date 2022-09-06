import { act, renderHook } from '@testing-library/react'
import { useConfigStore } from './config'

describe('Config Store', () => {
  it('should randomElementCount initialized', () => {
    const { result } = renderHook(() => useConfigStore())
    expect(result.current.randomElementCount).toBe(1000)
  })

  it('should setRandomElementCount can update randomElementCount value', () => {
    const { result } = renderHook(() => useConfigStore())
    act(() => {
      result.current.setRandomElementCount(2000)
    })
    expect(result.current.randomElementCount).toBe(2000)
  })
})

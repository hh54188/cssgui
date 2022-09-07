import { act, renderHook } from '@testing-library/react'
import { useCoreDataStore } from '../core'

describe('BoxShadow Store', () => {
  it('should initialize boxShadow property', () => {
    const { result } = renderHook(() => useCoreDataStore())
    act(() => {
      result.current.addNewElement();
    })
    expect(result.current.elementCollection.length).toBe(1)
  })
})

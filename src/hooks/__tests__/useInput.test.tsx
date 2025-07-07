import { renderHook, act } from '@testing-library/react'
import useInput from '../useInput'

describe('useInput', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useInput())
    expect(result.current.value).toBe('')
  })

  it('should initialize with provided initial value', () => {
    const { result } = renderHook(() => useInput('test'))
    expect(result.current.value).toBe('test')
  })

  it('should update value using onChange', () => {
    const { result } = renderHook(() => useInput())
    
    act(() => {
      const mockEvent = {
        target: { value: 'new value' }
      } as React.ChangeEvent<HTMLInputElement>
      result.current.onChange(mockEvent)
    })

    expect(result.current.value).toBe('new value')
  })

  it('should update value using setValue', () => {
    const { result } = renderHook(() => useInput('initial'))
    
    act(() => {
      result.current.setValue('updated')
    })

    expect(result.current.value).toBe('updated')
  })

//   it('should handle multiple updates', () => {
//     const { result } = renderHook(() => useInput('first'));
    
//     act(() => {
//       const mockEvent1 = {
//         target: { value: 'second' }
//       } as React.ChangeEvent<HTMLInputElement>;
//       result.current.onChange(mockEvent1);
//     });

//     expect(result.current.value).toBe('second');

//     act(() => {
//       result.current.setValue('third');
//     });

//     expect(result.current.value).toBe('third');
//   });

  it('should handle empty string', () => {
    const { result } = renderHook(() => useInput('initial'))
    
    act(() => {
      const mockEvent = {
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>
      result.current.onChange(mockEvent)
    })

    expect(result.current.value).toBe('')
  })
})
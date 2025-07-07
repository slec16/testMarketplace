import { renderHook, act } from '@testing-library/react'
import { useLocation, useNavigate } from 'react-router'
import { useQueryParams } from '../useQueryParams'

// Мокаем react-router
jest.mock('react-router', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}))

describe('useQueryParams', () => {
  const mockNavigate = jest.fn()
  const mockUseLocation = useLocation as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate)
  })

  it('should return empty params when no query string', () => {
    mockUseLocation.mockReturnValue({ search: '' })

    const { result } = renderHook(() => useQueryParams())

    expect(result.current.queryParams.toString()).toBe('')
    expect(result.current.getParam('test')).toBeNull()
    expect(result.current.currentParams).toEqual({})
  })

  it('should parse existing query params', () => {
    mockUseLocation.mockReturnValue({ search: '?name=test&page=1' })

    const { result } = renderHook(() => useQueryParams())

    expect(result.current.getParam('name')).toBe('test')
    expect(result.current.getParam('page')).toBe('1')
    expect(result.current.currentParams).toEqual({
      name: 'test',
      page: '1'
    })
  })

  it('should set new query params', () => {
    mockUseLocation.mockReturnValue({ search: '?name=test' })

    const { result } = renderHook(() => useQueryParams())

    act(() => {
      result.current.setQueryParams({ page: '2', sort: 'asc' })
    })

    expect(mockNavigate).toHaveBeenCalledWith(
      { search: 'name=test&page=2&sort=asc' },
      { replace: true }
    )
  })

  it('should update existing query params', () => {
    mockUseLocation.mockReturnValue({ search: '?name=test&page=1' })

    const { result } = renderHook(() => useQueryParams())

    act(() => {
      result.current.setQueryParams({ page: '2', sort: 'desc' })
    })

    expect(mockNavigate).toHaveBeenCalledWith(
      { search: 'name=test&page=2&sort=desc' },
      { replace: true }
    )
  })

  it('should remove params when value is empty', () => {
    mockUseLocation.mockReturnValue({ search: '?name=test&page=1' })

    const { result } = renderHook(() => useQueryParams())

    act(() => {
      result.current.setQueryParams({ page: '' })
    })

    expect(mockNavigate).toHaveBeenCalledWith(
      { search: 'name=test' },
      { replace: true }
    )
  })

  it('should handle multiple operations', () => {
    mockUseLocation.mockReturnValue({ search: '?name=test&page=1' })

    const { result } = renderHook(() => useQueryParams())

    act(() => {
      result.current.setQueryParams({ 
        page: '2', 
        sort: 'asc',
        filter: ''
      })
    })

    expect(mockNavigate).toHaveBeenCalledWith(
      { search: 'name=test&page=2&sort=asc' },
      { replace: true }
    )
  })

  it('should handle URL encoded values', () => {
    mockUseLocation.mockReturnValue({ search: '?name=test%20value' })

    const { result } = renderHook(() => useQueryParams())

    expect(result.current.getParam('name')).toBe('test value')
    expect(result.current.currentParams).toEqual({
      name: 'test value'
    })
  })
})
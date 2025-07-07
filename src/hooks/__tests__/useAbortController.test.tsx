import { renderHook } from '@testing-library/react'
import { useAbortController } from '../useAbortController'
import { useLocation } from 'react-router'

// Мокаем зависимости
jest.mock('react-router', () => ({
  useLocation: jest.fn(),
}))

describe('useAbortController', () => {
  const mockUseLocation = useLocation as jest.Mock
  let abortSpy: jest.Mock

  beforeEach(() => {
    abortSpy = jest.fn()
    
    // Правильно мокаем AbortController
    global.AbortController = jest.fn(() => ({
      signal: {},
      abort: abortSpy,
    })) as any
    
    mockUseLocation.mockReturnValue({ pathname: '/initial' })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create and return AbortController instance', () => {
    const { result } = renderHook(() => useAbortController())
    const controller = result.current.createAbortController()

    expect(AbortController).toHaveBeenCalledTimes(1)
    expect(controller).toBeDefined()
    expect(controller.abort).toBeDefined()
  })

  it('should abort specific controller', () => {
    const { result } = renderHook(() => useAbortController())
    
    // Создаем два контроллера
    const controller1 = result.current.createAbortController()
    const controller2 = result.current.createAbortController()

    // Сбрасываем счетчик вызовов перед тестом
    abortSpy.mockClear()
    
    // Абортим конкретный контроллер
    result.current.abortSpecificController(controller1)

    // Проверяем что abort был вызван 1 раз
    expect(abortSpy).toHaveBeenCalledTimes(1)
  })

  it('should abort all controllers on unmount', () => {
    const { result, unmount } = renderHook(() => useAbortController())
    
    // Создаем два контроллера
    result.current.createAbortController()
    result.current.createAbortController()

    // Сбрасываем счетчик перед unmount
    abortSpy.mockClear()
    
    unmount()

    // Должны быть вызваны 2 abort (по одному для каждого контроллера)
    expect(abortSpy).toHaveBeenCalledTimes(2)
  })

  it('should abort all controllers when location changes', () => {
    const { result, rerender } = renderHook(() => useAbortController())
    
    // Создаем два контроллера
    result.current.createAbortController()
    result.current.createAbortController()

    // Сбрасываем счетчик перед изменением location
    abortSpy.mockClear()
    
    // Меняем location
    mockUseLocation.mockReturnValue({ pathname: '/new-path' })
    rerender({})

    // Должны быть вызваны 2 abort
    expect(abortSpy).toHaveBeenCalledTimes(2)
  })

  it('should not abort controllers when location pathname does not change', () => {
    const { result, rerender } = renderHook(() => useAbortController())
    
    // Создаем контроллер
    result.current.createAbortController()

    // Сбрасываем счетчик
    abortSpy.mockClear()
    
    // Ререндерим с тем же pathname
    mockUseLocation.mockReturnValue({ pathname: '/initial' })
    rerender({})

    // abort не должен быть вызван
    expect(abortSpy).not.toHaveBeenCalled()
  })

})
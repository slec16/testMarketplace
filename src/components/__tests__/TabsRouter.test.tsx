import { render, screen } from '@testing-library/react'
import TabsRouter from '../TabsRouter'
import { useLocation, matchPath } from 'react-router'
import { MemoryRouter } from 'react-router'

// Мокаем зависимости
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useLocation: jest.fn(),
    matchPath: jest.fn(),
}))

describe('TabsRouter', () => {
    const mockUseLocation = useLocation as jest.Mock
    const mockMatchPath = matchPath as jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should render all tabs with profile tab active by default', () => {
        mockUseLocation.mockReturnValue({ pathname: '/' })
        mockMatchPath.mockImplementation((pattern) =>
            pattern === '/' ? { pattern: { path: '/' } } : null
        )

        render(
            <MemoryRouter initialEntries={['/']}>
                <TabsRouter />
            </MemoryRouter>
        )

        expect(screen.getByRole('tab', { name: 'Профиль' })).toHaveAttribute('aria-selected', 'true')
        expect(screen.getByRole('tab', { name: 'Заказы' })).toHaveAttribute('aria-selected', 'false')
        expect(screen.getByRole('tab', { name: 'Объявления' })).toHaveAttribute('aria-selected', 'false')
    })

    it('should activate orders tab when on /orders path', () => {
        mockUseLocation.mockReturnValue({ pathname: '/orders' })
        mockMatchPath.mockImplementation((pattern) =>
            pattern === '/orders' ? { pattern: { path: '/orders' } } : null
        )

        render(
            <MemoryRouter initialEntries={['/orders']}>
                <TabsRouter />
            </MemoryRouter>
        )

        expect(screen.getByRole('tab', { name: 'Профиль' })).toHaveAttribute('aria-selected', 'false')
        expect(screen.getByRole('tab', { name: 'Заказы' })).toHaveAttribute('aria-selected', 'true')
        expect(screen.getByRole('tab', { name: 'Объявления' })).toHaveAttribute('aria-selected', 'false')
    })

    it('should activate advertisements tab when on /advertisements path', () => {
        mockUseLocation.mockReturnValue({ pathname: '/advertisements' })
        mockMatchPath.mockImplementation((pattern) =>
            pattern === '/advertisements' ? { pattern: { path: '/advertisements' } } : null
        )

        render(
            <MemoryRouter initialEntries={['/advertisements']}>
                <TabsRouter />
            </MemoryRouter>
        )

        expect(screen.getByRole('tab', { name: 'Профиль' })).toHaveAttribute('aria-selected', 'false')
        expect(screen.getByRole('tab', { name: 'Заказы' })).toHaveAttribute('aria-selected', 'false')
        expect(screen.getByRole('tab', { name: 'Объявления' })).toHaveAttribute('aria-selected', 'true')
    })

    it('should not activate any tab for unknown paths', () => {
        mockUseLocation.mockReturnValue({ pathname: '/unknown' })
        mockMatchPath.mockReturnValue(null)

        render(
            <MemoryRouter initialEntries={['/unknown']}>
                <TabsRouter />
            </MemoryRouter>
        )

        expect(screen.getByRole('tab', { name: 'Профиль' })).toHaveAttribute('aria-selected', 'false')
        expect(screen.getByRole('tab', { name: 'Заказы' })).toHaveAttribute('aria-selected', 'false')
        expect(screen.getByRole('tab', { name: 'Объявления' })).toHaveAttribute('aria-selected', 'false')
    })

    it('should render correct links for each tab', () => {
        mockUseLocation.mockReturnValue({ pathname: '/' })
        mockMatchPath.mockImplementation((pattern) =>
            pattern === '/' ? { pattern: { path: '/' } } : null
        )

        render(
            <MemoryRouter initialEntries={['/']}>
                <TabsRouter />
            </MemoryRouter>
        )

        expect(screen.getByRole('tab', { name: 'Профиль' })).toHaveAttribute('href', '/')
        expect(screen.getByRole('tab', { name: 'Заказы' })).toHaveAttribute('href', '/orders')
        expect(screen.getByRole('tab', { name: 'Объявления' })).toHaveAttribute('href', '/advertisements')
    })
})
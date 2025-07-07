import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import Advertisements from '../Advertisements'
import { MemoryRouter } from 'react-router'
import ApiService from '../../services/api-service'
import { useAbortController } from '../../hooks/useAbortController'
import { useQueryParams } from '../../hooks/useQueryParams'

// Мокируем зависимости
jest.mock('../../services/api-service')
jest.mock('../../hooks/useAbortController')
jest.mock('../../hooks/useQueryParams')
jest.mock('../modalCreateAdvertisement', () => () => <div data-testid="create-ad-modal" />)
jest.mock('../List', () => ({ arrayOfAdvertisements }: any) => (
    <div data-testid="mock-list">
        {arrayOfAdvertisements.map((item: any) => (
            <div key={item.id}>{item.name}</div>
        ))}
    </div>
))

// Мокируем Material-UI компоненты с data-testid
jest.mock('@mui/icons-material/Search', () => () => <div data-testid="search-icon" />)
jest.mock('@mui/icons-material/AddCircleOutline', () => () => <div data-testid="add-icon" />)
jest.mock('@mui/icons-material/Sort', () => () => <div data-testid="sort-icon" />)
jest.mock('@mui/material/Menu', () => (props: any) => (
    <div data-testid="menu">
        {props.open && props.children}
    </div>
))
jest.mock('@mui/material/MenuItem', () => (props: any) => (
    <div data-testid="menu-item" onClick={props.onClick}>
        {props.children}
    </div>
))
jest.mock('@mui/material/Snackbar', () => (props: any) => (
    props.open ? <div data-testid="snackbar">{props.children}</div> : null
))

describe('Advertisements Component', () => {
    const mockAdvertisements = [
        { id: '1', name: 'Test Ad 1', price: '1000', views: 10, likes: 5 },
        { id: '2', name: 'Test Ad 2', price: '2000', views: 20, likes: 10 }
    ]

    const mockPagination = {
        first: 1,
        items: 2,
        last: 1,
        next: null,
        pages: 1,
        prev: null
    }

    const mockController = {
        signal: 'test-signal',
        abort: jest.fn()
    }

    const mockSetQueryParams = jest.fn()

    beforeEach(() => {
        // Настраиваем моки
        ; (ApiService.getAdvertisements as jest.Mock).mockResolvedValue({
            data: mockAdvertisements,
            ...mockPagination
        })

            ; (useAbortController as jest.Mock).mockReturnValue({
                createAbortController: jest.fn().mockReturnValue(mockController)
            })

            ; (useQueryParams as jest.Mock).mockReturnValue({
                queryParams: new URLSearchParams('page=1&perPage=10'),
                setQueryParams: mockSetQueryParams,
                getParam: jest.fn((key) => key === 'page' ? '1' : key === 'perPage' ? '10' : '')
            })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render loading state and then display advertisements', async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <Advertisements />
                </MemoryRouter>
            )
        })

        expect(ApiService.getAdvertisements).toHaveBeenCalledWith(1, 10, '', mockController.signal)

        await waitFor(() => {
            expect(screen.getByText('Test Ad 1')).toBeInTheDocument()
            expect(screen.getByText('Test Ad 2')).toBeInTheDocument()
        })
    })

    it('should render all icons with test ids', async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <Advertisements />
                </MemoryRouter>
            )
        })

        expect(screen.getByTestId('search-icon')).toBeInTheDocument()
        expect(screen.getByTestId('sort-icon')).toBeInTheDocument()
        expect(screen.getByTestId('add-icon')).toBeInTheDocument()
    })

    //   it('should open sort menu when sort icon clicked', async () => {
    //     await act(async () => {
    //       render(
    //         <MemoryRouter>
    //           <Advertisements />
    //         </MemoryRouter>
    //       )
    //     })


    //     await act(async () => {
    //       fireEvent.click(screen.getByTestId('sort-icon'))
    //     })

    //     await waitFor(() => {
    //       expect(screen.getByTestId('menu')).toBeInTheDocument()
    //       expect(screen.getAllByTestId('menu-item')).toHaveLength(4)
    //     })
    //   })

    it('should call setQueryParams when menu item selected', async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <Advertisements />
                </MemoryRouter>
            )
        })

        // fireEvent.click(screen.getByTestId('sort-icon'))
        await act(async () => {
            fireEvent.click(screen.getByTestId('sort-icon'))
        })
        await act(async () => {
            fireEvent.click(screen.getAllByTestId('menu-item')[1]) // Выбираем 'price'
        })


        expect(mockSetQueryParams).toHaveBeenCalledWith({ sort: 'price' })
    })

    it('should open create modal when add icon clicked', async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <Advertisements />
                </MemoryRouter>
            )
        })


        await act(async () => {
            fireEvent.click(screen.getByTestId('add-icon'))
        })

        await waitFor(() => {
            expect(screen.getByTestId('create-ad-modal')).toBeInTheDocument()
        })
    })


    // it('should filter advertisements when search input changes', async () => {
        
    //     const mockAds = [
    //         { id: '1', name: 'Test Ad 1', price: '1000', views: 10, likes: 5 },
    //         { id: '2', name: 'Test Ad 2', price: '2000', views: 20, likes: 10 }
    //     ];

    //     (ApiService.getAdvertisements as jest.Mock).mockResolvedValue({
    //         data: mockAds,
    //         ...mockPagination
    //     })

    //     await act(async () => {
    //         render(
    //             <MemoryRouter>
    //                 <Advertisements />
    //             </MemoryRouter>
    //         )
    //     })

    //     await waitFor(() => {
    //         expect(screen.getByText('Test Ad 1')).toBeInTheDocument()
    //         expect(screen.getByText('Test Ad 2')).toBeInTheDocument()
    //     })

    //     const searchInput = screen.getByRole('textbox')
    //     await act(async () => {
    //         fireEvent.change(searchInput, { target: { value: 'Test Ad 2' } })
    //     })

    //     await waitFor(() => {
    //         expect(screen.getByText('Test Ad 2')).toBeInTheDocument()

    //         expect(screen.queryByText('Test Ad 1')).not.toBeInTheDocument()
    //     })
    // })
})
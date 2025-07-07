import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Card from '../Card'
import { type IAdvertisement } from '../../interfaces'

// Правильное мокирование useParams
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useParams: jest.fn(),
}))

// Моки для иконок
jest.mock('@mui/icons-material/HideImage', () => () => <div data-testid="hide-image-icon" />)
jest.mock('@mui/icons-material/Favorite', () => () => <div data-testid="favorite-icon" />)
jest.mock('@mui/icons-material/Visibility', () => () => <div data-testid="visibility-icon" />)

describe('Card Component', () => {
    // const mockAdvertisement: IAdvertisement = {
    //     id: '1',
    //     name: 'Test Product',
    //     description: 'Test description',
    //     price: 1000,
    //     views: 42,
    //     likes: 7,
    //     imageUrl: 'http://test.com/image.jpg',
    // }
    const mockAdvertisement: IAdvertisement = {
        id: "1",
        name: "Premium Bike",
        description: "Mountain bike in excellent condition",
        price: 450,
        createdAt: "2023-01-15",
        views: 1250,
        likes: 34,
        imageUrl: 'http://test.com/image.jpg',
    }

    beforeEach(() => {
        // Сбрасываем все моки перед каждым тестом
        jest.clearAllMocks()
    })

    it('should render correctly with all props', () => {
        render(
            <MemoryRouter>
                <Card data={mockAdvertisement} key="test-key" />
            </MemoryRouter>
        )

        expect(screen.getByText('Premium Bike')).toBeInTheDocument()
        expect(screen.getByText('Mountain bike in excellent condition')).toBeInTheDocument()
        expect(screen.getByText('450₽')).toBeInTheDocument()
        expect(screen.getByText('1250')).toBeInTheDocument()
        expect(screen.getByText('34')).toBeInTheDocument()
    })

    it('should render image when imageUrl is provided', () => {
        render(
            <MemoryRouter>
                <Card data={mockAdvertisement} key="test-key" />
            </MemoryRouter>
        )

        const image = screen.getByRole('img', { name: 'Your Image' })
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', 'http://test.com/image.jpg')
    })

    it('should render placeholder when imageUrl is empty', () => {
        const noImageAd = {
            ...mockAdvertisement,
            imageUrl: ''
        }

        render(
            <MemoryRouter>
                <Card data={noImageAd} key="test-key" />
            </MemoryRouter>
        )

        expect(screen.getByTestId('hide-image-icon')).toBeInTheDocument()
    })

    it('should contain correct link to advertisement page', () => {
        render(
            <MemoryRouter>
                <Card data={mockAdvertisement} key="test-key" />
            </MemoryRouter>
        )

        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', '/advertisements/1')
    })
})
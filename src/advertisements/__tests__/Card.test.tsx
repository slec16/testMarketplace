import { render, screen } from '@testing-library/react'
import Card from '../Card'
import { type IAdvertisement } from '../../interfaces'
import { MemoryRouter } from 'react-router' // Для тестирования Link

describe('Card Component', () => {
  const mockAd: IAdvertisement = {
    id: '1',
    name: 'Test Product',
    description: 'This is a long description that should be truncated to 50 characters. This is a long description that should be truncated to 50 characters. ',
    price: 1000,
    views: 150,
    likes: 25,
    imageUrl: 'http://example.com/image.jpg',
    createdAt: '2023-01-01'
  }

  it('renders card with correct data', () => {
    render(
      <MemoryRouter>
        <Card data={mockAd} key="1" />
      </MemoryRouter>
    )

    // Проверяем основные элементы
    expect(screen.getByText(mockAd.name)).toBeInTheDocument()
    expect(screen.getByText('1000₽')).toBeInTheDocument()
    expect(screen.getByText('150')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
  })

  it('truncates long description', () => {
    render(
      <MemoryRouter>
        <Card data={mockAd} key="1" />
      </MemoryRouter>
    )

    // Проверяем обрезание текста
    const truncatedText = mockAd.description.slice(0, 100) + '...'
    expect(screen.getByText(truncatedText)).toBeInTheDocument()
  })

  it('shows full description when short', () => {
    const shortDescAd = {
      ...mockAd,
      description: 'Short description'
    }

    render(
      <MemoryRouter>
        <Card data={shortDescAd} key="2" />
      </MemoryRouter>
    )

    expect(screen.getByText('Short description')).toBeInTheDocument()
  })

  it('displays image when imageUrl is provided', () => {
    render(
      <MemoryRouter>
        <Card data={mockAd} key="3" />
      </MemoryRouter>
    )

    const image = screen.getByAltText('Your Image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockAd.imageUrl)
  })

  it('shows placeholder icon when no image', () => {
    const noImageAd = {
      ...mockAd,
      imageUrl: ''
    }

    render(
      <MemoryRouter>
        <Card data={noImageAd} key="4" />
      </MemoryRouter>
    )

    expect(screen.getByTestId('HideImageIcon')).toBeInTheDocument()
    expect(screen.queryByAltText('Your Image')).not.toBeInTheDocument()
  })

  it('has correct link to advertisement', () => {
    render(
      <MemoryRouter>
        <Card data={mockAd} key="5" />
      </MemoryRouter>
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', `/advertisements/${mockAd.id}`)
  })
})
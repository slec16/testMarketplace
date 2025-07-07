import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '../Pagination'
import { type IPaginationData } from '../../interfaces'
import '@testing-library/jest-dom'

// Мокаем иконки MUI
jest.mock('@mui/icons-material/ArrowBack', () => () => <div>ArrowBackIcon</div>)
jest.mock('@mui/icons-material/ArrowForward', () => () => <div>ArrowForwardIcon</div>)

describe('Pagination Component', () => {
  const mockPaginationData: IPaginationData = {
    items: 100,
    first: 1,
    last: 10,
    next: 2,
    prev: null,
    pages: 10
  }

  const mockOnPageChange = jest.fn()
  const mockOnRowsPerPageChange = jest.fn()

  const renderPagination = (props = {}) => {
    const defaultProps = {
      page: 1,
      onPageChange: mockOnPageChange,
      rowsPerPage: 10,
      onRowsPerPageChange: mockOnRowsPerPageChange,
      paginationData: mockPaginationData
    }

    return render(<Pagination {...defaultProps} {...props} />)
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly with initial props', () => {
    renderPagination()
    
    expect(screen.getByText('Строк на странице')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('1-10 из 100')).toBeInTheDocument()
    expect(screen.getByText('ArrowBackIcon')).toBeInTheDocument()
    expect(screen.getByText('ArrowForwardIcon')).toBeInTheDocument()
  })

  it('disables prev button on first page', () => {
    renderPagination({ 
      page: 1,
      paginationData: { ...mockPaginationData, prev: null }
    })
    
    const prevButton = screen.getByLabelText('previous page')
    expect(prevButton).toBeDisabled()
  })

  it('disables next button on last page', () => {
    renderPagination({ 
      page: 10,
      paginationData: { ...mockPaginationData, next: null }
    })
    
    const nextButton = screen.getByLabelText('next page')
    expect(nextButton).toBeDisabled()
  })

  it('calls onPageChange with prev page when prev button clicked', () => {
    renderPagination({ 
      page: 2,
      paginationData: { ...mockPaginationData, prev: 1 }
    })
    
    const prevButton = screen.getByLabelText('previous page')
    fireEvent.click(prevButton)
    
    expect(mockOnPageChange).toHaveBeenCalledWith(1)
  })

  it('calls onPageChange with next page when next button clicked', () => {
    renderPagination()
    
    const nextButton = screen.getByLabelText('next page')
    fireEvent.click(nextButton)
    
    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it('opens rows per page menu when clicked', () => {
    renderPagination()
    
    const rowsPerPageButton = screen.getByText('10')
    fireEvent.click(rowsPerPageButton)
    
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getAllByRole('menuitem')).toHaveLength(5)
  })

  it('calls onRowsPerPageChange when menu item selected', () => {
    renderPagination()
    
    // Открываем меню
    const rowsPerPageButton = screen.getByText('10')
    fireEvent.click(rowsPerPageButton)
    
    // Выбираем опцию 25
    const option25 = screen.getByText('25')
    fireEvent.click(option25)
    
    expect(mockOnRowsPerPageChange).toHaveBeenCalledWith(25)
  })

  it('calculates correct range for first page', () => {
    renderPagination({ page: 1, rowsPerPage: 10 })
    expect(screen.getByText('1-10 из 100')).toBeInTheDocument()
  })

  it('calculates correct range for middle page', () => {
    renderPagination({ page: 3, rowsPerPage: 10 })
    expect(screen.getByText('21-30 из 100')).toBeInTheDocument()
  })

  it('calculates correct range for last page', () => {
    renderPagination({ page: 10, rowsPerPage: 10 })
    expect(screen.getByText('91-100 из 100')).toBeInTheDocument()
  })

  it('calculates correct range when items less than page size', () => {
    renderPagination({ 
      page: 1, 
      rowsPerPage: 10,
      paginationData: { ...mockPaginationData, items: 5 } 
    })
    expect(screen.getByText('1-5 из 5')).toBeInTheDocument()
  })

//   it('closes menu when clicking outside', () => {
//     renderPagination();
    
//     // Открываем меню
//     const rowsPerPageButton = screen.getByText('10');
//     fireEvent.click(rowsPerPageButton);
    
//     // Кликаем вне меню
//     fireEvent.click(document.body);
    
//     expect(screen.queryByRole('menu')).not.toBeInTheDocument();
//   });
})